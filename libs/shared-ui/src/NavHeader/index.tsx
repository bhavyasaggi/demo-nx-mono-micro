import {
  useColorMode,
  useColorModeValue,
  Heading,
  Box,
  Switch,
} from '@chakra-ui/react';

import cx from 'classnames';

import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface NavHeaderProps {}

export function NavHeader(props: NavHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.200', 'gray.900');

  const isDarkMode = colorMode === 'dark';
  return (
    <Box
      as="nav"
      bg={bg}
      p="2"
      className={cx(
        'd-flex',
        'align-items-center',
        'justify-content-center',
        styles['container']
      )}
    >
      <Heading fontSize="medium" className={cx('ms-0', 'me-auto')}>
        NX-MONO-MINCRO
      </Heading>
      <label className={cx("ms-auto','me-0")}>
        Dark Mode:{' '}
        <Switch isChecked={isDarkMode} onChange={() => toggleColorMode()} />
      </label>
    </Box>
  );
}

export default NavHeader;
