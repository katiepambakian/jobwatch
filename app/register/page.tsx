// app/login/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Box, Typography, Button } from '@mui/material';
import {Input} from '@nextui-org/input'
import { Visibility } from '@mui/icons-material';
import { isValid } from 'zod';

const fetchTitle = async (): Promise<string> => {
  // Simulating an API call or data fetching
  return 'Register Page'; // Return your desired title or data here
};

const RegisterPage: FC = async () => {
  const title = await fetchTitle();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Login page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/background.jpg)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input isRequired type="text" label="Name" labelPlacement ="outside"/>
            <Input isRequired type="email" label="Email"  labelPlacement ="outside"/>
            <Input isRequired type="password" label="Password"  labelPlacement ="outside"/>
            <Input type= "text" label="Postcode"  labelPlacement ="outside"/>
          </div>
        </Box>
      </div>
    </>
  );
};

export default RegisterPage;
