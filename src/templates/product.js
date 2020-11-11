import React, { useState, useEffect, useMemo } from "react"
import { CSSTransition } from "react-transition-group"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Thumbnail, OptionPicker } from "./components"
import { graphql } from "gatsby"
import { prepareVariantsWithOptions, prepareVariantsImages } from "./utilities"
import { useAddItemToCart } from "gatsby-theme-shopify-manager"

import "./product.css"

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  const colors = product.options.find(
    option => option.name.toLowerCase() === "color"
  ).values

  const sizes = product.options.find(
    option => option.name.toLowerCase() === "size"
  ).values

  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ])
  const images = useMemo(() => prepareVariantsImages(variants, "color"), [
    variants,
  ])

  if (images.length < 1) {
    throw new Error("Must have at least one product image!")
  }

  const addItemToCart = useAddItemToCart()
  const [variant, setVariant] = useState(variants[0])
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)
  const [showCartMessage, setShowCartMessage] = useState(false)

  useEffect(() => {
    const newVariant = variants.find(variant => {
      return variant.size === size && variant.color === color
    })

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.shopifyId])

  const gallery =
    images.length > 1 ? (
      <div className="flex flex-wrap justify-center">
        {images.map(({ image, color }) => (
          <Thumbnail
            key={color}
            image={image}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
    ) : null

  function handleAddToCart() {
    addItemToCart(variant.shopifyId, 1)
    setShowCartMessage(true)
    setTimeout(() => {
      setShowCartMessage(false)
    }, 2000)
  }

  return (
    <Layout>
      <SEO title={product.title} />
      <CSSTransition
        in={showCartMessage}
        timeout={200}
        classNames="alert"
        unmountOnExit
      >
        <div className="m-4 p-6 text-center text-2xl border-solid border border-gray-400 rounded">
          Added to your cart!
        </div>
      </CSSTransition>

      <div className="font-sans grid md:grid-cols-2 m-4 rounded shadow-lg">
        {/* Images */}
        <div className="m-4">
          <div className="border-solid border border-gray-400 rounded">
            <Img fluid={variant.image.localFile.childImageSharp.fluid} />
          </div>
          {gallery}
        </div>

        <div className="m-4">
          <div className="text-xl font-bold mb-4">{product.title}</div>
          <p className="text-sm mb-4">{product.description}</p>
          {variant.availableForSale ? (
            <p className="text-lg font-bold mb-4">$ {variant.price}</p>
          ) : (
            <p className="text-lg font-bold mb-4">Sorry. Out of stock.</p>
          )}

          <div className="grid grid-cols-2 mb-4">
            <div className="m-1">
              <OptionPicker
                key="Color"
                name="Color"
                options={colors}
                selected={color}
                onChange={event => setColor(event.target.value)}
              />
            </div>
            <div className="m-1">
              <OptionPicker
                key="Size"
                name="Size"
                options={sizes}
                selected={size}
                onChange={event => setSize(event.target.value)}
              />
            </div>
          </div>

          {variant.availableForSale ? (
            <button
              className="bg-purple-700 m-1 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          ) : (
            <button className="cursor-not-allowed bg-gray-400 m-1 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage

export const ProductPageQuery = graphql`
  query productPage($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      id
      title
      description
      descriptionHtml
      options {
        name
        values
      }
      variants {
        shopifyId
        availableForSale
        price
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
