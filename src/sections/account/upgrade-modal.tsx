import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './payment-form';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PB_KEY;

if (!stripeKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PB_KEY in environment variables');
}

const stripePromise = loadStripe(stripeKey);

type UpgradeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: 'background.default',
          boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}33`,
          p: 3,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>
        Subscribe to <span style={{ color: '#655DC6' }}>Regular Plan</span>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 4 }}>
        <Elements stripe={stripePromise}>
          <PaymentForm onSuccess={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}