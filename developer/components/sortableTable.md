# SortableTable

## Import

```javascript
import { SortableTable } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { SortableTable } from "/imports/plugins/core/ui/client/components";


class MyReactComponent extends Component {
  render() {
    const filteredFields = ["data.to", "updated", "data.subject", "status"];
    const noDataMessage = i18next.t("admin.logs.noEmails");

    // helper adds a class to every grid row
    const customRowMetaData = {
      bodyCssClassName: () =>  {
        return "email-grid-row";
      }
    };

    // add i18n handling to headers
    const customColumnMetadata = [];
    filteredFields.forEach(function (field) {
      let colWidth = undefined;
      let colStyle = undefined;
      let colClassName = undefined;

      if (field === "status") {
        colWidth = 70;
        colStyle = { textAlign: "center" };
        colClassName = "email-log-status";
      }

      // https://react-table.js.org/#/story/cell-renderers-custom-components
      const columnMeta = {
        accessor: field,
        Header: i18next.t(`admin.logs.headers.${field}`),
        Cell: row => (
          <EmailTableColumn row={row} />
        ),
        className: colClassName,
        width: colWidth,
        style: colStyle
      };
      customColumnMetadata.push(columnMeta);
    });


    return (
      <SortableTable
        collection={MeteorCollection}
        columnMetadata={columnMetadata}
        matchingResultsCount="publication-count"
        publication="MeteorPublication"


        showFilter={true}
        rowMetadata={customRowMetaData}
        noDataMessage={noDataMessage}
      />
    );
  }
}

export default MyReactComponent;
```

## Props

Property             | Type                      | Description
-------------------- | ------------------------- | ---------------------------
collection           | Object                    | collection to get data from (Required)
columnMetadata       | Object                    | provides filtered columns with i18n headers, data accessor, and styles (Required)
defaultPageSize      | Number                    | how many results per page (Default: 10)
filterType           | Boolean                   | filter by table, column, both, or none (Default: table)
filteredFields       | Array                     | legacy to provide filtered columns to griddle, use columnMetadata instead (Possibly not needed?)
isFilterable         | Boolean                   | show / hide column filter (Default: false; however, this is deceiving, as we use `filterType` instead to enable / disable filters)
isResizeable         | Boolean                   | allow resizing of table columns (Default: true)
isSortable           | Boolean                   | allow column sorting (Default: true)
matchingResultsCount | String                    | provides Count publication to get count from (Possibly not needed?)
minRows              | Number                    | minimum amount of rows to display in table (Default: 0)
noDataMessage        | String                    | text to display when no data is available (Default: "No results found")
onRowClick           | Function                  | provides function / action when clicking on row
publication          | String                    | provides publication to get Meteor data from (Required)
query                | Object                    | provides query for publication filtering
transform            | Function                  | transform of collection for grid results

While these are the props we use in each table, there are more props available at All available props: https://github.com/tannerlinsley/react-table#props
