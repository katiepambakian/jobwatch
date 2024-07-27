// app/login/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Box, Typography, Button } from '@mui/material';


const fetchTitle = async (): Promise<string> => {
  // Simulating an API call or data fetching
  return 'Register Page'; // Return your desired title or data here
};

const RegisterPage: FC = async () => {
  const title = await fetchTitle();

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Login page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/background.jpg)' }}>
      </div>
      <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mt: 8 }}>
        <Typography variant="h3" component="p">
          Enter your email in the form below to be put on our waitlist!
        </Typography>
        
        
      </Box>
    </>
  );
};

export default RegisterPage;
