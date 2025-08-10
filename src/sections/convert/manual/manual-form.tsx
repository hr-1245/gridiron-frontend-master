import { Box, Stack, Typography, Slider, Grid, Button, MenuItem, Divider } from '@mui/material';
import { RHFTextField } from 'src/components/hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { POSITION_FIELDS } from 'src/types/player';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { LoadingButton } from '@mui/lab';

type Props = {
    position: string;
    onBack: VoidFunction;
    loading: boolean;
};

const constantFields = [
    { name: 'playerName', label: 'Player Name', type: 'string' },
    { name: 'homeTown', label: 'Home Town', type: 'string' },
    { name: 'college', label: 'College', type: 'string' },
    { name: 'player_class', label: 'Class', type: 'string' },
    { name: 'height', label: 'Height', type: 'string' },
    { name: 'jerseyNumber', label: 'Jersey Number', type: 'string' },
    { name: 'ovr', label: 'College Football Overall', type: 'number', min: 1, max: 99 },
    { name: 'weight', label: 'Weight (lbs)', type: 'number', min: 100, max: 400 }
];

export enum COLLAGE_AGE_ENUM {
    SO_RS = 'SO_RS',
    JR = 'JR',
    JR_RS = 'JR_RS',
    SR = 'SR',
    SR_RS = 'SR_RS',
}

export default function PlayerManualForm({ position, onBack, loading }: Props) {
    const { control } = useFormContext();
    const fields = POSITION_FIELDS[position] || [];

    return (
        <Stack spacing={5}>
            <Grid container spacing={3}>
                {constantFields.map((field) => (
                    <Grid key={field.name} item xs={12} md={6}>
                        <Box>
                            {field.type === 'number' ? (
                                <>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        {field.label}
                                    </Typography>
                                    <Controller
                                        name={field.name}
                                        control={control}
                                        defaultValue={50}
                                        render={({ field: controllerField }) => (
                                            <Slider
                                                {...controllerField}
                                                value={Number(controllerField.value)}
                                                onChange={(_, value) => controllerField.onChange(value)}
                                                step={1}
                                                min={field.min || 1}
                                                max={field.max || 99}
                                                valueLabelDisplay="on"
                                                color={
                                                    controllerField.value >= 90
                                                        ? 'success'
                                                        : controllerField.value >= 70
                                                            ? 'warning'
                                                            : controllerField.value <= 40
                                                                ? 'primary'
                                                                : 'error'
                                                }
                                            />
                                        )}
                                    />
                                </>
                            ) : field.name === 'player_class' ? (
                                <RHFSelect name={field.name} label={field.label}>
                                    {Object.entries(COLLAGE_AGE_ENUM).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value.replace(/_/g, ' ')}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>
                            ) : (
                                <RHFTextField name={field.name} label={field.label} />
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ my: 4 }}>
                <Typography variant="subtitle1" color="text.secondary">
                    College Football Position Attributes
                </Typography>
            </Divider>

            <Grid container spacing={3}>
                {fields.map((field) => (
                    <Grid key={field.name} item xs={12} md={6}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                {field.label}
                            </Typography>

                            {field.type === 'number' ? (
                                <Controller
                                    name={`data.${field.name}`}
                                    control={control}
                                    defaultValue={50}
                                    render={({ field: controllerField }) => (
                                        <Slider
                                            {...controllerField}
                                            value={Number(controllerField.value)}
                                            onChange={(_, value) => controllerField.onChange(value)}
                                            step={1}
                                            min={1}
                                            max={99}
                                            valueLabelDisplay="on"
                                            color={
                                                controllerField.value >= 90
                                                    ? 'success'
                                                    : controllerField.value >= 70
                                                        ? 'warning'
                                                        : controllerField.value <= 40
                                                            ? 'primary'
                                                            : 'error'
                                            }
                                        />
                                    )}
                                />
                            ) : (
                                <RHFTextField name={`data.${field.name}`} label={field.label} />
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="outlined" color="inherit" onClick={onBack}>
                    Back
                </Button>
                <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>
                    Convert
                </LoadingButton>
            </Stack>
        </Stack>
    );
}
