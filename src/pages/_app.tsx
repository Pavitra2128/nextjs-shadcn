import '../app/globals.css'; // Ensure this path is correct
import type { AppProps } from 'next/app';
import Navbar from './NavBar'; // Adjust path if necessary
import FooterSection from './FooterSection'; // Adjust path if necessary
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <FooterSection />
    </>
  );
}

export default appWithTranslation(MyApp);
