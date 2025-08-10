'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { Button, Card, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RHFAutoComplete, RHFTextField, RHFUpload } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { LoadingButton } from '@mui/lab';
import { GET, POST } from 'src/services/AxiosRequest';
import API_URL from 'src/services/API';
import Toaster from 'src/utils/toaster';
import SubmittingModal from './submitting-modal';
import Link from 'next/link';
// ----------------------------------------------------------------------

export default function PlayerBulkView() {
    const settings = useSettingsContext();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const BulkSchema = Yup.object().shape({
        files: Yup.array().min(1, 'Images is required'),
        draftFolderName: Yup.string().required('Draft name is required')

    });

    const methods = useForm({
        resolver: yupResolver(BulkSchema),
        defaultValues: {
            files: [],
            draftFolderName: '',
        },
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const draftFolderName = watch('draftFolderName');

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();

            // Append draft folder name
            formData.append('draftFolderName', data.draftFolderName);

            // Append each file
            data?.files?.forEach((file: File) => {
                formData.append('files', file); // must match backend field name
            });

            const res = await POST(API_URL.CONVERT_PLAYER_AI, formData);
            enqueueSnackbar('Create success!');
            reset();
            Toaster('success', res.message);
            setTimeout(() => {
                router.push(paths.dashboard.root);
                }, 1000);
            console.info('DATA', data);
        } catch (error) {
            Toaster("error", error.response.data.message);
            console.error(error);
        }
    });

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const files = values.files || [];

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            setValue('files', [...files, ...newFiles], { shouldValidate: true });
        },
        [setValue, values.files]
    );

    const handleRemoveFile = useCallback(
        (inputFile: File | string) => {
            const filtered = values.files && values.files?.filter((file) => file !== inputFile);
            setValue('files', filtered);
        },
        [setValue, values.files]
    );

    const handleRemoveAllFiles = useCallback(() => {
        setValue('files', []);
    }, [setValue]);

    const [draftFolderOptions, setDraftFolderOptions] = useState<string[]>([]);

    const getDraftFolderNames = async () => {
        try {
            const res = await GET(API_URL.GET_DRAFT_FOLDERS_DROPDOWN);
            setDraftFolderOptions(res);
        } catch (error) {
            console.error("Failed to fetch draft folders:", error);
        }
    };

    useEffect(() => {

        getDraftFolderNames();

    }, [])

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Bulk Convert Players"
                links={[
                    {
                        name: 'Dashboard',
                        href: paths.dashboard.root,
                    },
                    { name: 'Convert' },
                    { name: 'Bulk' },
                    { name: 'New Players' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <Card sx={{
                p: 5
            }}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Stack spacing={1.5}>
                        <RHFUpload
                            multiple
                            name='files'
                            maxSize={3145728}
                            onDrop={handleDrop}
                            onRemove={handleRemoveFile}
                            onRemoveAll={handleRemoveAllFiles}
                            onUpload={() => console.info('ON UPLOAD')}
                        />
                    </Stack>
                    <Stack spacing={1.5} p={2}>
                        <RHFAutoComplete
                            name="draftFolderName"
                            label="Draft Folder Name"
                            placeholder="Choose Existing or Type New"
                            options={draftFolderOptions}
                            freeSolo
                        />
                        
    <Typography variant="body2" color="text.secondary">
        Not sure how to use this?{' '}
        <Link href={paths.dashboard.howToUse} style={{ color: '#CC2D2D', textDecoration: 'underline' }}>
            Watch a Demo!
        </Link>
    </Typography>
                    </Stack>
                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton
                            type='submit'
                            loading={isSubmitting}
                            color="primary"
                            variant="contained"
                            disabled={!values.files?.length || !draftFolderName}
                            sx={{ mt: 3 }}>
                            Convert Players
                        </LoadingButton>
                    </Stack>
                </FormProvider>
            </Card>

            <SubmittingModal open={isSubmitting} />

        </Container>
    );
}
