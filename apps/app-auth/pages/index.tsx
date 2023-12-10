import Head from 'next/head';
import Router from 'next/router';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Flex, Heading } from '@chakra-ui/react';

import { type RootState } from '../store';
import Link from '@demo-nx-mono-micro/shared-ui/Link';

export default function Home() {
  const userToken = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (userToken) {
      Router.replace('/logged-in');
    } else {
      Router.replace('/sign-in');
    }
  }, [userToken]);

  return (
    <>
      <Head>
        <title>Welcome Home</title>
      </Head>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Heading>Welcome!</Heading>
        <Link data-testid="link-sign-in" href="/sign-in">
          Sign In Manually
        </Link>
      </Flex>
    </>
  );
}
