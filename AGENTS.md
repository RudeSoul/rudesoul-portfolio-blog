# Developer & Agent Guidelines

## Autonoma Test Data
Autonoma is an automated end-to-end testing platform that seeds realistic test data into the application using the app's own creation pathways. For this Gatsby portfolio, test scenarios and content entities (such as MarkdownRemark articles, Frontmatter metadata, and SiteMetadata) are instantiated and torn down via the SDK endpoint at `/api/autonoma` ([src/api/autonoma.js](src/api/autonoma.js)).

Whenever you introduce new content models, data schemas, or alter existing content creation logic, update the corresponding factory in `src/api/autonoma.js` and the test recipe in `recipe.json` so test data generation remains in sync with the application.
