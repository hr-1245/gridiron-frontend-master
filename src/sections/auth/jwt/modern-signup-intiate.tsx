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

import { PasswordIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useRouter } from "src/routes/hooks/index"
import Toaster from 'src/utils/toaster';
import { POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';

// ----------------------------------------------------------------------

export default function ModernSignupInitiateView() {
    const router = useRouter();
    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    });

    const defaultValues = {
        email: '',
    };

    const methods = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            data.email = data.email.toLowerCase();
            const res = await POST(URL.AUTH_REGISTER_INITIATE, { email: data.email })
            router.push(paths.auth.jwt.register(data.email))
            Toaster("success", res.message, true);
        } catch (error) {
            console.error(error);
            Toaster("error", error.response.data.message, true);
        }
    });

    const renderForm = (
        <Stack spacing={3} alignItems="center">
            <RHFTextField name="email" label="Email address" />

            <LoadingButton
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
            >
                Send Request
            </LoadingButton>

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
                Return to SignIn
            </Link>
        </Stack>
    );

    const renderHead = (
        <>
            <PasswordIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
                <Typography variant="h3">Verify Your Email</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Enter your email address to start the sign-up process. We'll send you a one-time password (OTP) to verify your identity.
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
