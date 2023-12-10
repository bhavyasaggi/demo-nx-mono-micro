import {
  useColorMode,
  useColorModeValue,
  Heading,
  Flex,
  Switch,
} from '@chakra-ui/react';

import cx from 'classnames';
import Link from '../Link';

/* eslint-disable-next-line */
export interface NavHeaderProps {}

export function NavHeader(props: NavHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.200', 'gray.900');

  const isDarkMode = colorMode === 'dark';
  return (
    <Flex as="nav" alignItems="center" justifyContent="center" bg={bg} p="2">
      <Heading fontSize="medium" className={cx('ms-0', 'me-auto')}>
        <Link href="/">NX-MONO-MINCRO</Link>
      </Heading>
      <label className={cx("ms-auto','me-0")}>
        Dark Mode:{' '}
        <Switch isChecked={isDarkMode} onChange={() => toggleColorMode()} />
      </label>
    </Flex>
  );
}

export default NavHeader;
