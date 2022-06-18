import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { ThemeProvider } from 'next-themes'

import type { AppProps } from 'next/app'
import Layout from '../comps/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet" />
    </Head>
    <ThemeProvider enableSystem={true} attribute="class">
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
    </>
  )
}

export default MyApp
