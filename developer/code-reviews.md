# Code Review

Code contributions are reviewed by the Reaction core and community contributors.
All merge requests are reviewed and approved by at least one core contributor before merge.

Here are is a brief checklist of common items reviewed in every merge.

-   Code style guide adhered to and **linted** (`eslint`, 0 errors, no ignores)
-   i18n keys on all text
-   i18n values added to appropriate `en.json`
-   Translations are updated (LingoHub)
-   Naming conventions
-   does not introduce new Atmosphere or Meteor dependencies
-   jsDoc (API documentation)

    -   every file should have a summary
    -   every method should have a summary
    -   links to source documentation where appropriate

-   sufficient inline commenting
    -   explains functionality to someone NOT reading any other docs
    -   enough detail so the detailed docs can expand upon comments
