/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  description,
  title,
  pathname = "",
  article = false,
  datePublished,
  schemaType = "default",
  items = [],
  lastUpdated,
  keywords,
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
            }
            social {
              twitter
              github
              linkedin
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title || `Prabesh Gouli`
  const siteUrl = site.siteMetadata?.siteUrl || `https://prabeshgouli.com`
  const canonicalUrl = `${siteUrl}${pathname}`

  // Format page title
  let fullTitle = title
    ? `${title} | Prabesh Gouli`
    : defaultTitle

  if (title === defaultTitle || !title) {
    fullTitle = defaultTitle
  }

  // Schema.org Structured Data (JSON-LD) for SEO & GEO
  let jsonLd = null

  if (schemaType === "newsList") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        name: "Prabesh Gouli",
        url: siteUrl,
      },
      ...(lastUpdated ? { dateModified: lastUpdated } : {}),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "NewsArticle",
            headline: item.title,
            description: item.summary,
            url: item.sourceUrl || canonicalUrl,
            publisher: {
              "@type": "Organization",
              name: item.sourceName || "Tech Source",
            },
            author: {
              "@type": "Person",
              name: "Prabesh Gouli",
            },
            articleSection: item.category || "Technology",
          },
        })),
      },
    }
  } else if (schemaType === "person" || (!article && !pathname)) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Prabesh Gouli",
      alternateName: ["rudesoul", "RudeSoul"],
      url: siteUrl,
      jobTitle: "Software Engineer & Product Designer",
      description: metaDescription,
      sameAs: [
        `https://github.com/${site.siteMetadata?.social?.github || "rudesoul"}`,
        `https://www.linkedin.com/in/${site.siteMetadata?.social?.linkedin || "prabeshgouli"}/`,
        `https://twitter.com/${site.siteMetadata?.social?.twitter || "prabeshgauli"}`,
      ],
      knowsAbout: [
        "Software Engineering",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "NestJS",
        "React Native",
        "Artificial Intelligence",
        "Product Design",
        "UI/UX",
      ],
    }
  } else if (article) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description: metaDescription,
      url: canonicalUrl,
      author: {
        "@type": "Person",
        name: "Prabesh Gouli",
        url: siteUrl,
      },
      publisher: {
        "@type": "Person",
        name: "Prabesh Gouli",
      },
      ...(datePublished ? { datePublished } : {}),
      inLanguage: "en-US",
    }
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter ? `@${site.siteMetadata.social.twitter}` : ``}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      {children}
    </>
  )
}

export default Seo
