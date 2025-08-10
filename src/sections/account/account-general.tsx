import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import { useAppDispatch } from 'src/redux/hook';
import { setUser } from 'src/redux/features/user';
import { PUT } from 'src/services/AxiosRequest'; // Import PUT instead of POST
import { fData } from 'src/utils/format-number';
import Toaster from 'src/utils/toaster';
import { useAppSelector } from 'src/redux/hook';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/types/user';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

type UserType = {
  displayName: string;
  email: string;
  photoURL: any;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const user = useAppSelector((root: RootState) => root?.user?.user) as IUser;
  
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    photoURL: Yup.mixed<any>().nullable().required('Avatar is required'),
  });
  
  const defaultValues: UserType = {
    displayName: user?.fullName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
  };
  
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useAppDispatch();
  const currentUserState = useAppSelector((root: RootState) => root?.user);

const onSubmit = handleSubmit(async (data) => {
  try {
    // Call the backend API to update the profile
    const updateData = {
      fullName: data.displayName
    };
    
    const response = await PUT(URL.UPDATE_PROFILE, updateData);
    console.log("Profile update response:", response);
    
    // Update the Redux state with the new data
    const updatedUser = { 
      ...user, 
      fullName: data.displayName,
      photoURL: data.photoURL 
    };
  
    dispatch(setUser({ 
      user: updatedUser, 
      accessToken: currentUserState.accessToken 
    }));
    Toaster('success', 'Profile updated successfully!'); // Additional toast
  } catch (error) {
    console.error('Profile update error:', error);
    enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' });
  }
});

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      console.log("🚀 ~ AccountGeneral ~ file:", file);

      const newFile = Object.assign(file, {
        preview: window.URL.createObjectURL(file),
      });

      if (file) {
        try {
          const formData = new FormData();
          formData.set('file', file);
          
          
          const res = await POST(URL.UPLOAD_PROFILE_PICTURE, formData);
          console.log("Upload response:", res);
          
          setValue('photoURL', res.profile_picture_url, { shouldValidate: true });
          
          Toaster('success', 'Profile picture uploaded successfully!'); // Additional toast
        } catch (error) {
          console.error('Upload error:', error);
          enqueueSnackbar('Failed to upload profile picture. Please try again.', { variant: 'error' });
          Toaster('error', 'Failed to upload profile picture. Please try again.'); 
        }
      }
    },
    
    [setValue, enqueueSnackbar]
  );
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="displayName" label="Name"/>
              <RHFTextField name="email" label="Email Address" disabled />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting} color="primary">
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
