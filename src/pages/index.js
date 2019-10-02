import React from "react"
import { Link, graphql } from "gatsby"
import "gatsby-remark-vscode/styles.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const calculateReadingTime = words => {
  const averageReadingSpeed = 200 // words per minute
  return Math.ceil(words / averageReadingSpeed)
}

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4)
                  }}
                >
                  <Link
                    style={{ boxShadow: `none`, color: "#95C623" }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small
                  style={{
                    paddingRight: "4px"
                  }}
                >
                  {node.frontmatter.date}
                </small>
                <small>
                  {calculateReadingTime(node.wordCount.words)} minut czytania
                </small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          wordCount {
            words
          }
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "LL,", locale: "pl")
            title
            description
          }
        }
      }
    }
  }
`
