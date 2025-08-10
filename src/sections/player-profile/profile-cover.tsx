import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import { IUserProfileCover } from 'src/types/user';
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function ProfileCover({ name, avatarUrl, role, coverUrl }: IUserProfileCover) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
     
        <Box
          onClick={handleOpen}
          sx={{
            cursor: 'pointer',
            ...bgGradient({
              color: 'rgba(0, 0, 0, 0.5)',
              imgUrl: coverUrl,
            }),
            height: { xs: 240, md: 650 },
            color: 'common.white',
          }}
        >
          
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              left: { md: 24 },
              bottom: { md: 14 },
              zIndex: { md: 10 },
              pt: { xs: 6, md: 0 },
              position: { md: 'absolute' },
            }}
          >
            <Avatar
              alt={name}
              src={avatarUrl}
              sx={{
                mx: 'auto',
                width: { xs: 64, md: 128 },
                height: { xs: 64, md: 128 },
                border: `solid 2px ${theme.palette.common.white}`,
                boxShadow: (theme) => `0 4px 8px ${alpha(theme.palette.common.black, 0.24)}`,
              }}
            >
              {name?.charAt(0).toUpperCase()}
            </Avatar>

            <ListItemText
              sx={{
                mt: 5,
                ml: { md: 3 },
                textAlign: 'center',
              }}
              primary={name}
              primaryTypographyProps={{
                typography: 'h4',
                textAlign: 'center',
              }}
              secondary={role}
              secondaryTypographyProps={{
                typography: 'body1',
                textAlign:'left'
              }}
            />
          </Stack>
        </Box>
      
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.4)',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
            }}
          >
            X
          </IconButton>
          <Box
            component="img"
            src={coverUrl}
            alt="Full cover"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
