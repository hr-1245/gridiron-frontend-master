import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import {IPlayer } from 'src/types/player';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = {
    players: IPlayer[];
    searchQuery: string;
    onSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
};

export default function PlayerCardView({ players, searchQuery, onSearchQueryChange, loading }: Props) {
    const notFound = !players.length && !!searchQuery;
    const router = useRouter();

    return (
        <>
            <Stack
                spacing={2}
                justifyContent="space-between"
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ my: 5 }}
            >
                <Typography variant="h4">All Players</Typography>

                <TextField
                    value={searchQuery}
                    onChange={onSearchQueryChange}
                    placeholder="Search Players..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: { xs: 1, sm: 260 } }}
                />
            </Stack>


            {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="300px" width="100%">
                    <CircularProgress size={40} thickness={4} />
                </Box>
            ) : notFound ? (
                <SearchNotFound query={searchQuery} sx={{ mt: 10 }}>
                    No players found. Try converting players to draft first.
                </SearchNotFound>
            ) : (
                <Box gap={2}>
                    <Box
                        gap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        }}
                    >
                        {players.map((player) => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </Box>
                </Box>
            )}
        </>
    );
}

// ----------------------------------------------------------------------

type PlayerCardProps = {
    player: IPlayer;
};
function PlayerCard({ player }: PlayerCardProps) {
    const { id, name, position, playerClass, jerseyNumber, height, weight, homeTown, college, projectedReason } = player;

    const popover = usePopover();

    const handleDelete = () => {
        popover.onClose();
        console.info('DELETE', name);
    };

    const handleEdit = () => {
        popover.onClose();
        console.info('EDIT', name);
    };


    return (
        <>
            <Card
                key={id}
                component={RouterLink}
                href={paths.dashboard.profile.view(id)} // dynamic profile route
                sx={{
                    py: 5,
                    px: 3,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                }}
            >
                <Avatar alt={name} src={"avatarUrl"} sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }} />

                <Typography variant="subtitle1" color="text.primary">
                    {name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    {position.code}
                </Typography>

                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Box textAlign="center">
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                            Draft Round
                        </Typography>
                        <Typography variant="body1">{projectedReason ? projectedReason : 1}</Typography>
                    </Box>

                    <Box textAlign="center">
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                            College
                        </Typography>
                        <Typography variant="body1">{college}</Typography>
                    </Box>
                </Stack>
            </Card>

        </>
    );
}

