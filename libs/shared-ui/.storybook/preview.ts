import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: false,
});

export const parameters = {
  chakra: {
    theme,
  },
};
