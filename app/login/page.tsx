// app/login/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Box, Typography, Button } from '@mui/material';

const fetchTitle = async (): Promise<string> => {
  // Simulating an API call or data fetching
  return 'Login Page'; // Return your desired title or data here
};

const LoginPage: FC = async () => {
  const title = await fetchTitle();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Login page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundImage: 'url(../img/worker.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center', 
        mt: 8 }}>
        <Typography variant="h1" component="h1">
          Welcome to the {title}
        </Typography>
        
        
      </Box>
    </>
  );
};

export default LoginPage;
