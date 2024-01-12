/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Rudesoul's Blog`,
    author: {
      name: `Prabesh gouli`,
      summary: `Self taught Frontend Developer`,
    },
    description: `I am prabesh, I tend to view myself as a generalist since I try not to focus on any given technology. My skills range from developer to designer. I have been exposed to a wide variety if technologies in my carreer and consider myself to be a very adaptable
Because of my breadth of experience I believe one day I would would make a 
WORLD BETTER PLACE.`,
    siteUrl: `https://prabeshgouli.com/`,
    social: {
      twitter: `prabeshgauli`,
      github: "rudesoul",
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Rudesoul's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prabesh gouli`,
        short_name: `Prabesh`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/profile-pic.png`,
      },
    },

    {
      /* Include plugin */
      resolve: "gatsby-omni-font-loader",

      /* Plugin options */
      options: {
        /* Font loading mode */
        mode: "async",

        /* Enable font loading listener to handle FOUT */
        enableListener: true,

        /* Preconnect URL-s. This example is for Google Fonts */
        preconnect: ["https://fonts.gstatic.com"],

        /* Web fonts. File link should point to font CSS file. */
        web: [
          {
            name: `Salsa`,
            file: `https://fonts.googleapis.com/css2?family=Salsa&display=swap`,
          },
          {
            name: `PT Sans`,
            file: `https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet`,
          },
          {
            name: `Style Script`,
            file: `https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet`,
          },
          {
            name: `Great Vibes`,
            file: `https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet`,
          },
          {
            name: `PT Serif`,
            file: `https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap" rel="stylesheet`,
          },
        ],
      },
    },
  ],
}
