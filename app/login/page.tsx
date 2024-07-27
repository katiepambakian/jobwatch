// app/login/page.tsx
import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@mui/material';

interface LoginFormInputs {
  email: string;
  password: string;
}

const fetchTitle = async (): Promise<string> => {
  // Simulating an API call or data fetching
  return 'Login Page'; // Return your desired title or data here
};

const LoginPage: FC = async () => {
  const title = await fetchTitle();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Login page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h1" component="h1">
          Welcome to the {title}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: 400, marginTop: '32px' }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Typography sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" passHref>
            <Button variant="outlined" color="secondary">
              Register
            </Button>
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginPage;
