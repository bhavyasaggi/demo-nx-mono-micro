import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import AuthSuccess from '@demo-nx-mono-micro/shared-ui/AuthSuccess';

import { RootState } from '../../store';
import { actionResetUser } from '../../store/sliceUser';

export default function PageLoggedIn() {
  const router = useRouter();
  const { id, firstName, lastName, image, gender, email, token } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const onLogoutCb = useCallback(() => {
    dispatch(actionResetUser());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [router, token]);

  if (!token) {
    return null;
  }

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <AuthSuccess
        id={id}
        firstName={firstName}
        lastName={lastName}
        image={image}
        gender={gender}
        email={email}
        onLogout={onLogoutCb}
      />
    </Flex>
  );
}
