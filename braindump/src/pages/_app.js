import '../styles/globals.css'
import '../styles/typeface.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <script src="/static/js/img.js"></script>
    </SessionProvider>
  )
}

export default MyApp
