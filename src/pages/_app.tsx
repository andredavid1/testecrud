import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <footer style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'5vh', background:'#00ff00', width:'100%'}}>
        <span>A&T - Desenvolvimento web e marketing</span>
      </footer>
    </>
  )
}

export default MyApp
