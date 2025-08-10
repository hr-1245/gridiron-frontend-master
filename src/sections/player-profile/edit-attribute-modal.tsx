import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, Snackbar, Box, Stack, Typography, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { RHFTextField } from 'src/components/hook-form'; // assuming this is your wrapper
import { useForm, FormProvider } from 'react-hook-form';
import { EditAttributeModalProps } from 'src/types/player';
import Toaster from 'src/utils/toaster';
import { POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { COLLAGE_AGE_ENUM } from '../convert/manual/manual-form';

const labelKeyMap: Record<string, string> = {
    'Hometown': 'homeTown',
    'College': 'college',
    'Draft Round': 'draft_round',
    'Height': 'height',
    'Weight': 'weight',
    'Age': 'age',
    'Jersey Number': 'jerseyNumber',
    'Overall Rating': 'ovr',
};

export default function EditAttributeModal({
    open,
    onClose,
    obj,
    id,
    onUpdate,
    setPlayerData
}: EditAttributeModalProps) {
    const methods = useForm({
        defaultValues: {
            value: obj?.value || '',
        },
    });

    useEffect(() => {
        if (obj) {
            methods.reset({
                value: obj.value ?? '',
            });
        }
    }, [obj, methods]);

    const [snackbar, setSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const isNumber = typeof obj?.value === 'number';

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const updatedValue = methods.getValues('value');
            console.log("🚀 ~ handleUpdate ~ updatedValue:", updatedValue)
            // onUpdate({ label: obj!.label, value: updatedValue });
            const backendKey = labelKeyMap[obj!.label] || obj!.label;
            const payload: any = {
                data: {
                    [backendKey]: updatedValue,
                },
                [backendKey]: updatedValue,
            };

            if (backendKey === 'age') {
                payload.player_class = updatedValue;
                payload.data.age = updatedValue;
            }
            const res = await POST(URL.UPDATE_PLAYER(+id), payload)
            const updatedPlayer = res.updatedPlayer;

            setPlayerData((prev) => ({
                ...prev,
                homeTown: updatedPlayer.bio.homeTown,
                college: updatedPlayer.bio.college,
                jerseyNumber: updatedPlayer.bio.jerseyNumber,
                overallRating: updatedPlayer.bio.ovr,
                height: updatedPlayer.bio.height,
                weight: updatedPlayer.bio.weight,
                projectedReason: updatedPlayer.attributes.draft_round,
                attributes: [updatedPlayer.attributes],
            }));
            Toaster('success', res.message || "Updated successfully.")
            onClose();
        } catch (error) {
            console.log(error);
            Toaster("error", error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const value = Number(methods.watch('value'));

    const getDraftRoundColor = (val: number) => {
        if (val <= 2) return 'success';
        if (val <= 4) return 'warning';
        if (val <= 6) return 'error';
        return 'error';
    };

    const getColor = () => {
        if (obj?.label === 'Draft Round') {
            return getDraftRoundColor(value);
        }
        if (value <= 40) return 'primary';
        if (value >= 90) return 'success';
        if (value >= 70) return 'warning';
        return 'error';
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                <DialogTitle>Edit {obj?.label}</DialogTitle>

                <FormProvider {...methods}>
                    <DialogContent sx={{ py: 3 }}>
                        <Box p={1}>
                            {isNumber ? (
                                <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                                    <Slider
                                        name="value"
                                        value={value}
                                        min={obj?.label === 'Weight' ? 100 : 1}
                                        max={obj?.label === 'Weight' ? 400 : 99}
                                        step={obj?.label === 'Draft Round' ? 1 : 1}
                                        onChange={(_, val) => methods.setValue('value', Number(val))}
                                        sx={{ flexGrow: 1 }}
                                        color={getColor()}
                                    />
                                    <Typography variant="subtitle2" minWidth={30}>
                                        {Number(methods.watch('value'))}
                                    </Typography>
                                </Stack>
                            ) : obj?.label === 'Age' ? (
                                <RHFSelect name="value" label="Class">
                                    {Object.entries(COLLAGE_AGE_ENUM).map(([key, val]) => (
                                        <MenuItem key={key} value={val}>
                                            {val.replace(/_/g, ' ')}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>
                            ) : (
                                <RHFTextField name="value" label={obj?.label} />
                            )}
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleUpdate} variant="contained" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </DialogActions>
                </FormProvider>
            </Dialog>

            <Snackbar
                open={snackbar}
                onClose={() => setSnackbar(false)}
                autoHideDuration={3000}
                message="Updated Successfully"
            />
        </>
    );
}
