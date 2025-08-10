import { CardProps } from '@mui/material/Card';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

export interface IFolderManager {
  id: string;
  name: string;
  totalFiles: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface Props extends CardProps {
  folder: IFolderManager;
  onDelete: VoidFunction;
  onClick?: () => void;
}

export default function FileManagerFolderItem({
  folder,
  onClick,
  sx,
  ...other
}: Props) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      alignItems="flex-start"
      onClick={onClick}
      sx={{
        p: 2.5,
        width: 200,
        borderRadius: 2,
        bgcolor: 'background.paper',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-3px)',
        },
        ...sx,
      }}
      {...other}
    >
      <Box component="img" src="/assets/icons/files/ic_folder.svg" sx={{ width: 36, height: 36 }} />

      <ListItemText
        sx={{ textTransform: 'capitalize' }}
        primary={folder.name}
        secondary={folder.totalFiles > 1 ? `${folder.totalFiles} players` : `${folder.totalFiles} player`}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle1',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: 'span',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

     
    </Stack>
  );
}
