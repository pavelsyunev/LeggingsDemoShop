import React from "react"
import Img from "gatsby-image"

export const Thumbnail = ({ image, onClick }) => {
  return (
    <button
      className="w-20 md:w-24 m-1 border-solid border border-gray-400 rounded"
      onClick={onClick}
    >
      <Img fluid={image.localFile.childImageSharp.fluid} />
    </button>
  )
}
