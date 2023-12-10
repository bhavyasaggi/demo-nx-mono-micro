import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Flex, Heading } from '@chakra-ui/react';

import { type RootState } from '../store';
import Link from '@demo-nx-mono-micro/shared-ui/Link';

export default function Home() {
  const router = useRouter();

  const userToken = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (userToken) {
      router.replace('/logged-in');
    } else {
      router.replace('/sign-in');
    }
  }, [userToken, router]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Heading>Welcome!</Heading>
      <Link href="/sign-in">Sign In Manually</Link>
    </Flex>
  );
}
