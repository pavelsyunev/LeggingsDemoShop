import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import Img from "gatsby-image"
import { Link } from "gatsby"
import Layout from "../components/layout"
// import { Layout, SEO, Link } from "../components"
import { useStaticQuery, graphql } from "gatsby"
import {
  useCartItems,
  useCart,
  useRemoveItemFromCart,
  useCheckoutUrl,
} from "gatsby-theme-shopify-manager"

import "../templates/product.css"

const CartPage = () => {
  const [showCartMessage, setShowCartMessage] = useState(false)

  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      allShopifyProduct {
        nodes {
          handle
          variants {
            shopifyId
          }
        }
      }
    }
  `)

  const lineItems = useCartItems()
  const cart = useCart()

  const removeItemFromCart = useRemoveItemFromCart()

  const checkoutUrl = useCheckoutUrl()

  const betterProductHandles = products.map(({ handle, variants }) => {
    const newVariants = variants.map(variant => variant.shopifyId)
    return {
      variants: newVariants,
      handle,
    }
  })

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find(product => {
      return product.variants.includes(variantId)
    })

    return selectedProduct ? selectedProduct.handle : null
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find(variant => {
      return variant.shopifyId === variantId
    })

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid
    }
    return null
  }

  const LineItem = ({ item }) => {
    const cartItems = useCartItems()
    async function removeFromCart() {
      if (cartItems.length < 1) {
        return
      }
      const variantId = cartItems[0].variant.id

      try {
        await removeItemFromCart(variantId)
        setShowCartMessage(true)
        setTimeout(() => {
          setShowCartMessage(false)
        }, 1500)
      } catch {
        alert("There was a problem removing that item from your cart.")
      }
    }

    return (
      <div className="m-4 border">
        <div className="font-sans grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-auto">
          <div>
            <div className="m-2 md:w-3/4">
              <Img fluid={getImageFluidForVariant(item.variant.id)} />
            </div>
          </div>

          <div className="p-4 flex flex-col justify-center items-center md:justify-start md:items-start">
            <Link
              className="font-semibold underline"
              to={`/product/${getHandleForVariant(item.variant.id)}`}
            >
              {item.title}
            </Link>

            <div className="mt-4 md:mt-2">
              {item.variant.selectedOptions.map(({ name, value }) => (
                <div key={name}>
                  <strong>{name}: </strong>
                  {value}
                </div>
              ))}
              <div key="quantity">
                <strong>Quantity: </strong>
                {item.quantity}
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end items-center p-4">
            <button className="underline" onClick={removeFromCart}>
              Delete
            </button>
            <div className="ml-6 text-lg font-bold">
              ${Number(item.variant.priceV2.amount).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const emptyCart = (
    <Layout>
      {/* <SEO title="Cart" /> */}
      <h1 className="m-4 text-2xl font-bold">Cart</h1>
      <p className="m-4 text-xl font-semibold">Your shopping cart is empty.</p>
    </Layout>
  )

  return lineItems.length < 1 ? (
    emptyCart
  ) : (
    <Layout>
      {/* <SEO title="Cart" /> */}
      <div className="m-4 text-2xl font-bold">Cart</div>
      {/* Delete message alert */}
      <CSSTransition
        in={showCartMessage}
        timeout={200}
        classNames="alert"
        unmountOnExit
      >
        <div className="m-4 p-6 text-center text-2xl border-solid border border-gray-400 rounded">
          Successfully removed an item from your cart!
        </div>
      </CSSTransition>
      {lineItems.map(item => (
        <React.Fragment key={item.id}>
          <LineItem key={item.id} item={item} />
          {/* <Divider sx={{ my: 3 }} /> */}
        </React.Fragment>
      ))}
      <div className=" m-4 font-sans md:flex justify-center md:justify-end">
        <div className="mt-2 p-6 bg-gray-200">
          <div className="text-2xl font-bold mb-4">Cart Summary</div>
          <div className="mb-2">
            <div className="font-medium text-sm">Subtotal:</div>
            <div>${cart.totalPrice}</div>
          </div>
          <div className="mb-2">
            <div className="font-medium text-sm">Shipping:</div>
            <div> - </div>
          </div>
          <div>
            <div className="font-medium text-sm">Tax: </div>
            <div>${cart.totalTax}</div>
          </div>

          <div className="my-4 text-lg font-bold">
            <div>Estimated Total:</div>
            <div>${cart.subtotalPrice}</div>
          </div>

          <a
            className="underline text-lg font-bold"
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Complete Your Order →
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
