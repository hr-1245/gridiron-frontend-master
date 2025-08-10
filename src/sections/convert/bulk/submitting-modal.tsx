'use client';

import { Dialog, Typography, Box, Fade } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

const QUOTES = [
  "“Put the team on your back.” — Madden NFL",
  "“This is where legends are made.”",
  "“You hit like a freight train!”",
  "“Every yard counts.”",
  "“Stay ready, so you don’t have to get ready.”",
  "“Fourth quarter is where champions are built.”",
  "“Game speed is different than practice speed.”",
  "“Respect is earned, not given.”",
  "“Big-time players make big-time plays in big-time games.”",
  "“Fast don’t lie.”",
  "“Defense wins championships.”",
  "“It’s not about the X’s and O’s, it’s about the Jimmys and Joes.”",
  "“Train like you play. Play like you train.”",
  "“Greatness is a grind.”",
  "“Speed kills. Period.”",
];

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}));

export default function SubmittingModal({ open }: { open: boolean }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <StyledDialog open={open} fullScreen>
      <Fade in={open} timeout={500}>
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <video
            autoPlay
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              top: 0,
              left: 0,
              zIndex: -1,
              filter: 'brightness(0.3)',
            }}
          >
            <source src="/assets/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* ⚡ Overlay Content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#fff',
              textAlign: 'center',
              px: 3,
              backdropFilter: 'blur(4px)',
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontFamily: 'Oswald, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: 2,
                textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              Converting Players with AI...
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                fontStyle: 'italic',
                mt: 2,
                color: 'grey.300',
                textShadow: '1px 1px 6px rgba(0,0,0,0.5)',
                transition: 'opacity 0.5s ease',
              }}
            >
              {QUOTES[quoteIndex]}
            </Typography>
          </Box>
        </Box>
      </Fade>
    </StyledDialog>
  );
}
