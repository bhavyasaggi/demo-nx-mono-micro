import '@demo-nx-mono-micro/shared-ui/bootstrap.scss';

import { AppProps } from 'next/app';
import { Rubik } from 'next/font/google';

import { Provider } from 'react-redux';

import { extendTheme, ChakraProvider } from '@chakra-ui/react';

import NavHeader from '@demo-nx-mono-micro/shared-ui/NavHeader';

import { store } from '../store';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: false,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${rubik.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <NavHeader />
          <main className={`${rubik.className}`}>
            {/* @ts-expect-error Spread Syntax */}
            <Component {...pageProps} />
          </main>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
