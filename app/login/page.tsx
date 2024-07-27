// pages/index.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';

// Define the type for props if needed
interface HomePageProps {
  title?: string;
}

// Define the page component
const HomePage: NextPage<HomePageProps> = ({ title = 'Login' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A description of your page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h1" component="h1">
          Welcome to the {title}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4 }}>
          Get Started
        </Button>
      </Box>
    </>
  );
};

// Optionally, you can fetch data for server-side rendering or static generation
export async function getStaticProps() {
  return {
    props: {
      title: 'Home Page', // Example of passing props to the page
    },
  };
}

export default HomePage;
