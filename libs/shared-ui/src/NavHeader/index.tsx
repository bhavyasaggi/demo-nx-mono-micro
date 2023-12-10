import {
  useColorMode,
  useColorModeValue,
  Heading,
  Flex,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import Link from '../Link';

/* eslint-disable-next-line */
export interface NavHeaderProps {}

export function NavHeader(props: NavHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.200', 'gray.900');

  const isDarkMode = colorMode === 'dark';
  return (
    <Flex as="nav" alignItems="center" bg={bg} p="2" w="100%">
      <Heading fontSize="medium" flexGrow={1} flexShrink={0}>
        <Link href="/">NX-MONO-MICRO</Link>
      </Heading>
      <FormControl
        as={Flex}
        alignItems="center"
        justifyContent="end"
        marginStart="auto"
      >
        <FormLabel htmlFor="switch-color-mode">Dark Mode: </FormLabel>
        <Switch
          id="switch-color-mode"
          isChecked={isDarkMode}
          onChange={() => toggleColorMode()}
        />
      </FormControl>
    </Flex>
  );
}

export default NavHeader;
