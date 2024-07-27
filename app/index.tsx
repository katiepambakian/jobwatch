import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired default page
    router.push('/register');
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default IndexPage;
