---
id: version-3.0.0-recommended-tools
title: Recommended Tools
original_id: recommended-tools
---

If you are interested in being able to quickly debug and develop Reaction, consider installing these useful tools to help you.

## General

- You should use [nvm](https://github.com/creationix/nvm) to install and manage NodeJS.
- [Kadira](https://github.com/kadira-open/kadira-server) can help you optimize performance of a Meteor app.

## Browser Extensions

### Chrome

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)
- [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)
- [Altair GraphQL Client](https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja)
- [Meteor DevTools](https://chrome.google.com/webstore/detail/meteor-devtools/ippapidnnboiophakmmhkdlchoccbgje)
- [z-context](https://chrome.google.com/webstore/detail/z-context/jigamimbjojkdgnlldajknogfgncplbh)

### Firefox

- [Altair GraphQL Client](https://addons.mozilla.org/en-US/firefox/addon/altair-graphql-client/)
- [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

## Code Editor Extensions

### [Visual Studio Code](https://code.visualstudio.com/)

- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
- [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [GraphQL](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)
- [JavaScript (ES6) Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
- [Jest Snippets Standard Style](https://marketplace.visualstudio.com/items?itemName=shtian.jest-snippets-standard)
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettify Selected JSON](https://marketplace.visualstudio.com/items?itemName=vthiery.prettify-selected-json)
- [Promise Snippets](https://marketplace.visualstudio.com/items?itemName=progre.promise-snippets)
- [ReactJS Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
- [Remark](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-remark)
- [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [Commitizen Support](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen)
- [styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [Parinfer](https://marketplace.visualstudio.com/items?itemName=shaunlebron.vscode-parinfer)
- [cljfmt](https://marketplace.visualstudio.com/items?itemName=pedrorgirardi.vscode-cljfmt)

### Emacs

 - [js2-mode](https://melpa.org/#/js2-mode)
 - [rjsx-mode](https://melpa.org/#/rjsx-mode)
 - [prettier-js](https://melpa.org/#/prettier-js)
 - [flycheck](https://melpa.org/#/flycheck)
 - [json-mode](https://melpa.org/#/json-mode)
 - [graphql-mode](https://melpa.org/#/graphql-mode)
 - [markdown-mode](https://melpa.org/#/markdown-mode)
 - [dockerfile-mode](https://melpa.org/#/dockerfile-mode)
 - [yaml-mode](https://melpa.org/#/yaml-mode)
 - [editorconfig](https://melpa.org/#/editorconfig)

### Vim

- [ale](https://github.com/w0rp/ale)
- [vim-instant-markdown](https://github.com/suan/vim-instant-markdown)
- [vim-javascript](https://github.com/pangloss/vim-javascript)

## MongoDB IDEs

- [Studio 3T or Robo 3T](https://robomongo.org/)

## Standalone GraphQL Clients

- [GraphQL Playground](https://github.com/prismagraphql/graphql-playground)
- [Altair GraphQL Client](https://altair.sirmuel.design/)
- [GraphiQL Standalone App](https://github.com/skevy/graphiql-app)

## Kafka Helpers

- [Conduktor](https://www.conduktor.io/download)
- [Kafdrop](https://github.com/obsidiandynamics/kafdrop)


  ```shell
  # kafdrop local development sample command
  docker run -d --rm -p 9000:9000 \
      -e KAFKA_BROKERCONNECT=kafka:9092 \
      -e JVM_OPTS="-Xms32M -Xmx64M" \
      -e SERVER_SERVLET_CONTEXTPATH="/" \
      --network streams.reaction.localhost \
      obsidiandynamics/kafdrop
  ```
