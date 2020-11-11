import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import BackgroundImage from "gatsby-background-image"

const Hero = ({ title, description }) => {
  const [windowWidth, setWindowWidth] = useState(0)

  const {
    heroImage: {
      childImageSharp: { fluid: heroImage },
    },
  } = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "hero.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  return windowWidth >= 500 ? (
    <BackgroundImage
      className="mb-6 py-32 bg-contain bg-no-repeat bg-left flex flex-col justify-center items-center rounded overflow-hidden shadow-lg"
      fluid={heroImage}
    >
      <div className="font-sans bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 text-center">
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 text-5xl font-extrabold">
          {title}
        </div>
        <div className="text-3xl font-extrabold">{description}</div>
      </div>
    </BackgroundImage>
  ) : (
    <div className="mb-6 py-16 flex flex-col justify-center items-center overflow-hidden shadow-lg">
      <div className="font-sans bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 text-center">
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 text-3xl font-extrabold">
          {title}
        </div>
        <div className="text-2xl font-extrabold">{description}</div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

Hero.defaultProps = {
  title: "Running Fitness Yoga",
  description: "For workouts and life",
}

export default Hero
