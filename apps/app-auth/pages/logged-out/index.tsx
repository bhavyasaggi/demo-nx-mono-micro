import Head from 'next/head';

import {
  Flex,
  Card,
  CardBody,
  Heading,
  Divider,
  Center,
} from '@chakra-ui/react';

import Link from '@demo-nx-mono-micro/shared-ui/Link';

export default function PageLoggedOut() {
  return (
    <>
      <Head>
        <title>Logged Out</title>
      </Head>
      <Flex minHeight="100vh" alignItems="center" justifyContent="center">
        <Card>
          <CardBody>
            <Heading>Logged out successfully</Heading>
            <Divider />
            <Center>
              <Link href="/sign-in">Sign In</Link>
            </Center>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
