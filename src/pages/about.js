import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "YouCallMePaul.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="About leggings shop New York Gatsby Shopify" />
      <div className="grid md:grid-cols-2 m-4  rounded overflow-hidden shadow-lg">
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        <div className="px-6 py-2">
          <div className="font-bold text-base mb-2">Hey there!</div>
          <div className="text-gray-700 text-base">
            I'm Paul and this demo shop build with Gatsby and Shopify. Gatsby
            provide lightweight solution to connect Shopify data. You can build
            any e-commerce projects based on this solution. Under the hood I
            used: React, Gatsby, Shopify, Gatsby Theme Shopify Manager, Tailwind
            CSS, GraphQL, some animations and my coding passion. If you have any
            questions or projects to discuss send me a message to
            paul.deepov(at)gmail.com
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
