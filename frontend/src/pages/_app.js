import "@fortawesome/fontawesome-svg-core/styles.css"
import "../scss/style.default.scss"
import Layout from "../components/Layout"
import React from "react"
function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
