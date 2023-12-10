import Head from 'next/head';
import Router from 'next/router';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import Dashboard from '@demo-nx-mono-micro/shared-ui/Dashboard';

import { RootState } from '../../store';
import { actionResetUser } from '../../store/sliceUser';

export default function PageLoggedIn() {
  const { id, firstName, lastName, image, gender, email, token } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const onLogoutCb = useCallback(() => {
    dispatch(actionResetUser());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      Router.replace('/sign-in');
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex minHeight="100vh" alignItems="center" justifyContent="center">
        <Dashboard
          id={id}
          firstName={firstName}
          lastName={lastName}
          image={image}
          gender={gender}
          email={email}
          onLogout={onLogoutCb}
        />
      </Flex>
    </>
  );
}
