'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { EmailInboxIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { useRouter, useSearchParams } from "src/routes/hooks/index"
import { useBoolean } from 'src/hooks/use-boolean';
import { IconButton, InputAdornment } from '@mui/material';
import { POST } from 'src/services/AxiosRequest';
import Toaster from 'src/utils/toaster';
import URL from 'src/services/API';

// ----------------------------------------------------------------------

export default function ModernVerifyView() {
  const password = useBoolean();
  const router = useRouter();
  const { get } = useSearchParams();
  const email = get('email');
  console.log("🚀 ~ ModernVerifyView ~ email:", email)

  const VerifySchema = Yup.object().shape({
    otp: Yup.string().min(6, 'Otp must be at least 6 characters').required('Otp is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    otp: '',
    email: email as string,
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!email) return Toaster("error", "Email not found", true);
      const res = await POST(URL.AUTH_RESET_PASSWORD, {
        email: email as string,
        password: data.password,
        otp: +data.otp
      });
      Toaster("success", res.message);
      router.push(paths.auth.jwt.login)
    } catch (error) {
      console.log(error);
      Toaster("error", error.response.data.message, true);
    }
  });


  const resendOtp = async () => {
    try {
      if (!email) return Toaster("error", "Email not found", true);
      const res = await POST(URL.AUTH_FORGET_PASSWORD, {
        email: email as string,
      });
      if (res.message) {
        Toaster("success", res.message,true);
      }
    } catch (error) {
      console.log(error);
      Toaster("error", error.response.data.message, true);
    }
  };


  const renderForm = (
    <Stack spacing={3} alignItems="center">


      <RHFCode name="otp" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />


      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Verify
      </LoadingButton>

      <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          component={'button'}
          onClick={resendOtp}
          variant="subtitle2"
          sx={{
            cursor: 'pointer',
          }}
        >
          Resend code
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to Sign In
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h5">Please check your Email!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          We have emailed a 6-digit confirmation code to your email, please enter the code below to verify!.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
