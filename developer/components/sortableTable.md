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
    const noDataMessage = i18next.t("admin.table.noDataMessage");

    // add i18n handling to headers, and push other info to columns meta
    const filteredFields = ["field1", "data.field2", "data.data2.subfield3", "field4"];
    const customColumnMetadata = [];
    filteredFields.forEach(function (field) {
      let colWidth = undefined;
      let colStyle = undefined;
      let colClassName = undefined;

      if (field === "data.data2.subfield3") {
        colWidth = 70;
        colStyle = { textAlign: "center" };
        colClassName = "subfield-special-class";
      }

      // https://react-table.js.org/#/story/cell-renderers-custom-components
      const columnMeta = {
        accessor: field,
        Header: i18next.t(`admin.logs.headers.${field}`),
        // Cell is an optional field, that is extendable with Components.
        // If not provided, it will default to provide the original field data
        Cell: row => (
          <ColumnCustomComponent row={row} />
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
        noDataMessage={noDataMessage}
        publication="MeteorPublication"
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

SortableTable is a wrapper around ReactTable. If you'd like to extend the table further, more props are available on the [ReactTable GitHub page]( https://github.com/tannerlinsley/react-table#props).
