import { useRouter } from 'next/router';

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@chakra-ui/react';

import Authenticator from '@demo-nx-mono-micro/shared-ui/Authenticator';

import { type RootState } from '../store';
import { actionSetUser, UserState } from '../store/sliceUser';

export default function Home() {
  const router = useRouter();

  const userToken = useSelector((state: RootState) => state.user.token);

  const dispatch = useDispatch();

  const onSuccessCb = useCallback(
    (userData: UserState) => {
      if (userData && userData.token) {
        dispatch(actionSetUser(userData));
      }
    },
    [dispatch]
  );

  const onFailureCb = useCallback(() => {
    router.push('/logged-out');
  }, [router]);

  if (userToken) {
    router.push('/logged-in');
    return null;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      minHeight="100vh"
    >
      <Authenticator onSuccess={onSuccessCb} onFailure={onFailureCb} />
    </Box>
  );
}
