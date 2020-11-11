import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="container mx-auto relative">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="h-full flex flex-col justify-between">
        <main>{children}</main>
        <footer className="my-6 ml-4">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
          {` `} & {` `}
          <a href="https://www.shopify.com/">Shopify</a>
          {` `} by Paul S
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
