import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
// import { Toaster } from 'src/components/toaster';

// ----------------------------------------------------------------------

type Props = {
  image?: string;
  children: React.ReactNode;
};

export default function AuthModernLayout({ children, image }: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
      }}
    >
      <Logo
        sx={{
          mt: { xs: 2, md: 8 },
          mb: { xs: 10, md: 8 },
        }}
      />


      <Card
        sx={{
          py: { xs: 5, md: 0 },
          px: { xs: 3, md: 0 },
          boxShadow: { md: 'none' },
          overflow: { md: 'unset' },
          bgcolor: { md: 'background.default' },
        }}
      >
        {children}
      </Card>
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: 'relative', height: '100vh' }}>
      {/* Background Image */}
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/background/overlay_4.webp'}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // adjust opacity here
          zIndex: 2,
        }}
      />
    </Stack>
  );

  return (
    <>
      {/* <Toaster /> */}
      <Stack
        component="main"
        direction="row"
        sx={{
          minHeight: '100vh',
          position: 'relative',
          '&:before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            position: 'absolute',
            backgroundSize: 'cover',
            opacity: { xs: 0.24, md: 0 },
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(/assets/background/overlay_4.webp)',
          },
        }}
      >
        {renderContent}

        {mdUp && renderSection}
      </Stack>
    </>
  );
}
