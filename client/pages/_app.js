import '../styles/globals.css'
import { BlogProvider } from '../context/BlogContext'

function MyApp({ Component, pageProps }) {
  return (
    <BlogProvider>
      <Component {...pageProps} />
    </BlogProvider>
  )
}

export default MyApp
