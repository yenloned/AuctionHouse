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
      <title>Auction House | Bidding Platform</title>
      <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" />
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
