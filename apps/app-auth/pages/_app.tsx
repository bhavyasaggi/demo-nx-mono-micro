import '@demo-nx-mono-micro/shared-ui/bootstrap.scss';

import { AppProps } from 'next/app';
import { Rubik } from 'next/font/google';

import { Provider } from 'react-redux';

import { extendTheme, ChakraProvider } from '@chakra-ui/react';

import NavHeader from '@demo-nx-mono-micro/shared-ui/NavHeader';

import { setupStore } from '../store';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: false,
});

const store = setupStore();

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyComponent = Component as any;
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
            <AnyComponent {...pageProps} />
          </main>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
