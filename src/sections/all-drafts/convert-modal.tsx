'use client';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Box,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
type ConvertModalProps = {
    open: boolean;
    onClose: () => void;
};
export default function ConvertModal({ open, onClose }: ConvertModalProps) {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        onClose();
        router.push(path);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Select Convert Method</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={2}>
                    <Box
                        onClick={() => handleNavigate(paths.dashboard.convert.bulk)}
                        sx={{
                            px: 2,
                            py: 2.5,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            transition: '0.2s',
                            '&:hover': {
                                bgcolor: 'action.hover',
                                boxShadow: 4,
                            },
                        }}
                    >
                        <Iconify icon="fluent:people-team-add-24-filled" width={24} />
                        <Typography variant="subtitle1">Bulk Convert</Typography>
                    </Box>

                    <Box
                        onClick={() => handleNavigate(paths.dashboard.convert.manual)}
                        sx={{
                            px: 2,
                            py: 2.5,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            transition: '0.2s',
                            '&:hover': {
                                bgcolor: 'action.hover',
                                boxShadow: 4,
                            },
                        }}
                    >
                        <Iconify icon="fluent:person-add-24-filled" width={24} />
                        <Typography variant="subtitle1">Manual Convert</Typography>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
