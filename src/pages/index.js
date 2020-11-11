import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Tile from "../components/tile"

const IndexPage = ({ data }) => {
  const {
    allShopifyProduct: { nodes: products },
  } = data

  return (
    <Layout>
      <SEO title="Leggings shop New York" />
      <Hero />
      <div className="font-sans grid grid-cols-1 text-center md:grid-cols-3 gap-4 mt-2">
        {products.map(product => (
          <Tile
            key={product.handle}
            slug={product.handle}
            title={product.title}
            price={Number(product.priceRange.maxVariantPrice.amount)}
            image={product.images[0].localFile.childImageSharp.fluid}
          />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query allProducts {
    allShopifyProduct {
      nodes {
        title
        handle
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
