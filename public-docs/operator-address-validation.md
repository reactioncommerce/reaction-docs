---
id: operator-address-validation
title: Address Validation
---

Reaction has a pluggable address validation system. Core Reaction services will store any address as long as all of the necessary data seems to be present. It is the job of clients, such as the storefront checkout and address book forms, to further validate addresses before saving them. Validation typically consists of asking a third-party service whether it thinks the entered address exists and is formatted correctly, and then prompting the user to either correct any mistakes or proceed with the possibly invalid address.

Address validation or verification services are useful tools but are not perfect, so we recommend that you always allow users to submit any complete address, even if it can't be verified. Address validation services may not know about brand new addresses, for example.

Reaction includes only a test address validation service, which is for testing and demo purposes. You should create your own plugin that provides address validation or install an open source community plugin.

> If you will be collecting tax or dynamically calculating shipping rates, then it's important to install and enable an address validation service to improve the accuracy of these calculations.

![](/assets/operator-ui-address-validation.png "Address Validation Operator UI")

## Enable one or more address validation services
1. Click the <i class="rui font-icon fa fa-cog"></i> **Settings** menu from the side panel.
2. Click *Shop* from the list
3. Expand the "Address Validation" section.
4. Each address validation service may have settings in the panel and/or may require that certain environment variables be set. Before enabling a service, verify that you've properly configured it.
4. Click **Add address validation service**
5. The first address validation service that matches the country of the address being validated will be used. Be sure to create these entries in the correct order to achieve the fallback behavior you want.
6. Choose the validation service to enable.
7. Optionally choose one or more countries to validate addresses for. You may not see the full list of countries if the service does not support all countries. If you do not choose specific countries, then the service will be used for addresses in every country that the service supports.
8. Click **Add service**.
9. If necessary, add more services for different countries.
