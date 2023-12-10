import { useRouter } from 'next/router';

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import Authenticator from '@demo-nx-mono-micro/shared-ui/Authenticator';

import { type RootState } from '../../store';
import { actionSetUser, UserState } from '../../store/sliceUser';

export default function PageSignIn() {
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
    router.replace('/logged-in');
    return null;
  }

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh">
      <Authenticator onSuccess={onSuccessCb} onFailure={onFailureCb} />
    </Flex>
  );
}
