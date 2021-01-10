import Head from 'next/head'
import { Global } from '@emotion/react'
import xw from 'xwind'

import '../styles/base.css'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Wikiplaylist</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Global
        //keyframes + ring and shadow classes variables  ... to global styles
        styles={xw`XWIND_GLOBAL`}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
