'use client';

import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _roles, _userList, POSITION_COLOR_MAP, USER_STATUS_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
    useTable,
    emptyRows,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from 'src/components/table';

import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import UserTableFiltersResult from '../user-table-filters-result';
import ConvertModal from '../convert-modal';
import EditPlayerModal from '../edit-player-modal';
import { GlobalStoreState } from 'src/shared.types';
import { IPlayer, IDraftFolders } from 'src/types/player';
import { DELETE, GET } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import { Box, CircularProgress } from '@mui/material';
import Toaster from 'src/utils/toaster';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name'},
    { id: 'college', label: 'College', width: 180 },
    { id: 'position', label: 'Position', width: 220 },
    { id: 'projectedReason', label: 'Draft Round', width: 180 },
    { id: 'overall', label: 'CF Overall', width: 110 },
    {id:'',width:80}
];

// ----------------------------------------------------------------------

export default function DraftListview() {
    const { enqueueSnackbar } = useSnackbar();
    const [openConvertModal, setOpenConvertModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const table = useTable();
    const settings = useSettingsContext();

    const confirm = useBoolean();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [draftFolders, setDraftFolders] = useState<IDraftFolders[]>([]);
    const [expandedFolder, setExpandedFolder] = useState<string | false>(false);
    const [currentUser, setCurrentUser] = useState<IUserItem | null>(null);

    // Fetch draft folders with players
    const fetchDraftFolders = async (signal: AbortSignal, query: string) => {
        try {
            setLoading(true);
            const res = await GET(URL.GET_ALL_DRAFT_PLAYERS(query), signal);
            setDraftFolders(res);
        } catch (error) {
            console.error("Failed to fetch draft folders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }, []);

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedFolder(isExpanded ? panel : false);
    };

    const handleDeletePlayer = async (id: number) => {
        try {
            const res = await DELETE(URL.DELETE_PLAYER(id));
            Toaster("success", res.message);
            // Refresh the data
            const abortController = new AbortController();
            const signal = abortController.signal;
            fetchDraftFolders(signal, searchQuery);
        } catch (error) {
            console.log(error);
            Toaster("error", error.response.data.message);
        }
    };

    const handleEditPlayer = (player: IPlayer) => {
        setCurrentUser(player as any);
        setOpenEditModal(true);
    };

    const handleUpdatePlayer = (updatedUser: IUserItem) => {
        // Refresh the data after update
        const abortController = new AbortController();
        const signal = abortController.signal;
        fetchDraftFolders(signal, searchQuery);
    };

    // Filter players based on search query
    const getFilteredPlayers = (players: IPlayer[]) => {
        if (!searchQuery) return players;
        
        const query = searchQuery.toLowerCase();
        return players.filter((player) =>
            player.name.toLowerCase().includes(query) ||
            player.position?.code.toLowerCase().includes(query) ||
            player.college?.toLowerCase().includes(query)
        );
    };

    // Get total count of all players
    const getTotalPlayersCount = () => {
        return draftFolders.reduce((total, folder) => total + folder.players.length, 0);
    };

    // Get total count of filtered players
    const getFilteredPlayersCount = () => {
        return draftFolders.reduce((total, folder) => total + getFilteredPlayers(folder.players).length, 0);
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchDraftFolders(controller.signal, searchQuery);
        return () => controller.abort();
    }, [searchQuery]);

    return (
        <>
            <Container maxWidth={settings.themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="All Players by Draft Class"
                    links={[
                        { name: 'Dashboard', href: paths.dashboard.root },
                        { name: 'All Players', href: paths.dashboard.allDraft },
                        { name: 'Draft Classes' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                            onClick={() => setOpenConvertModal(true)}
                        >
                            Convert Players
                        </Button>
                    }
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                />

                <Card sx={{ p: 3 }}>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" gutterBottom>
                            {draftFolders.length} Draft Classes • {getTotalPlayersCount()} Total Players
                            {searchQuery && (
                                <Typography variant="body1" color="text.secondary" component="span">
                                    {' '}• {getFilteredPlayersCount()} Matches Found
                                </Typography>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                            placeholder="Search Players..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                 

                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 200,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            {draftFolders.length === 0 ? (
                                <Paper
                                    sx={{
                                        textAlign: 'center',
                                        py: 5,
                                        px: 3,
                                    }}
                                >
                                    <Typography variant="h6" color="text.secondary">
                                        No draft classes found
                                    </Typography>
                                </Paper>
                            ) : (
                                draftFolders.map((folder) => {
                                    const filteredPlayers = getFilteredPlayers(folder.players);
                                    
                                    // Don't show folder if no players match search
                                    if (searchQuery && filteredPlayers.length === 0) {
                                        return null;
                                    }

                                    return (
                                        <Accordion
                                            key={folder.id}
                                            expanded={expandedFolder === `panel-${folder.id}`}
                                            onChange={handleAccordionChange(`panel-${folder.id}`)}
                                            sx={{ mb: 2 }}
                                        >
                                            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                                    <Typography variant="h6">
                                                        {folder.name}
                                                    </Typography>
                                                    <Label color="primary" variant="soft">
                                                        {filteredPlayers.length} players
                                                    </Label>

                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {filteredPlayers.length === 0 ? (
                                                    <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                                                        No players found in this draft class.
                                                    </Typography>
                                                ) : (
                                                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                                                        <Scrollbar>
                                                            <Table size="medium" sx={{ minWidth: 960 }}>
                                                                <TableHeadCustom
                                                                    order={table.order}
                                                                    orderBy={table.orderBy}
                                                                    headLabel={TABLE_HEAD}
                                                                    rowCount={filteredPlayers.length}
                                                                    // numSelected={0}
                                                                    onSort={table.onSort}
                                                                />
                                                                <TableBody>
                                                                    {filteredPlayers
                                                                        .sort(getComparator(table.order, table.orderBy as keyof IPlayer))
                                                                        .map((player) => (
                                                                            <UserTableRow
                                                                                key={player.id}
                                                                                row={player}
                                                                                selected={false}
                                                                                onSelectRow={() => {}}
                                                                                onDeleteRow={handleDeletePlayer}
                                                                                onEditRow={() => handleEditPlayer(player)}
                                                                            />
                                                                        ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Scrollbar>
                                                    </TableContainer>
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                })
                            )}
                        </Box>
                    )}
                </Card>
            </Container>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure you want to delete this player?"
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            confirm.onFalse();
                        }}
                    >
                        Delete
                    </Button>
                }
            />

            <ConvertModal open={openConvertModal} onClose={() => setOpenConvertModal(false)} />
            <EditPlayerModal
                open={openEditModal}
                user={currentUser}
                onClose={() => {
                    setOpenEditModal(false);
                    setCurrentUser(null);
                }}
                onUpdate={handleUpdatePlayer}
            />
        </>
    );
}