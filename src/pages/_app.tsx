// _app.tsx
import '../app/globals.css';
import type { AppProps } from 'next/app';
import Navbar from './NavBar';
import FooterSection from './FooterSection';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
      <footer>
        <FooterSection />
      </footer>
    </>
  );
}

export default MyApp;