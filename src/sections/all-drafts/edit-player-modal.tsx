import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form'; // your input component
import { IUserItem } from 'src/types/user';

type EditPlayerModalProps = {
    open: boolean;
    user: IUserItem | null;
    onClose: () => void;
    onUpdate: (updated: IUserItem) => void;
};

export default function EditPlayerModal({ open, user, onClose, onUpdate }: EditPlayerModalProps) {

    if (!user) return null;
    console.log("🚀 ~ EditPlayerModal ~ user:", user)
    const methods = useForm({
        defaultValues: {
            name: user?.name || '',
            age: user?.age || 20,
            wt: user?.wt || 200,
            speed: user?.speed || 85,
        },
    });

    const [snackbar, setSnackbar] = useState(false);

    const handleSubmit = methods.handleSubmit((data) => {
        if (!user) return;
        onUpdate({ ...user, ...data });
        setSnackbar(true);
        onClose();
    });

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Player</DialogTitle>

                <FormProvider {...methods}>
                    <DialogContent sx={{ py: 3 }}>
                        <Stack spacing={2}>
                            <RHFTextField name="name" label="Name" />
                            <RHFTextField name="age" label="Age" type="number" />
                            <RHFTextField name="wt" label="Weight (lbs)" type="number" />
                            <RHFTextField name="speed" label="Speed" type="number" />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose} color="inherit">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Update
                        </Button>
                    </DialogActions>
                </FormProvider>
            </Dialog>

            <Snackbar
                open={snackbar}
                onClose={() => setSnackbar(false)}
                message="Player updated successfully"
                autoHideDuration={3000}
            />
        </>
    );
}
