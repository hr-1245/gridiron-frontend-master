'use client';

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { useAppDispatch } from 'src/redux/hook';
import { setUser } from 'src/redux/features/user';
import { setCookie } from 'cookies-next';
import { POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import Toaster from 'src/utils/toaster';
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();
  const rawEmail = searchParams.get('email') || "";
  const email = decodeURIComponent(rawEmail.replace(/\s/g, '+'));
  console.log("🚀 ~ JwtRegisterView ~ email:", email)

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    otp: Yup.string().min(6, 'Otp must be at least 6 characters').required('Otp is required'),
  });


  useEffect(() => {
    if (!email) {
      router.push(paths.auth.jwt.login);
    }
  }, [email, router]);

  const defaultValues = {
    fullName: '',
    password: '',
    otp: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await POST(URL.AUTH_REGISTER, {
        ...data,
        email: email.toLowerCase(),
      });
      dispatch(setUser({ user: res.user, accessToken: res.accessToken }));
      setCookie("accessToken", res.accessToken);
      Toaster("success", res.message, true);
      router.push(paths.dashboard.root)
    } catch (error) {
      console.log(error);
      Toaster("error", error.response.data.message, true);
    }
  });
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Sign Up & Start Converting!</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an Account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign In
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFCode name="otp" />
      <RHFTextField name="fullName" label="Full Name" />
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

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Create Account
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>

      {renderTerms}
    </>
  );
}
