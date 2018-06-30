---
id: version-v1.6.4-csvDownload
title: CSV Download
original_id: csvDownload
---
    
The CSVDownload component renders a button which can be clicked to download the data provided in a CSV format.

CSVDownload is built with [react-csv](https://github.com/abdennour/react-csv). See their docs if you'd like to extend it further.

## Import

```javascript
import { Components } from "@reactioncommerce/reaction-components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Components } from "@reactioncommerce/reaction-components";

class MyReactComponent extends Component
  return (
    <Components.CSVDownload
      className="btn btn-primary"
      data={dataToDownload}
      filename="name-of-file.csv"
      headers={customHeaders}
      i18nKeyLabel="csv.download.downloadReport"
      label="Download CSV report"
    />
  )
};

export default MyReactComponent;
```

## Props

| Property        | Type                      | Description                                               |
| --------------- | ------------------------- | --------------------------------------------------------- |
| className       | String                    | classNames to apply to element                            |
| data            | Array, Object             | Data to be downloaded in CSV format                       |
| filename        | String                    | Name of file to be saved to                               |
| headers         | Array, Object             | Custom headers for CSV columns                            |
| i18nKeyLabel    | String                    | i18nKey for label                                         |
| label           | String                    | Label / text to show inside element (button)              |
