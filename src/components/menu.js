import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { Link } from "gatsby"

import "../templates/product.css"

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)

  const onShowMenu = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true)
  }

  return (
    <div className="flex ml-2 items-center text-white">
      <button onClick={onShowMenu}>
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          />
        </svg>
      </button>

      <CSSTransition
        in={showMenu}
        timeout={200}
        classNames="alert"
        unmountOnExit
      >
        <ul className="block absolute z-50 block top-0 right-0 mr-6 mt-16 p-2 bg-black p-6 rounded shadow-lg">
          <Link className="block py-1" to="/">
            Home
          </Link>
          <Link className="block py-1" to="/about">
            About
          </Link>
          <Link className="block py-1" to="/cart">
            Cart
          </Link>
        </ul>
      </CSSTransition>
    </div>
  )
}

export default Menu
