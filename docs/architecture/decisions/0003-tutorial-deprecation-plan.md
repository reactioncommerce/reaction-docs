# 3. Tutorial Deprecation Plan

Date: 2018-10-16

## Status

2018-10-16 proposed

## Context

As of the October 2018 preview release of Reaction 2.0, many of the tutorials and guides no longer are the recommended method for: installing and running Reaction, customizing the user interface of the storefront of Reaction, customizing the schema for GraphQL and more.

Readers need an easy way to find and distinguish between pre-2.0 and post-2.0 content. We want to reduce the number of broken links, and make sure people know that there is a more updated version of whatever document they are reading.

## Decision

## Use version 1.16 editions for pre-2.0-specific content

- All pre-2.0-specific guides, for installing and customizing, will continue to live at version 1.6: https://docs.reactioncommerce.com/docs/1.16.0/intro
    - Installation:
        - https://docs.reactioncommerce.com/docs/1.16.0/installation-osx
        - https://docs.reactioncommerce.com/docs/1.16.0/installation-windows
        - https://docs.reactioncommerce.com/docs/1.16.0/installation-linux
    - Tutorials:
        - https://docs.reactioncommerce.com/docs/1.16.0/creating-a-theme
        - https://docs.reactioncommerce.com/docs/1.16.0/how-to-create-a-custom-homepage
        - https://docs.reactioncommerce.com/docs/1.16.0/extending-product-schema-location-map
        - Swag Shop: 
            - https://docs.reactioncommerce.com/docs/1.16.0/swag-shop-tutorial
            - https://docs.reactioncommerce.com/docs/1.16.0/swag-shop-collecting-requirements
            - https://docs.reactioncommerce.com/docs/1.16.0/swag-shop-initialization
            - https://docs.reactioncommerce.com/docs/1.16.0/swag-shop-landing-page
            - https://docs.reactioncommerce.com/docs/1.16.0/swag-shop-pdp
    - These are the links that should be used to link readers back to these versions.

## Installation instructions

- Use the Reaction Platform installation instructions across all READMEs: https://docs.reactioncommerce.com/docs/installation-reaction-platform
    - Reaction
    - Starter Kit
    - With the exception of the Platform itself, which will need more in-depth instructions for those who also want to develop on the Platform.

## Deprecating a document and associated content

- Remove document's ID from the current `sidebars.json`
- In all previous versions of that document, add this note to the above links:
```> Note: This tutorial has been deprecated as the release of Reaction 2.0. The latest tutorial can be found at <insert link here>```
- If there are GitHub repositories associated with this document, like the Swag Shop's sample repo, that repository should be:
    - Archived
    - Have a similar deprecation note at the top of the README

## Consequences

- In lieu of removing deprecated documents, we'll be increasing the total number of documents and links out there in the world.