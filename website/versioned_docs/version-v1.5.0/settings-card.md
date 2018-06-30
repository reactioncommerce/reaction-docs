---
id: version-v1.5.0-settings-card
title: Settings Card
original_id: settings-card
---
    
Settings cards pull together the `Card`, `CardHeader`, `CardBody` and `Switch` components to give you a sensible default for  Admin settings card in the Dashboard.

## Import

```javascript
import { SettingsCard } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { SettingsCard } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component {
  render() {
    return (
      <SettingsCard
        enabled={this.props.someSettings}
        expandable={true}
        expanded={this.props.preferences[provider.name]}
        i18nKeyTitle="i18nSettings.localization"
        icon={provider.icon}
        name="localization"
        onExpand={this.props.onSettingExpand}
        onSwitchChange={this.props.onSettingEnableChange}
        packageName={PACKAGE_NAME}
        saveOpenStateToPreferences={true}
        showSwitch={false}
        title="Shop Localization"
      >
        {"My Settings Card Contents"}
      </SettingsCard>
    )
  }
};

export default MyReactComponent;
```

| Property                   | Type     | Description                                                                           |
| -------------------------- | -------- | ------------------------------------------------------------------------------------- |
| enabled                    | Boolean  | Whether the switch should be checked or unchecked                                     |
| expandable                 | Boolean  | Sets whether to allow for expanding                                                   |
| expanded                   | Boolean  | Gets wether the card should be expanded. Do not use with `saveOpenStateToPreferences` |
| i18nKeyTitle               | String   | Key for i18n translation                                                              |
| icon                       | String   | Font Awesome icon name. e.g. `"fa fa-star"`                                           |
| name                       | String   | name of card for callback convenience                                                 |
| onExpand                   | Function | Callback when card expand state changes<br>(event, card, name, isExpanded) => {}      |
| onSwitchChange             | Function | Callback when switch changes<br>(event, isChecked, name, componentInstance) => {}     |
| packageName                | String   | name of package. used to save settings for this panel to per user                     |
| saveOpenStateToPreferences | Boolean  | Save open / close state for user. Use with packageName                                |
| showSwitch                 | Boolean  | Default `true`. Shows with switch toggle in the card header                           |
| title                      | String   | Title for card header                                                                 |
