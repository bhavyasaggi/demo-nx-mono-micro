import { Box, Heading } from '@chakra-ui/react';

import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface AuthSuccessProps {}

export function AuthSuccess(props: AuthSuccessProps) {
  return (
    <Box className={styles['container']}>
      <Heading>Welcome to Demo-NX-Mono-Micro!</Heading>
    </Box>
  );
}

export default AuthSuccess;
