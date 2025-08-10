'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider'
import { useSettingsContext } from 'src/components/settings';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';

import React from 'react';

// ----------------------------------------------------------------------

const stepsManual = [
  {
    title: 'Step 1: Enter Player Info',
    description:
      'Input the player name, draft round, and draft class you want him to belong to.',
  },
  {
    title: 'Step 2: Fill Attributes',
    description:
      'Enter player biodata and attributes from College Football Dynasty.',
  },
  {
    title: 'Step 3: AI Conversion',
    description:
      'Our AI converts the data to Madden 25-ready player stats.',
  },
  {
    title: 'Step 4: Access Converted Player',
    description:
      'Visit the draft folder on your homepage to view and manage the player.',
  },
];

const stepsBulk = [
  {
    title: 'Step 1: Capture Images',
    description:
      'Take screenshots of each player’s leaving page and their attributes.',
  },
  {
    title: 'Step 2: Upload in Bulk',
    description:
      'Upload images for up to 5 players and name your draft folder.',
  },
  {
    title: 'Step 3: Automated Extraction',
    description:
      'GridIron AI processes and saves all player data from the uploaded images.',
  },
  {
    title: 'Step 4: View in Dashboard',
    description:
      'Access players by draft folder anytime from your homepage.',
  },
];

const renderStepCards = (steps: typeof stepsManual) => {
  const theme = useTheme();
  return (
    <Stack spacing={4} alignItems="flex-start" width="100%">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Grow in timeout={400 + index * 200}>
            <Card
              sx={{
                width: '100%',
                maxWidth: 600,
                px: 3,
                py: 2,
                transition: 'transform 0.3s ease',
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grow>

         
        </React.Fragment>
      ))}
    </Stack>
  );
};

const videos = [
  {
    id: 'video1',
    title: 'Tutorial Video 1',
    src: 'https://www.youtube.com/embed/jVUvTL3virg?si=ru1yhBh4hD5ECKMB',
  },
  {
    id: 'video2',
    title: 'Tutorial Video 2',
    src: 'https://www.youtube.com/embed/t4PAsII_lH4?si=p8gzNcgDAxZw2TeZ',
  },
];
export default function OneView() {
  const settings = useSettingsContext();
  const theme = useTheme();

  const [openVideo, setOpenVideo] = useState<string | null>(null);

  const handleOpen = (id: string) => setOpenVideo(id);
  const handleClose = () => setOpenVideo(null);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* Heading */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          How to use GridIron like a Pro!
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Follow these easy steps to smoothly transition your players from College Football Dynasty to Madden Franchise.
        </Typography>
      </Box>

      {/* Video Grid */}
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid key={video.id} item xs={12} md={6}>
            <Box
              onClick={() => handleOpen(video.id)}
              sx={{
                position: 'relative',
                height: 0,
                paddingTop: '56.25%',
                borderRadius: 2,
                cursor: 'pointer',
                overflow: 'hidden',
                border: `2px solid ${theme.palette.error.main}`,
                bgcolor: alpha(theme.palette.grey[500], 0.08),
              }}
            >
              <Box
                component="iframe"
                src={video.src}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              />
            </Box>

            <Dialog
              fullWidth
              maxWidth="md"
              open={openVideo === video.id}
              onClose={handleClose}
              PaperProps={{
                sx: { borderRadius: 2, overflow: 'hidden' },
              }}
            >
              <Box position="relative" pb="56.25%" sx={{ bgcolor: 'black' }}>
                <Box
                  component="iframe"
                  src={video.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              </Box>

              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 10,
                  color: 'common.white',
                  backgroundColor: alpha(theme.palette.grey[900], 0.6),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.grey[900], 0.9),
                  },
                }}
              >
                
              </IconButton>
            </Dialog>
          </Grid>
        ))}
      </Grid>

      {/* Divider */}
      <Box mt={6} mb={4}>
        <Divider sx={{ borderColor: theme.palette.divider }} />
      </Box>
{/* Manual Convert Section */}
{/* Dual Column Step Guide */}
<Grid container spacing={4} mt={6}>
  <Grid item xs={12} md={6}>
    <Box>
      <Typography variant="h5" gutterBottom>
        Manually Convert Players
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Add players one-by-one with detailed input.
      </Typography>
      {renderStepCards(stepsManual)}
    </Box>
  </Grid>

  <Grid item xs={12} md={6}>
    <Box>
      <Typography variant="h5" gutterBottom>
        Bulk Upload Conversion
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload multiple players in one go using screenshots.
      </Typography>
      {renderStepCards(stepsBulk)}
    </Box>
  </Grid>
</Grid>

{/* Features Summary */}
{/* <Box mt={10} textAlign="center">
  <Typography variant="h6" gutterBottom>
    Why Use GridIron?
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Save and revisit players, manage drafts, edit or delete records anytime, and speed up your Madden franchise building with GridIron AI.
  </Typography>
</Box>   */}
 </Container>
  );
}