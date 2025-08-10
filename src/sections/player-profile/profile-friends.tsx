import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { IDraftFolders, IPlayer } from 'src/types/player';
import { CircularProgress } from '@mui/material';
import FileManagerFolderItem from './file-manager-folder-item';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = {
  draftFolders: IDraftFolders[];
  searchQuery: string;
  onSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

export default function ProfileFriends({ draftFolders, searchQuery, onSearchQueryChange, loading }: Props) {
  const notFound = !draftFolders.length && !!searchQuery;
  const router = useRouter();

  return (
    <>
      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 5 }}
      >
        <Typography variant="h4">Browse Draft Classes</Typography>
        {/* <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Total Draft Classes: {draftFolders.length} | Total Players: {getTotalPlayersCount()}
                    </Typography> */}
        <TextField
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder="Search Draft Classes..."
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
          No players found. Try converting players to this draft class first.
        </SearchNotFound>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {draftFolders.map((folder) => (
            <FileManagerFolderItem
              key={folder.id}
              folder={{
                id: folder.id,
                name: folder.name,
                totalFiles: folder.players.length,
                url: `/dashboard/profile/draft/${folder.id}`,
                createdAt: folder.createdAt,
                updatedAt: folder.createdAt,
              }}
              onDelete={() => console.info('DELETE', folder.id)}
              onClick={() => router.push(`/dashboard/profile/draft/${folder.id}`)}
              sx={{ width: 200 }}
            />
          ))}
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
              School
            </Typography>
            <Typography variant="body1">{homeTown}</Typography>
          </Box>
        </Stack>
      </Card>

    </>
  );
}


