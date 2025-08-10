import Grid from '@mui/material/Unstable_Grid2';

import { IPaymentCard } from 'src/types/payment';
import { IAddressItem } from 'src/types/address';
import { IUserAccountBillingHistory } from 'src/types/user';

import AccountBillingPlan from './account-billing-plan';


// ----------------------------------------------------------------------

type Props = {
  plans: {
    subscription: string;
    price: number;
    primary: boolean;
    features: string[]
  }[];
  cards: IPaymentCard[];
  invoices: IUserAccountBillingHistory[];
  addressBook: IAddressItem[];
};

export default function AccountBilling({ cards, plans, invoices, addressBook }: Props) {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <AccountBillingPlan plans={plans} cardList={cards} addressBook={addressBook} />

      </Grid>
     
    </Grid>
  );
}
