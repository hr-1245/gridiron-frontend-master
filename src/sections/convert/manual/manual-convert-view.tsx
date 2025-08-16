'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { Box, Stack, Button, MenuItem, Typography, Stepper, Step, StepLabel, Card, Slider } from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { RHFAutoComplete, RHFTextField } from 'src/components/hook-form';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { IPosition, PLAYER_POSITION_OPTIONS } from 'src/types/player';
import { useEffect, useState } from 'react';
import PlayerManualForm from './manual-form';
import { LoadingButton } from '@mui/lab';
import { GET, POST } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import Toaster from 'src/utils/toaster';
import { useRouter } from 'next/navigation';


// ----------------------------------------------------------------------

export default function PlayerManualView() {

    const settings = useSettingsContext();
    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);


    const methods = useForm({
        defaultValues: {
            positionCode: '',
            draftFolderName: '',
            positionId: 0,
            draft_round: 1,
            data: {},
        },
    });

    const { watch, setValue, handleSubmit } = methods;
    const positionCode = watch('positionCode');
    const draftRound = watch('draft_round');
    const draftFolderName = watch('draftFolderName');
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [draftFolderOptions, setDraftFolderOptions] = useState<string[]>([]);
    console.log("🚀 ~ PlayerManualView ~ draftFolderOptions:", draftFolderOptions)
    const onSubmit = async (data: any) => {
        try {
            debugger
            setLoading(true)
            const res = await POST(URL.CONVERT_PLAYER_MANUALLY, data);
            console.log(res.message);
            Toaster('success', res.message);
            setLoading(false)
            router.push(paths.dashboard.allDraft)
        } catch (error) {
            debugger
            setLoading(false)
            Toaster("error", error.response.data.message);
            console.log("🚀 ~ onSubmit ~ error:", error);
        }

    };


    const getPositions = async () => {
        try {
            debugger
            const res = await GET(URL.GET_POSITIONS_DROPDOWN);
            setPositions(res.data)
        } catch (error) {
            debugger
            console.log("🚀 ~ getPositions ~ error:", error)
        }
    }


    const getDraftFolderNames = async () => {
        try {
            const res = await GET(URL.GET_DRAFT_FOLDERS_DROPDOWN);
            setDraftFolderOptions(res);
        } catch (error) {
            console.error("Failed to fetch draft folders:", error);
        }
    };

    useEffect(() => {

        getPositions()
        getDraftFolderNames();

    }, [])


    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Convert A New Player"
                links={[
                    {
                        name: 'Dashboard',
                        href: paths.dashboard.root,
                    },
                    { name: 'Convert' },
                    { name: 'Manual' },
                    { name: 'New Player' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Card sx={{
                p: 5
            }}>
                <FormProvider {...methods}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>


                        {activeStep === 0 && (
                            <Stack spacing={3}>
                                <RHFSelect
                                    name="positionCode"
                                    label="Choose Position"
                                    onChange={(event) => {
                                        const selectedCode = event.target.value;
                                        const selected = positions.find((pos) => pos.code === selectedCode);
                                        setValue('positionCode', selectedCode);
                                        setValue('positionId', selected?.positionId || 0);
                                    }}
                                >
                                    {positions.map((pos) => (
                                        <MenuItem key={pos.positionId} value={pos.code}>
                                            {pos.name}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>


                                <RHFAutoComplete
                                    name="draftFolderName"
                                    label="Draft Folder Name"
                                    placeholder="Choose Existing or Type New"
                                    options={draftFolderOptions}
                                    freeSolo
                                />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Draft Round
                                    </Typography>
                                    <Controller
                                        name="draft_round"
                                        control={methods.control}
                                        defaultValue={1}
                                        render={({ field }) => {
                                            const value = Number(field.value);

                                            const getSliderColor = (val: number) => {
                                                if (val <= 2) return 'success.main';
                                                if (val <= 4) return 'orange';
                                                if (val <= 6) return 'error.main';
                                                return 'red';
                                            };

                                            return (
                                                <Stack spacing={1} direction="row" alignItems="center">
                                                    <Typography variant="body2" sx={{ minWidth: 70 }}>
                                                        Round {value}
                                                    </Typography>
                                                    <Slider
                                                        {...field}
                                                        value={value}
                                                        onChange={(_, val) => field.onChange(val)}
                                                        min={1}
                                                        max={7}
                                                        step={1}
                                                        marks={[
                                                            { value: 1, label: '1' },
                                                            { value: 2, label: '2' },
                                                            { value: 3, label: '3' },
                                                            { value: 4, label: '4' },
                                                            { value: 5, label: '5' },
                                                            { value: 6, label: '6' },
                                                            { value: 7, label: '7' },
                                                        ]}
                                                        valueLabelDisplay="auto"
                                                        sx={{
                                                            flexGrow: 1,
                                                            color: getSliderColor(value),
                                                            '& .MuiSlider-thumb': {
                                                                border: '2px solid white',
                                                            },
                                                            '& .MuiSlider-track': {
                                                                backgroundColor: getSliderColor(value),
                                                            },
                                                            '& .MuiSlider-rail': {
                                                                opacity: 0.3,
                                                            },
                                                        }}
                                                    />
                                                </Stack>
                                            );
                                        }}
                                    />
                                </Box>
                                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                    <LoadingButton
                                        color="primary"
                                        variant="contained"
                                        onClick={() => setActiveStep(1)}
                                        disabled={!positionCode || !draftRound || !draftFolderName}
                                        sx={{ mt: 3 }}>
                                        Continue
                                    </LoadingButton>
                                </Stack>

                            </Stack>
                        )}

                        {activeStep === 1 && positionCode && (
                            <PlayerManualForm position={positionCode} onBack={() => setActiveStep(0)} loading={loading} />
                        )}
                    </Box>
                </FormProvider>
            </Card>
        </Container>
    );
}
