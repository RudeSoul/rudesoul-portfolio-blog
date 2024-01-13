# DEMO

[Rudesoul's Portfolio](prabeshgouli.com)

# Building My Portfolio and Blog with Gatsby: A Developer's Journey

Greetings fellow developers! In this blog post, I'm excited to take you on a journey behind the scenes of creating my portfolio and blog site using the fantastic Gatsby framework. If you're curious about the tools, techniques, and code that went into making this site, you're in the right place.

## Why Gatsby?

Before we dive into the technical details, let me briefly share why I chose Gatsby for this project. Gatsby's blend of React, GraphQL, and the JAMstack architecture appealed to me for its ability to deliver fast and efficient static websites. With a thriving ecosystem and a vibrant community, Gatsby was the perfect choice for showcasing my work.

## Setting Up the Project

Let's kick things off with setting up the Gatsby project. If you haven't already, install Gatsby globally and initialize a new site:

```bash
npm install -g gatsby-cli
gatsby new my-portfolio-blog
cd my-portfolio-blog
```

Choosing the right starter is crucial. In my case, I found a starter that resonated with my vision. You can explore various starters to find one that suits your style and requirements.

## Crafting the Layout

The layout is the foundation of any website, and customizing it is where the fun begins. In my `layout.js` file, I defined the structure of my pages, including the navigation bar and footer. Here's a snippet to give you a glimpse:

```jsx
// layout.js

import * as React from "react"
import { Link } from "gatsby"
import "../components/components.css"

const Layout = ({ location, title, children }) => {
  // ... (Your layout.js code)
}
export default Layout
```

## Designing the Portfolio

### Adding Content Sections

To keep things organized, I created separate pages for different sections like About Me, Projects, and Contact. My `index.js` file, serving as the homepage, displays a list of blog posts and introduces visitors to my world:

```jsx
// index.js

import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./blog.css"

const BlogIndex = ({ data, location }) => {
  // ... (Your index.js code)
}
export default BlogIndex
```

## Integrating the Blog

### Setting Up the Blog

Blogging is a significant part of my site, and Gatsby makes it easy to integrate. I use Markdown files for writing blog posts, and GraphQL queries fetch the data dynamically. Here's a snippet from my `index.js` file:

```jsx
// index.js

import * as React from "react"
import { Link, graphql } from "gatsby"

// ... (Your index.js code)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        // ... (Your GraphQL query code)
      }
    }
  }
`
```

### Writing Blog Posts in Markdown

Markdown makes writing blog posts a breeze. I've organized my posts in the `content/blog` directory, each with frontmatter containing metadata. Here's an example post:

```markdown
---
title: "My Gatsby Journey"
date: "2024-01-11"
description: "Reflecting on the process of building my portfolio with Gatsby."
---

In this post, I want to share the ups and downs...
```

## Personalizing the Profile

Adding a personal touch to the site is crucial. My `profile.js` file includes a brief bio and social media links. Here's a snippet:

```jsx
// profile.js

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Img from "gatsby-image"

import "./profile.css"

const Profile = () => {
  const data = useStaticQuery(graphql`
    query {
      github: file(relativePath: { eq: "github.png" }) {
        // ... (Your GraphQL query code)
      }
      // ... (Additional GraphQL queries for other social icons)
    }
  `)

  // ... (Your profile.js code)
}

export default Profile
```

## SEO Optimization

Ensuring your site is search engine-friendly is crucial. My `seo.js` file handles metadata for better SEO performance:

```jsx
// seo.js

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  // ... (Your seo.js code)
}

export default Seo
```

## Deployment

The final step is deploying your masterpiece. I chose [Netlify](https://www.netlify.com/) for its simplicity. Connect your repository, configure your build settings, and watch your site go live with each push to your repository.

## Making It Yours: Forking the Repository

Now, the most exciting part – making this portfolio and blog site your own. Follow these steps:

1. **Fork the Repository:**

   - Visit my [GitHub repository](https://github.com/rudesoul/rudesoul-portfolio-blog).
   - Click the "Fork" button to create your copy of the repository.

2. **Clone Your Forked Repository:**

   - Clone the repository to your local machine:

   ```bash
   git clone https://github.com/YourUsername/rudesoul-portfolio-blog.git
   cd rudesoul-portfolio-blog
   ```

3. **Install Dependencies:**

   - Install project dependencies:

   ```bash
   npm install
   ```

4. **Customize Content:**

   - Update content in the Markdown files located in the `content` directory.
   - Personalize the site by modifying the layout, colors, and images.

5. **Preview Your Changes:**

   - Run the development server:

   ```bash
   gatsby develop
   ```

   Open your browser and navigate to `http://localhost:8000` to see the live preview.

6. **Deploy Your Forked Repository:**
   - Once satisfied with your changes, commit them to your repository and deploy to your hosting platform.

## Conclusion

And there you have it – a detailed walkthrough of creating my portfolio and blog site using Gatsby. Feel free to explore additional features, plugins, and themes to further enhance your site. May your coding adventures be as enjoyable as mine! If you have any questions or need assistance, don't hesitate to reach out. Happy coding!
