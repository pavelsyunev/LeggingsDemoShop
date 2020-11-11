import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { useCartCount } from "gatsby-theme-shopify-manager"
import Menu from "./menu"

const Header = ({ siteTitle }) => {
  const count = useCartCount()

  return (
    <header className="bg-purple-800">
      <div className="flex m-auto justify-between items-center max-w-screen-lg p-6">
        <h1 className="text-xl md:text-3xl font-semibold">
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div className="flex">
          <Link to="/cart">
            <div className="flex justify-center items-center p-2 font-sans text-white font-semibold text-sm ">
              Cart{" "}
              <span className="ml-1 text-white rounded-full bg-red-600 h-6 w-6 flex items-center justify-center">
                {count}
              </span>
            </div>
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Leggings Demo Shop`,
}

export default Header
