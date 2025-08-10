import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Stack, Alert, useTheme, Paper } from '@mui/material';
import { POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import { useAppSelector } from 'src/redux/hook';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/types/user';
import Toaster from 'src/utils/toaster';

export default function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
    const user = useAppSelector((root: RootState) => root?.user?.user) as IUser;
    const stripe = useStripe();
    const elements = useElements();
    const { handleSubmit } = useForm();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async () => {
        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMsg('');

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
        });

        if (error) {
            setErrorMsg(error.message || 'Payment method creation failed');
            setLoading(false);
            return;
        }

        try {
            await POST(URL.ATTACH_PAYMENT_METHOD, { paymentMethodId: paymentMethod.id });

            const res = await POST(URL.SUBSCRIBE_TO_PLAN, {
                name: user.fullName,
                phoneNumber: '+1234567890',
            })


            Toaster('success', res.message)

            onSuccess();
        } catch (err) {
            setErrorMsg('Subscription failed. Please try again.');
            console.error('Subscription error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            component="form"
            elevation={4}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 4,
                borderRadius: 3,
                background: theme.palette.mode === 'dark' ? '#1e1e1e' : 'background.paper',
                boxShadow: `0 0 20px ${theme.palette.primary.main}22`,
            }}
        >
            <Stack spacing={3}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Payment Details
                </Typography>

                <Box
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        background: theme.palette.mode === 'dark' ? '#121212' : '#fafafa',
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#ffffff',
                                    iconColor: '#90caf9',
                                    backgroundColor: 'transparent',
                                    '::placeholder': {
                                        color: '#bbbbbb',
                                    },
                                },
                                invalid: {
                                    color: '#ef5350',
                                },
                            },
                        }}
                    />
                </Box>

                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    sx={{
                        py: 1.5,
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 2,
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe for $19.99/mo'}
                </Button>
            </Stack>
        </Paper>
    );
}
