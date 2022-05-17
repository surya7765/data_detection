import '../styles/globals.css'
import { BlogProvider } from '../context/BlogContext'
import '../styles/hexstyle.css'


function MyApp({ Component, pageProps }) {
  return (
    <BlogProvider>
      <Component {...pageProps} />
    </BlogProvider>
  )
}

export default MyApp
