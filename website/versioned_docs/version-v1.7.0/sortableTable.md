---
id: version-v1.7.0-sortableTable
title: Sortable Table
original_id: sortableTable
---

The SortableTable component gives you a sortable, filterable, extendable data table.

SortableTable is built with [ReactTable](https://react-table.js.org/#/story/readm). See their docs if you'd like to extend it further.

## Import

SortableTable is available as via `registerComponent`. See the [Reaction Components API Docs](https://docs.reactioncommerce.com/reaction-docs/trunk/components-api) for more info.

```javascript
import { Components } from "@reactioncommerce/reaction-components";
```

## Example

```javascript
import React, { Component } from "react";
import { Components } from "@reactioncommerce/reaction-components";

class MyComponent extends Component {
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
      <div>
        <Components.SortableTable
          columnMetadata={columnMetadata}
          data={arrayOfData}
          filterType={"table"}
          noDataMessage={noDataMessage}
        />
      </div>
    );
  }
}
```

## Props
<!--lint disable-->
| Property             | Type     | Description                                                                  | Notes                                                                                 |
| -------------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| collection           | Object   | collection to get data from                                                  | Use in conjunction with publication, or use data in place of collection + publication |
| columnMetadata       | Array    | provides filtered columns with i18n headers                                  |                                                                                       |
| data                 | Array    | provides array of objects to be used in place of publication data (optional) | Use in place of collection + publication                                              |
| defaultPageSize      | Number   | how many results per page                                                    |                                                                                       |
| filterType           | String   | filter by table, column, or both                                             |                                                                                       |
| filteredFields       | Array    | filteredFields provides filtered columns, use columnMetadata instead         |                                                                                       |
| isFilterable         | Bool     | show / hide column filter                                                    |                                                                                       |
| isResizeable         | Bool     | allow resizing of table columns                                              |                                                                                       |
| isSortable           | Bool     | allow column sorting                                                         |                                                                                       |
| matchingResultsCount | String   | provides Count publication to get count from                                 |                                                                                       |
| minRows              | Number   | minimum amount of rows to display in table                                   |                                                                                       |
| noDataMessage        | String   | text to display when no data is available                                    |                                                                                       |
| onRowClick           | Function | provides function / action when clicking on row                              |                                                                                       |
| publication          | String   | provides publication to get Meteor data from                                 | Use in conjunction with collection, or use data in place of collection + publication  |
| query                | Object   | provides query for publication filtering                                     |                                                                                       |
| selectedRows         | Array    | provides selected rows in the table                                          |                                                                                       |
| transform            | Function | transform of collection for grid results                                     |                                                                                       |
<!--lint enable-->
