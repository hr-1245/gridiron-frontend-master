import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Label from 'src/components/label';
import { IUser } from 'src/types/user';
import { RootState } from 'src/redux/store';
import { useAppSelector } from 'src/redux/hook';
import { useRouter } from 'next/navigation';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const user = useAppSelector((root: RootState) => root?.user?.user) as IUser;
  const router = useRouter();

  const { logout } = useAuthContext();
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.photoURL} alt={user?.fullName} sx={{ width: 48, height: 48 }}>
            {user?.fullName?.charAt(0).toUpperCase()}
          </Avatar>

        </Box>

        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
        </Stack>

        <Button variant="contained" onClick={handleLogout}>
          Log Out
        </Button>
      </Stack>
    </Stack>
  );
}
