import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Tile = ({ title, slug, price, image }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "hero.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageSrc = image ? image : data.placeholderImage.childImageSharp.fluid

  return (
    <div className="mx-4 max-w-sm rounded overflow-hidden shadow-lg">
      <Img fluid={imageSrc} />
      <div className="px-6 py-2">
        <div className="font-bold text-base mb-2">{title}</div>
        <div className="text-gray-700 text-base">${price.toFixed(2)}</div>
      </div>
      <div className="px-6 py-4">
        <Link
          className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          to={`/product/${slug}`}
        >
          View
        </Link>
      </div>
    </div>
  )
}

Tile.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  price: PropTypes.number,
}

Tile.defaultProps = {
  title: "Men's Down Jacket",
  price: "50",
}

export default Tile
