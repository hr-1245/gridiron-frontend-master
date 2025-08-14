import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { useBoolean } from 'src/hooks/use-boolean';

import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { IPaymentCard } from 'src/types/payment';
import { IAddressItem } from 'src/types/address';
import { Tooltip, Typography } from '@mui/material';
import { UpgradeModal } from './upgrade-modal';
import { useAppSelector } from 'src/redux/hook';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/types/user';
import Toaster from 'src/utils/toaster';
import { POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';



// ----------------------------------------------------------------------

type Props = {
  cardList: IPaymentCard[];
  addressBook: IAddressItem[];
  plans: {
    subscription: string;
    price: number;
    primary: boolean;
    features: string[]
  }[];
};

export default function AccountBillingPlan({ cardList, addressBook, plans }: Props) {

  const user = useAppSelector((root: RootState) => root?.user?.user) as IUser;
  console.log("🚀 ~ AccountBillingPlan ~ user:", user)
  const primaryAddress = addressBook.filter((address) => address.primary)[0];
  const userPlan = user?.subscription?.planType
  const primaryCard = cardList.filter((card) => card.primary)[0];

  const [selectedPlan, setSelectedPlan] = useState(userPlan ?? '');
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = useCallback(
    (newValue: string) => {
      const currentPlan = plans.filter((plan) => plan.primary)[0].subscription;
      if (currentPlan !== newValue) {
        setSelectedPlan(newValue);
      }
    },
    [plans]
  );

  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const res = await POST(URL.CANCEL_SUBSCRIPTION)
      Toaster('success', res.message)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toaster("error", error.response.data.message);
    }
  }


  const renderPlans = plans.map((plan) => (
    <Grid xs={12} md={4} key={plan.subscription}>
      <Stack
        component={Paper}
        variant="outlined"
        onClick={() => handleSelectPlan(plan.subscription)}
        spacing={3}
        sx={{
          p: 3,
          position: 'relative',
          cursor: plan.primary ? 'default' : 'pointer',
          opacity: plan.primary ? 0.6 : 1,
          ...(plan.subscription === selectedPlan && {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
          }),
          transition: 'all 0.3s',
          '&:hover': {
            ...(plan.primary
              ? {}
              : {
                boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
              }),
          },
        }}
      >
        {/* Label */}
        {userPlan === plan.subscription && (
          <Label
            color="info"
            startIcon={<Iconify icon="eva:star-fill" />}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Current
          </Label>
        )}

        {/* Plan Icon */}
        <Box sx={{ width: 48, height: 48 }}>
          {plan.subscription === 'basic' && <PlanFreeIcon />}
          {plan.subscription === 'regular' && <PlanStarterIcon />}
          {plan.subscription === 'Coupon Code' && <PlanStarterIcon />}
        </Box>

        {/* Plan Name */}
        <Typography variant="h6" sx={{ mt: 1 }}>
          {plan.subscription.charAt(0).toUpperCase() + plan.subscription.slice(1)}
        </Typography>

        {/* Plan Price */}
        <Stack direction="row" alignItems="baseline" spacing={0.5}>
          <Typography variant="h4">
            {plan.price ? `$${plan.price}` : 'Free'}
          </Typography>
          {!!plan.price && (
            <Typography variant="body2" color="text.secondary">
              /mo
            </Typography>
          )}
        </Stack>

        {/* Plan Features */}
        <Stack spacing={1} sx={{ mt: 2 }}>
          {plan.features.map((feature, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Iconify
                icon="eva:checkmark-circle-2-fill"
                width={20}
                sx={{ color: 'success.main' }}
              />
              <Typography variant="body2" color="text.secondary">
                {feature}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Grid>
  ));

  return (
    <>
      <Card>
        <CardHeader title="Enjoy Unlimited Player Conversions on Regular Plan!" />

        <Grid container spacing={2} sx={{ p: 3 }}>
          {renderPlans}
        </Grid>

        <Stack spacing={2} sx={{ p: 3, pt: 0, typography: 'body2' }}>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Plan
            </Grid>
            <Grid xs={12} md={8} sx={{ typography: 'subtitle2', textTransform: 'capitalize' }}>
              {selectedPlan || '-'}
            </Grid>
          </Grid>

        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
          {userPlan !== 'regular' ? (
            <Tooltip title="You can only cancel if you're on the regular plan">
              <span>
                <Button variant="outlined" disabled>
                  Cancel Plan
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button
              variant="outlined"
              onClick={cancelSubscription}
              disabled={loading}
            >
              {loading ? 'Cancelling...' : 'Cancel Plan'}
            </Button>
          )}
          {userPlan !== 'regular' ? (
            <Button variant="contained" color="primary" onClick={() => setUpgradeOpen(true)}>
              Upgrade Plan
            </Button>
          ) : (
            <Tooltip title="You're already on the regular plan">
              <span>
                <Button variant="contained" disabled>
                  Upgrade Plan
                </Button>
              </span>
            </Tooltip>
          )}
        </Stack>
      </Card>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />

    </>
  );
}
