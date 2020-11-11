const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        nodes {
          shopifyId
          handle
        }
      }
    }
  `)

  data.allShopifyProduct.nodes.forEach(node => {
    createPage({
      path: `/product/${node.handle}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        shopifyId: node.shopifyId,
      },
    })
  })
}
