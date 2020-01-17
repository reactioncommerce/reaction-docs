---
id: version-2.9.1-graphql-api
title: Reaction GraphQL API Docs
original_id: graphql-api
---

## Schema Types

* [Query](#query)
* [Mutation](#mutation)

<details>
  <summary><a href="#objects">Objects</a></summary>

  * [Account](#account)
  * [AccountConnection](#accountconnection)
  * [AccountEdge](#accountedge)
  * [AddAccountAddressBookEntryPayload](#addaccountaddressbookentrypayload)
  * [AddAccountEmailRecordPayload](#addaccountemailrecordpayload)
  * [AddAccountToGroupPayload](#addaccounttogrouppayload)
  * [AddCartItemsPayload](#addcartitemspayload)
  * [Address](#address)
  * [AddressConnection](#addressconnection)
  * [AddressEdge](#addressedge)
  * [Cart](#cart)
  * [CartItem](#cartitem)
  * [CartItemAttribute](#cartitemattribute)
  * [CartItemConnection](#cartitemconnection)
  * [CartItemEdge](#cartitemedge)
  * [CartSummary](#cartsummary)
  * [Catalog](#catalog)
  * [CatalogItemConnection](#catalogitemconnection)
  * [CatalogItemContent](#catalogitemcontent)
  * [CatalogItemEdge](#catalogitemedge)
  * [CatalogItemProduct](#catalogitemproduct)
  * [CatalogProduct](#catalogproduct)
  * [CatalogProductVariant](#catalogproductvariant)
  * [Checkout](#checkout)
  * [CreateCartPayload](#createcartpayload)
  * [CreateFlatRateFulfillmentMethodPayload](#createflatratefulfillmentmethodpayload)
  * [CreateGroupPayload](#creategrouppayload)
  * [Currency](#currency)
  * [CurrencyConnection](#currencyconnection)
  * [CurrencyEdge](#currencyedge)
  * [DeleteFlatRateFulfillmentMethodPayload](#deleteflatratefulfillmentmethodpayload)
  * [EmailRecord](#emailrecord)
  * [ExampleIOUPaymentData](#exampleioupaymentdata)
  * [ExamplePaymentMethodData](#examplepaymentmethoddata)
  * [FlatRateFulfillmentMethod](#flatratefulfillmentmethod)
  * [FulfillmentData](#fulfillmentdata)
  * [FulfillmentGroup](#fulfillmentgroup)
  * [FulfillmentMethod](#fulfillmentmethod)
  * [FulfillmentOption](#fulfillmentoption)
  * [Group](#group)
  * [GroupConnection](#groupconnection)
  * [GroupEdge](#groupedge)
  * [ImageInfo](#imageinfo)
  * [ImageSizes](#imagesizes)
  * [IncorrectPriceFailureDetails](#incorrectpricefailuredetails)
  * [InviteShopMemberPayload](#inviteshopmemberpayload)
  * [MarketplaceStripeCardPaymentData](#marketplacestripecardpaymentdata)
  * [Metafield](#metafield)
  * [MinOrderQuantityFailureDetails](#minorderquantityfailuredetails)
  * [Money](#money)
  * [Order](#order)
  * [OrderFulfillmentGroup](#orderfulfillmentgroup)
  * [OrderItem](#orderitem)
  * [OrderItemAttribute](#orderitemattribute)
  * [OrderItemConnection](#orderitemconnection)
  * [OrderItemEdge](#orderitemedge)
  * [OrderNote](#ordernote)
  * [OrderSummary](#ordersummary)
  * [PageInfo](#pageinfo)
  * [Payment](#payment)
  * [PaymentMethod](#paymentmethod)
  * [PlaceOrderPayload](#placeorderpayload)
  * [PriceRange](#pricerange)
  * [ProductConfiguration](#productconfiguration)
  * [ProductPricingInfo](#productpricinginfo)
  * [Rate](#rate)
  * [ReconcileCartsPayload](#reconcilecartspayload)
  * [RemoveAccountAddressBookEntryPayload](#removeaccountaddressbookentrypayload)
  * [RemoveAccountEmailRecordPayload](#removeaccountemailrecordpayload)
  * [RemoveAccountFromGroupPayload](#removeaccountfromgrouppayload)
  * [RemoveCartItemsPayload](#removecartitemspayload)
  * [RemoveGroupPayload](#removegrouppayload)
  * [Role](#role)
  * [RoleConnection](#roleconnection)
  * [RoleEdge](#roleedge)
  * [SelectFulfillmentOptionForGroupPayload](#selectfulfillmentoptionforgrouppayload)
  * [SetAccountProfileCurrencyPayload](#setaccountprofilecurrencypayload)
  * [SetEmailOnAnonymousCartPayload](#setemailonanonymouscartpayload)
  * [SetShippingAddressOnCartPayload](#setshippingaddressoncartpayload)
  * [ShippingOrderFulfillmentGroupData](#shippingorderfulfillmentgroupdata)
  * [ShippingParcel](#shippingparcel)
  * [Shop](#shop)
  * [SocialMetadata](#socialmetadata)
  * [StripeCardPaymentData](#stripecardpaymentdata)
  * [Tag](#tag)
  * [TagConnection](#tagconnection)
  * [TagEdge](#tagedge)
  * [TaxSettings](#taxsettings)
  * [UpdateAccountAddressBookEntryPayload](#updateaccountaddressbookentrypayload)
  * [UpdateCartItemsQuantityPayload](#updatecartitemsquantitypayload)
  * [UpdateFlatRateFulfillmentMethodPayload](#updateflatratefulfillmentmethodpayload)
  * [UpdateFulfillmentOptionsForGroupPayload](#updatefulfillmentoptionsforgrouppayload)
  * [UpdateGroupPayload](#updategrouppayload)
</details>
<details>
  <summary><a href="#enums">Enums</a></summary>

  * [AccountSortByField](#accountsortbyfield)
  * [AddressType](#addresstype)
  * [CartItemsSortByField](#cartitemssortbyfield)
  * [CartReconciliationMode](#cartreconciliationmode)
  * [CatalogItemSortByField](#catalogitemsortbyfield)
  * [DistanceUnit](#distanceunit)
  * [FulfillmentType](#fulfillmenttype)
  * [GroupSortByField](#groupsortbyfield)
  * [MassUnit](#massunit)
  * [OrderFulfillmentGroupItemsSortByField](#orderfulfillmentgroupitemssortbyfield)
  * [PaymentMethodName](#paymentmethodname)
  * [RoleSortByField](#rolesortbyfield)
  * [SocialNetwork](#socialnetwork)
  * [SortOrder](#sortorder)
  * [TagSortByField](#tagsortbyfield)
</details>
<details>
  <summary><a href="#scalars">Scalars</a></summary>

  * [Boolean](#boolean)
  * [ConnectionCursor](#connectioncursor)
  * [ConnectionLimitInt](#connectionlimitint)
  * [Date](#date)
  * [DateTime](#datetime)
  * [Email](#email)
  * [Float](#float)
  * [ID](#id)
  * [Int](#int)
  * [JSONObject](#jsonobject)
  * [String](#string)
  * [Time](#time)
</details>
<details>
  <summary><a href="#interfaces">Interfaces</a></summary>

  * [CatalogItem](#catalogitem)
  * [CatalogProductOrVariant](#catalogproductorvariant)
  * [Deletable](#deletable)
  * [Node](#node)
  * [NodeConnection](#nodeconnection)
  * [NodeEdge](#nodeedge)
</details>

## Query 
Queries return all requested data, without any side effects

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>ping</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a></td>
<td>

Returns a shop by ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shopBySlug</strong></td>
<td valign="top"><a href="#shop">Shop</a></td>
<td>

Returns a shop by slug

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">slug</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>primaryShopId</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td>

Returns the ID of the primary shop for the domain

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tag</strong></td>
<td valign="top"><a href="#tag">Tag</a></td>
<td>

Returns a tag from a provided tag ID or slug

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">slugOrId</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tags</strong></td>
<td valign="top"><a href="#tagconnection">TagConnection</a></td>
<td>

Returns a paged list of tags for a shop. You must include a shopId when querying.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

Only tags associated with this shop will be returned

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">isTopLevel</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

If set, the query will return only top-level tags or only non-top-level tags. By default, both types of tags are returned.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shouldIncludeDeleted</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Set to true if you want soft deleted tags to be included in the response

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#tagsortbyfield">TagSortByField</a></td>
<td>

By default, tags are sorted by position. Set this to sort by one of the other allowed fields

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>viewer</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

Returns the account for the authenticated user

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

Returns the account with the provided ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>administrators</strong></td>
<td valign="top"><a href="#accountconnection">AccountConnection</a></td>
<td>

Returns a list of administrators for the shop with ID `shopId`, as a Relay-compatible connection.
"Administrators" means all linked accounts that have the "admin" role for this shop.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#accountsortbyfield">AccountSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#group">Group</a></td>
<td>

Returns a single group by ID.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>groups</strong></td>
<td valign="top"><a href="#groupconnection">GroupConnection</a></td>
<td>

Returns a list of groups for the shop with ID `shopId`, as a Relay-compatible connection.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#groupsortbyfield">GroupSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>roles</strong></td>
<td valign="top"><a href="#roleconnection">RoleConnection</a></td>
<td>

Returns a paged list of all roles associated with a shop

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#rolesortbyfield">RoleSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anonymousCartByCartId</strong></td>
<td valign="top"><a href="#cart">Cart</a></td>
<td>

Finds a cart by the cart ID and anonymous cart token.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">cartId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">token</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>accountCartByAccountId</strong></td>
<td valign="top"><a href="#cart">Cart</a></td>
<td>

Find a cart for a given account ID.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">accountId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>catalogItems</strong></td>
<td valign="top"><a href="#catalogitemconnection">CatalogItemConnection</a></td>
<td>

Gets items from a shop catalog

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopIds</td>
<td valign="top">[<a href="#id">ID</a>]!</td>
<td>

Provide a list of shop IDs from which you want to get catalog items

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">tagIds</td>
<td valign="top">[<a href="#id">ID</a>]</td>
<td>

Optionally provide a list of tag IDs to further filter the item list

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortByPriceCurrencyCode</td>
<td valign="top"><a href="#string">String</a></td>
<td>

Provide a Currency code if sortBy is minPrice

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#catalogitemsortbyfield">CatalogItemSortByField</a></td>
<td>

By default, items are sorted by when they were created, newest first. Set this to sort by one of the other allowed fields

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>catalogItemProduct</strong></td>
<td valign="top"><a href="#catalogitemproduct">CatalogItemProduct</a></td>
<td>

Gets product from catalog

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">slugOrId</td>
<td valign="top"><a href="#string">String</a></td>
<td>

Provide either a product ID or slug

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orderById</strong></td>
<td valign="top"><a href="#order">Order</a></td>
<td>

Get an order by its ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">token</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ordersByAccountId</strong></td>
<td valign="top">[<a href="#order">Order</a>]!</td>
<td>

Get all orders for a single account, optionally limited to certain shop IDs

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">accountId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopIds</td>
<td valign="top">[<a href="#id">ID</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availablePaymentMethods</strong></td>
<td valign="top">[<a href="#paymentmethod">PaymentMethod</a>]!</td>
<td>

Get a list of all payment methods available during a checkout. This may filter by auth,
active/inactive, IP/region, shop, etc. To get the full list, use the `paymentMethods`
query with proper authorization.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>paymentMethods</strong></td>
<td valign="top">[<a href="#paymentmethod">PaymentMethod</a>]!</td>
<td>

Get a full list of all payment methods

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shopId</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation 
Mutations have side effects, such as mutating data or triggering a task

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>echo</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">str</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>inviteShopMember</strong></td>
<td valign="top"><a href="#inviteshopmemberpayload">InviteShopMemberPayload</a></td>
<td>

Given a person's email address and name, invite them to create an account for a certain shop,
and put them in the provided permission group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#inviteshopmemberinput">InviteShopMemberInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAccountAddressBookEntry</strong></td>
<td valign="top"><a href="#addaccountaddressbookentrypayload">AddAccountAddressBookEntryPayload</a></td>
<td>

Add a new address to the `addressBook` field for an account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#addaccountaddressbookentryinput">AddAccountAddressBookEntryInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAccountEmailRecord</strong></td>
<td valign="top"><a href="#addaccountemailrecordpayload">AddAccountEmailRecordPayload</a></td>
<td>

Add an email address to an account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#addaccountemailrecordinput">AddAccountEmailRecordInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeAccountAddressBookEntry</strong></td>
<td valign="top"><a href="#removeaccountaddressbookentrypayload">RemoveAccountAddressBookEntryPayload</a></td>
<td>

Remove an address from the `addressBook` field for an account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#removeaccountaddressbookentryinput">RemoveAccountAddressBookEntryInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeAccountEmailRecord</strong></td>
<td valign="top"><a href="#removeaccountemailrecordpayload">RemoveAccountEmailRecordPayload</a></td>
<td>

Remove an email address from an account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#removeaccountemailrecordinput">RemoveAccountEmailRecordInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>setAccountProfileCurrency</strong></td>
<td valign="top"><a href="#setaccountprofilecurrencypayload">SetAccountProfileCurrencyPayload</a></td>
<td>

Set the preferred currency for an account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#setaccountprofilecurrencyinput">SetAccountProfileCurrencyInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateAccountAddressBookEntry</strong></td>
<td valign="top"><a href="#updateaccountaddressbookentrypayload">UpdateAccountAddressBookEntryPayload</a></td>
<td>

Remove an address that exists in the `addressBook` field for an account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updateaccountaddressbookentryinput">UpdateAccountAddressBookEntryInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAccountToGroup</strong></td>
<td valign="top"><a href="#addaccounttogrouppayload">AddAccountToGroupPayload</a></td>
<td>

Add an account to a group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#addaccounttogroupinput">AddAccountToGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createGroup</strong></td>
<td valign="top"><a href="#creategrouppayload">CreateGroupPayload</a></td>
<td>

Create a new permission group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#creategroupinput">CreateGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateGroup</strong></td>
<td valign="top"><a href="#updategrouppayload">UpdateGroupPayload</a></td>
<td>

Update an existing permission group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updategroupinput">UpdateGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeAccountFromGroup</strong></td>
<td valign="top"><a href="#removeaccountfromgrouppayload">RemoveAccountFromGroupPayload</a></td>
<td>

Remove an account from a group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#removeaccountfromgroupinput">RemoveAccountFromGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeGroup</strong></td>
<td valign="top"><a href="#removegrouppayload">RemoveGroupPayload</a></td>
<td>

Remove an existing permission group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#removegroupinput">RemoveGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addCartItems</strong></td>
<td valign="top"><a href="#addcartitemspayload">AddCartItemsPayload</a>!</td>
<td>

Add item(s) to a cart

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#addcartitemsinput">AddCartItemsInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createCart</strong></td>
<td valign="top"><a href="#createcartpayload">CreateCartPayload</a>!</td>
<td>

Create a new cart

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createcartinput">CreateCartInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>reconcileCarts</strong></td>
<td valign="top"><a href="#reconcilecartspayload">ReconcileCartsPayload</a>!</td>
<td>

Reconcile an anonymous cart with the current account cart for the same shop

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#reconcilecartsinput">ReconcileCartsInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeCartItems</strong></td>
<td valign="top"><a href="#removecartitemspayload">RemoveCartItemsPayload</a>!</td>
<td>

Remove item(s) from a cart

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#removecartitemsinput">RemoveCartItemsInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>setEmailOnAnonymousCart</strong></td>
<td valign="top"><a href="#setemailonanonymouscartpayload">SetEmailOnAnonymousCartPayload</a>!</td>
<td>

Set the email address for an anonymous cart

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#setemailonanonymouscartinput">SetEmailOnAnonymousCartInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateCartItemsQuantity</strong></td>
<td valign="top"><a href="#updatecartitemsquantitypayload">UpdateCartItemsQuantityPayload</a>!</td>
<td>

Update cart item(s) quantity. Use absolute quantity. If updating to 0, the item will be removed.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updatecartitemsquantityinput">UpdateCartItemsQuantityInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>selectFulfillmentOptionForGroup</strong></td>
<td valign="top"><a href="#selectfulfillmentoptionforgrouppayload">SelectFulfillmentOptionForGroupPayload</a>!</td>
<td>

Select a fulfillment option from the `availableFulfillmentOptions` list for a fulfillment group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#selectfulfillmentoptionforgroupinput">SelectFulfillmentOptionForGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>setShippingAddressOnCart</strong></td>
<td valign="top"><a href="#setshippingaddressoncartpayload">SetShippingAddressOnCartPayload</a>!</td>
<td>

Set the shipping address for all fulfillment groups

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#setshippingaddressoncartinput">SetShippingAddressOnCartInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateFulfillmentOptionsForGroup</strong></td>
<td valign="top"><a href="#updatefulfillmentoptionsforgrouppayload">UpdateFulfillmentOptionsForGroupPayload</a>!</td>
<td>

Clients should call this as necessary during checkout to update the `availableFulfillmentOptions`
property for all fulfillment groups of the cart with fresh price quotes. These need to be
recalculated every time the items in that group change. When the order is placed, the chosen
option for each group will have its prices recalculated one last time. If the prices do not match,
order creation will fail.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updatefulfillmentoptionsforgroupinput">UpdateFulfillmentOptionsForGroupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>publishProductsToCatalog</strong></td>
<td valign="top">[<a href="#catalogitemproduct">CatalogItemProduct</a>]</td>
<td>

Publish products to the Catalog collection by product ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">productIds</td>
<td valign="top">[<a href="#id">ID</a>]!</td>
<td>

Array of Product ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>placeMarketplaceOrderWithStripeCardPayment</strong></td>
<td valign="top"><a href="#placeorderpayload">PlaceOrderPayload</a>!</td>
<td>

Use this mutation to place an order with credit card payment, processed through a Stripe account,
in a Marketplace installation. This is a variation of placeOrderWithStripeCardPayment that
checks for marketplace configuration and assigns Stripe Connect account IDs to each shop payment.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#placemarketplaceorderwithstripecardpaymentinput">PlaceMarketplaceOrderWithStripeCardPaymentInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>placeOrderWithExampleIOUPayment</strong></td>
<td valign="top"><a href="#placeorderpayload">PlaceOrderPayload</a>!</td>
<td>

Use this mutation to place an order with example IOU payment.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#placeorderwithexampleioupaymentinput">PlaceOrderWithExampleIOUPaymentInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>placeOrderWithStripeCardPayment</strong></td>
<td valign="top"><a href="#placeorderpayload">PlaceOrderPayload</a>!</td>
<td>

Use this mutation to place an order with credit card payment, processed through a Stripe account.
The order will be placed only if authorization is successful.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#placeorderwithstripecardpaymentinput">PlaceOrderWithStripeCardPaymentInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createFlatRateFulfillmentMethod</strong></td>
<td valign="top"><a href="#createflatratefulfillmentmethodpayload">CreateFlatRateFulfillmentMethodPayload</a>!</td>
<td>

Create a flat rate fulfillment method

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createflatratefulfillmentmethodinput">CreateFlatRateFulfillmentMethodInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateFlatRateFulfillmentMethod</strong></td>
<td valign="top"><a href="#updateflatratefulfillmentmethodpayload">UpdateFlatRateFulfillmentMethodPayload</a>!</td>
<td>

Update a flat rate fulfillment method

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updateflatratefulfillmentmethodinput">UpdateFlatRateFulfillmentMethodInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteFlatRateFulfillmentMethod</strong></td>
<td valign="top"><a href="#deleteflatratefulfillmentmethodpayload">DeleteFlatRateFulfillmentMethodPayload</a>!</td>
<td>

Delete a flat rate fulfillment method

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#deleteflatratefulfillmentmethodinput">DeleteFlatRateFulfillmentMethodInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Account

Represents a single user account

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The account ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addressBook</strong></td>
<td valign="top"><a href="#addressconnection">AddressConnection</a></td>
<td>

A list of physical or mailing addresses associated with this account

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this account was created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currency</strong></td>
<td valign="top"><a href="#currency">Currency</a></td>
<td>

The preferred currency used by this account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>emailRecords</strong></td>
<td valign="top">[<a href="#emailrecord">EmailRecord</a>]</td>
<td>

A list of email records associated with this account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>groups</strong></td>
<td valign="top"><a href="#groupconnection">GroupConnection</a></td>
<td>

A paged list of the permission groups in which this account is listed

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#groupsortbyfield">GroupSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The full name of the person this account represents, if known

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>note</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Some note about this account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preferences</strong></td>
<td valign="top"><a href="#jsonobject">JSONObject</a></td>
<td>

An object storing plugin-specific preferences for this account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>primaryEmailAddress</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td>

The primary email address for the account. This matches the address in `emailRecords` where `provides` is "default".

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a></td>
<td>

The shop to which this account belongs, if it is associated with a specific shop

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxSettings</strong></td>
<td valign="top"><a href="#taxsettings">TaxSettings</a></td>
<td>

Per-account tax exemption settings used by the Avalara plugin

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this account was last updated

</td>
</tr>
</tbody>
</table>

### AccountConnection

Wraps a list of `Accounts`, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#accountedge">AccountEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#account">Account</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### AccountEdge

A connection edge in which each node is an `Account` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td></td>
</tr>
</tbody>
</table>

### AddAccountAddressBookEntryPayload

The response from the `addAccountAddressBookEntry` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#address">Address</a></td>
<td>

The added address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addressEdge</strong></td>
<td valign="top"><a href="#addressedge">AddressEdge</a></td>
<td>

The added address edge

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### AddAccountEmailRecordPayload

The response from the `addAccountEmailRecord` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>emailRecord</strong></td>
<td valign="top"><a href="#emailrecord">EmailRecord</a></td>
<td>

The added email record

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### AddAccountToGroupPayload

The response from the `addAccountToGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#group">Group</a></td>
<td>

The updated group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### AddCartItemsPayload

The payload returned from the `addCartItems` mutation call

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a></td>
<td>

The modified cart. You should check `incorrectPriceFailures` and `minOrderQuantityFailures` for
information necessary to display errors to the shopper. Some items may not have been added.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>incorrectPriceFailures</strong></td>
<td valign="top">[<a href="#incorrectpricefailuredetails">IncorrectPriceFailureDetails</a>]!</td>
<td>

Clients should check to see if any items failed to be added due to the price not matching the current price.
In general, a user interface should display the correct current prices to the shopper, confirm that they still
want to add the items, and then call `createCart` or `addCartItems` to do so.

Note that this field will always exist but may be an empty array if there were no failures of this type.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minOrderQuantityFailures</strong></td>
<td valign="top">[<a href="#minorderquantityfailuredetails">MinOrderQuantityFailureDetails</a>]!</td>
<td>

Clients should check to see if any items failed to be added due to quantity being below the minimum order
quantity defined for the product variant. In general, a user interface should display the minimum order
quantity to the shopper and allow them to add that quantity or greater.

Note that this field will always exist but may be an empty array if there were no failures of this type.

</td>
</tr>
</tbody>
</table>

### Address

Represents a physical or mailing address somewhere on Earth

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The address ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>address1</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The street address / first line

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>address2</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Optional second line

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>city</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

City

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>company</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Optional company name, if it's a business address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>country</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Country

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>failedValidation</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Whether this address failed external address validation the last time it was checked

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fullName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The full name of a person at this address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isBillingDefault</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Is this the default address for billing purposes?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isCommercial</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is this a commercial address?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isShippingDefault</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Is this the default address to use when selecting a shipping address at checkout?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>phone</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A phone number for someone at this address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>postal</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Postal code

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>region</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Region. For example, a U.S. state

</td>
</tr>
</tbody>
</table>

### AddressConnection

Wraps a list of `Addresses`, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#addressedge">AddressEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#address">Address</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### AddressEdge

A connection edge in which each node is an `Address` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#address">Address</a></td>
<td></td>
</tr>
</tbody>
</table>

### Cart

The cart holds selected items until order is placed.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The Cart ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

The account that owns the cart. Some carts are created for anonymous users. Anonymous carts have a null account.
Every account has exactly one cart per shop.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>checkout</strong></td>
<td valign="top"><a href="#checkout">Checkout</a></td>
<td>

Holds all information collected for a cart during checkout

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which the cart was created, which is when the first item was added to it.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

An email address that has been associated with the cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>items</strong></td>
<td valign="top"><a href="#cartitemconnection">CartItemConnection</a></td>
<td>

The items that have been added to the cart. A cart is not created until the first item is added. Items can be removed from a cart, and a cart is not deleted if all items are removed from it. Because all items may have been removed, this may be an empty array.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#cartitemssortbyfield">CartItemsSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop that owns the cart.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalItemQuantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Total quantity of all items in the cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this cart was last updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>expiresAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The date and time at which the cart will expire. Account carts usually do not expire, so they will have a null value here.

</td>
</tr>
</tbody>
</table>

### CartItem

A single item in a cart. The item contains information about an intended purchase.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The cart item ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

"
The date and time at which this item was first added to the associated cart.
If an item is added, removed, and then added again, this will reflect the most recent addition.
However, if an item is added twice, the quantity will increase but this date will remain
the initial added date.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>attributes</strong></td>
<td valign="top">[<a href="#cartitemattribute">CartItemAttribute</a>]</td>
<td>

FUTURE. Additional attributes of the chosen item. For example, if this item is for a product, socks, where "blue" and "small"
options were chosen for some configurable attributes, then "color:blue" and "size:small" will be indicated here.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>compareAtPrice</strong></td>
<td valign="top"><a href="#money">Money</a></td>
<td>

The current comparison (e.g., MSRP) price of the item

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currentQuantity</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The quantity of this item currently available to order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which the cart item was created. If an item is added, removed, and then added again,
the original item is destroyed and this field will reflect the time it was created for the most recent addition.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>imageURLs</strong></td>
<td valign="top"><a href="#imagesizes">ImageSizes</a></td>
<td>

The URLs for a picture of the item in various sizes

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isBackorder</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is this item currently backordered?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isLowQuantity</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is this item quantity available currently below it's low quantity threshold?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isSoldOut</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is this item currently sold out?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this cart item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>optionTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The selected variant optionTitle

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>parcel</strong></td>
<td valign="top"><a href="#shippingparcel">ShippingParcel</a></td>
<td>

Packing information such as item weight, height, length, and depth. Used for calculating shipping rates.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The current price of the item

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>priceWhenAdded</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The price at which this item was listed when it was added to the cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productConfiguration</strong></td>
<td valign="top"><a href="#productconfiguration">ProductConfiguration</a>!</td>
<td>

The product and chosen options

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productSlug</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product's slug

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The type of product, used to display cart items differently

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productVendor</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product vendor

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>quantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The quantity of this item that has been added to the cart. This must be a positive integer. Remove this `CartItem` from it's associated cart if you want `0` of this item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop associated with this cart item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subtotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The current price of the item multiplied by the quantity

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A title for use in cart/orders that conveys the selected product's title + chosen options

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this item was last updated

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>variantTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The selected variant title

</td>
</tr>
</tbody>
</table>

### CartItemAttribute

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>label</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The attribute label, e.g., Color

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The attribute value, e.g., Blue

</td>
</tr>
</tbody>
</table>

### CartItemConnection

Wraps a list of `CartItem`s, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#cartitemedge">CartItemEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#cartitem">CartItem</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CartItemEdge

A connection edge in which each node is a `CartItem` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#cartitem">CartItem</a></td>
<td></td>
</tr>
</tbody>
</table>

### CartSummary

A summary of the totals for this cart

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>discountTotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The total of all discounts applied, as a positive number

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>effectiveTaxRate</strong></td>
<td valign="top"><a href="#rate">Rate</a></td>
<td>

The calculated tax-exclusive tax rate on all items and fulfillment prices. This may be null,
and there is a difference between null and 0. Null means "not able to calculate", such as
when no fulfillment method has been selected for some fulfillment groups.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentTotal</strong></td>
<td valign="top"><a href="#money">Money</a></td>
<td>

The total price of all chosen fulfillment methods. This may be null, and there is a difference
between null and 0. Null means "not able to calculate", such as when no fulfillment method has
been selected for some fulfillment groups.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>itemTotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The combined prices of all cart items

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxTotal</strong></td>
<td valign="top"><a href="#money">Money</a></td>
<td>

The total estimated tax that has not already been included in the item prices. This may be null,
and there is a difference between null and 0. Null means "not able to calculate", such as when no
fulfillment methods have been selected or there is some other issue with the tax service.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>total</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The sum of `itemTotal`, `fulfillmentTotal`, and `taxTotal`, minus `discountTotal`

</td>
</tr>
</tbody>
</table>

### Catalog

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The Catalog ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop to which this catalog belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this Catalog was first created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this Catalog was last updated

</td>
</tr>
</tbody>
</table>

### CatalogItemConnection

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#catalogitemedge">CatalogItemEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#catalogitem">CatalogItem</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CatalogItemContent

Represents a catalog item that displays some non-product content

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The CatalogItemProduct ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop to which this catalog belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this CatalogItem was first created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this CatalogItem was last updated

</td>
</tr>
</tbody>
</table>

### CatalogItemEdge

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#catalogitem">CatalogItem</a></td>
<td></td>
</tr>
</tbody>
</table>

### CatalogItemProduct

Represents a catalog item that displays a product

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The CatalogItemProduct ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop to which this catalog belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>product</strong></td>
<td valign="top"><a href="#catalogproduct">CatalogProduct</a></td>
<td>

The catalog product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this CatalogItem was first created, which is when the related product was first published

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this CatalogItem was last updated, which is when the related product was most recently published

</td>
</tr>
</tbody>
</table>

### CatalogProduct

Represents a product that has been published into a shop catalog. The related `Product` is the source of truth for
shop administrators, but that is then published to a catalog as a `CatalogProduct`, which is what should
be displayed to shoppers who browse that catalog.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The CatalogProduct ID. Do not assume that this is the same as the related product ID. See `productId` for that.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>barcode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product barcode value, if it has one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this CatalogProduct was created, which is when the related product was first published

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The full product description, which may have newline characters in it

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The height of the product, if it has physical dimensions

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isBackorder</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if isSoldOut is true AND none of the variants have an inventoryPolicy set

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isDeleted</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if this product has been deleted. Typically, deleted products are not returned in queries.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isLowQuantity</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if at least one of the variants has inventoryManagement enabled and has an available quantity less than its lowInventoryWarningThreshold

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isSoldOut</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if every product variant has inventoryManagement enabled and has 0 inventory

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isTaxable</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is sales tax charged on this item?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isVisible</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if this product should be shown to shoppers. Typically, non-visible products are not returned in queries.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>length</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The length of the product, if it has physical dimensions

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lowInventoryWarningThreshold</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The quantity value below which `isLowQuantity` should be true

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>media</strong></td>
<td valign="top">[<a href="#imageinfo">ImageInfo</a>]</td>
<td>

All media for this product and its variants

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metaDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product description to use for page `description` meta element in HTML

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minOrderQuantity</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The minimum quantity that must be added to a cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>originCountry</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The country of origin

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Subtitle

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>parcel</strong></td>
<td valign="top"><a href="#shippingparcel">ShippingParcel</a></td>
<td>

Dimensions and other information about the containers in which this product will be shipped

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#pricerange">PriceRange</a></td>
<td>

The range of prices among all variants (Deprecated use Pricing instead)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pricing</strong></td>
<td valign="top">[<a href="#productpricinginfo">ProductPricingInfo</a>]!</td>
<td>

Price and related information, per currency

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>primaryImage</strong></td>
<td valign="top"><a href="#imageinfo">ImageInfo</a></td>
<td>

The primary image

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The related Product ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

An arbitrary product type value, such as from an external system

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop to which this product belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sku</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A stock keeping unit (SKU) identifier for this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>slug</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A URL-safe and human-readable string that uniquely identifies this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>socialMetadata</strong></td>
<td valign="top">[<a href="#socialmetadata">SocialMetadata</a>]</td>
<td>

Holds metadata specific to a specific social network service

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>supportedFulfillmentTypes</strong></td>
<td valign="top">[<a href="#fulfillmenttype">FulfillmentType</a>]!</td>
<td>

When a shopper purchases this product, what types of fulfillment can they choose from?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tagIds</strong></td>
<td valign="top">[<a href="#id">ID</a>]</td>
<td>

The list of tag IDs that have been applied to this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tags</strong></td>
<td valign="top"><a href="#tagconnection">TagConnection</a></td>
<td>

The list of tags that have been applied to this product

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#tagsortbyfield">TagSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A value matching a `taxCode` value from the full list of TaxCodes

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description to use for the tax line item on an invoice

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Product title

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this CatalogProduct was last updated, which is when the related product was most recently published

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>variants</strong></td>
<td valign="top">[<a href="#catalogproductvariant">CatalogProductVariant</a>]</td>
<td>

A flat list of all variants for this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vendor</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product vendor or manufacturer, for display

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>weight</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The weight of the product on Earth, if it has physical dimensions

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>width</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The width of the product, if it has physical dimensions

</td>
</tr>
</tbody>
</table>

### CatalogProductVariant

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The CatalogProductVariant ID. Do not assume that this is the same as the related variant ID. See `variantId` for that.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>barcode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product variant barcode value, if it has one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The date and time at which this CatalogProductVariant was created, which is when the related product was first published

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The height of the product variant, if it has physical dimensions

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>index</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The position of this variant among other variants at the same level of the product-variant-option hierarchy

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>inventoryManagement</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if inventory management is enabled for this variant

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>inventoryPolicy</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if inventory policy is enabled for this variant

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isLowQuantity</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if inventoryManagement is enabled and this variant has an available quantity less than its lowInventoryWarningThreshold

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isSoldOut</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

True if inventoryManagement is enabled and this variant has 0 inventory

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isTaxable</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is sales tax charged on this item?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>length</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The length of the product, if it has physical dimensions

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lowInventoryWarningThreshold</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The quantity value below which `isLowQuantity` should be true

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>media</strong></td>
<td valign="top">[<a href="#imageinfo">ImageInfo</a>]</td>
<td>

All media for this variant / option

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minOrderQuantity</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The minimum quantity that must be added to a cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>options</strong></td>
<td valign="top">[<a href="#catalogproductvariant">CatalogProductVariant</a>]</td>
<td>

Child variants, if any

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>optionTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

An option title. If this is set and this variant has a CatalogProductVariant parent, treat this variant as an option

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>originCountry</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The country of origin

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The price, in the default shop currency (Deprecated use Pricing instead)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pricing</strong></td>
<td valign="top">[<a href="#productpricinginfo">ProductPricingInfo</a>]!</td>
<td>

Price and related information, per currency

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>primaryImage</strong></td>
<td valign="top"><a href="#imageinfo">ImageInfo</a></td>
<td>

The primary image of this variant / option

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop to which this product variant belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sku</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A stock keeping unit (SKU) identifier for this product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A value matching a `taxCode` value from the full list of TaxCodes

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description to use for the tax line item on an invoice

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Product title

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The date and time at which this CatalogProduct was last updated, which is when the related product was most recently published

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>variantId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The related Variant ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>weight</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The weight of the product on Earth, if it has physical dimensions

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>width</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The width of the product, if it has physical dimensions

</td>
</tr>
</tbody>
</table>

### Checkout

Holds all information collected for a cart during checkout

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentGroups</strong></td>
<td valign="top">[<a href="#fulfillmentgroup">FulfillmentGroup</a>]!</td>
<td>

One or more fulfillment groups, for example, mapping certain items to certain shipping addresses

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>summary</strong></td>
<td valign="top"><a href="#cartsummary">CartSummary</a>!</td>
<td>

A summary of the totals for this cart

</td>
</tr>
</tbody>
</table>

### CreateCartPayload

The payload returned from the `createCart` mutation call

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a></td>
<td>

The created cart, if at least one item could be added. Otherwise null, and you should check
`incorrectPriceFailures` and `minOrderQuantityFailures` for information necessary to display
errors to the shopper.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>incorrectPriceFailures</strong></td>
<td valign="top">[<a href="#incorrectpricefailuredetails">IncorrectPriceFailureDetails</a>]!</td>
<td>

Clients should check to see if any items failed to be added due to the price not matching the current price.
In general, a user interface should display the correct current prices to the shopper, confirm that they still
want to add the items, and then call `createCart` or `addCartItems` to do so.

Note that this field will always exist but may be an empty array if there were no failures of this type.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minOrderQuantityFailures</strong></td>
<td valign="top">[<a href="#minorderquantityfailuredetails">MinOrderQuantityFailureDetails</a>]!</td>
<td>

Clients should check to see if any items failed to be added due to quantity being below the minimum order
quantity defined for the product variant. In general, a user interface should display the minimum order
quantity to the shopper and allow them to add that quantity or greater.

Note that this field will always exist but may be an empty array if there were no failures of this type.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>token</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

If no identity token is provided with the request, then this mutation will create an anonymous cart. All
anonymous carts have a token associated with them, which allows the client that created the cart to access
that cart in the future. This is the only time this token is returned, so clients must store this securely
in some type of local storage solution, and then send it along with all future anonymous cart queries and
mutations.

</td>
</tr>
</tbody>
</table>

### CreateFlatRateFulfillmentMethodPayload

Response from the `createFlatRateFulfillmentMethod` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#flatratefulfillmentmethod">FlatRateFulfillmentMethod</a>!</td>
<td>

The created fulfillment method

</td>
</tr>
</tbody>
</table>

### CreateGroupPayload

The response from the `createGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#group">Group</a></td>
<td>

The new group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### Currency

Represents one type of currency

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>code</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>symbol</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>format</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>scale</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>decimal</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>thousand</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rate</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### CurrencyConnection

Wraps a list of `Currencies`, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#currencyedge">CurrencyEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#currency">Currency</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CurrencyEdge

A connection edge in which each node is an `Currency` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#currency">Currency</a></td>
<td></td>
</tr>
</tbody>
</table>

### DeleteFlatRateFulfillmentMethodPayload

Response from the `deleteFlatRateFulfillmentMethod` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#flatratefulfillmentmethod">FlatRateFulfillmentMethod</a>!</td>
<td>

The removed fulfillment method

</td>
</tr>
</tbody>
</table>

### EmailRecord

A confirmable email record

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>provides</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td>

The actual email address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>verified</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Has this address been verified?

</td>
</tr>
</tbody>
</table>

### ExampleIOUPaymentData

Data for an example IOU payment

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>billingAddress</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td>

The billing address entered or chosen by the shopper

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fullName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of the IOU payer entered by the shopper

</td>
</tr>
</tbody>
</table>

### ExamplePaymentMethodData

An example

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>example</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### FlatRateFulfillmentMethod

Defines a fulfillment method that has a fixed price. This type is provided by the `flat-rate` fulfillment plugin.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The flat rate fulfillment method ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cost</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The cost of this fulfillment method to the shop, if you track this

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentTypes</strong></td>
<td valign="top">[<a href="#fulfillmenttype">FulfillmentType</a>]!</td>
<td>

The fulfillment types for which this method may be used. For example, "shipping" or "digital".

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The group to which this method belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>handling</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

A fixed price to charge for handling costs when this fulfillment method is selected for an order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isEnabled</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Include this as a fulfillment option shown to shoppers during checkout?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>label</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of this method, for display in the user interface

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of this method, a unique identifier

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rate</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

A fixed price to charge for fulfillment costs when this fulfillment method is selected for an order

</td>
</tr>
</tbody>
</table>

### FulfillmentData

Information needed by the selected fulfillment method to properly fulfill the order

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>shippingAddress</strong></td>
<td valign="top"><a href="#address">Address</a></td>
<td>

The mailing address to which this fulfillment group should be shipped

</td>
</tr>
</tbody>
</table>

### FulfillmentGroup

Links one or more cart items to fulfillment data. The most common example is having one FulfillmentGroup
per shipping address.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The fulfillment ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableFulfillmentOptions</strong></td>
<td valign="top">[<a href="#fulfillmentoption">FulfillmentOption</a>]!</td>
<td>

The list of fulfillment options from which the shopper may choose. This list is created by taking
the full list of registered fulfillment methods, keeping only those that match the fulfillment `type`
of this group, and then calculating a price and handlingPrice for each based on the `items` in this group.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#fulfillmentdata">FulfillmentData</a></td>
<td>

Information needed by the fulfillment type to properly fulfill the order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>items</strong></td>
<td valign="top">[<a href="#cartitem">CartItem</a>]!</td>
<td>

The items that are included in this fulfillment group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>selectedFulfillmentOption</strong></td>
<td valign="top"><a href="#fulfillmentoption">FulfillmentOption</a></td>
<td>

The fulfillment method selected by a shopper for this group, with its associated price

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#fulfillmenttype">FulfillmentType</a>!</td>
<td>

The fulfillment type. Any valid type that has been registered by a fulfillment plugin. Examples: "shipping", "digital"

</td>
</tr>
</tbody>
</table>

### FulfillmentMethod

A single fulfillment method. Fulfillment methods are shown to shoppers along with a quote for them,
and the shopper chooses one method per fulfillment group per cart during checkout.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The fulfillment method ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>carrier</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A carrier name

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of this method, for display in the user interface

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentTypes</strong></td>
<td valign="top">[<a href="#fulfillmenttype">FulfillmentType</a>]!</td>
<td>

The fulfillment types for which this method may be used. For example, "shipping" or "digital".

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The group to which this method belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of this method, a unique identifier

</td>
</tr>
</tbody>
</table>

### FulfillmentOption

A fulfillment option for a cart fulfillment group, which is a method with an associated price

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentMethod</strong></td>
<td valign="top"><a href="#fulfillmentmethod">FulfillmentMethod</a></td>
<td>

The fulfillment method this pricing is for

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>handlingPrice</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The additional amount charged for handling

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The base price charged

</td>
</tr>
</tbody>
</table>

### Group

Represents an account group

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The group ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this group was created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdBy</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

The account that created this group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A free text description of this group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A unique name for the group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>permissions</strong></td>
<td valign="top">[<a href="#string">String</a>]</td>
<td>

A list of the account permissions implied by membership in this group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a></td>
<td>

The shop to which this group belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>slug</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A unique URL-safe string representing this group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this group was last updated

</td>
</tr>
</tbody>
</table>

### GroupConnection

Wraps a list of `Groups`, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#groupedge">GroupEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#group">Group</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### GroupEdge

A connection edge in which each node is a `Group` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#group">Group</a></td>
<td></td>
</tr>
</tbody>
</table>

### ImageInfo

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>toGrid</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

If greater than 0, then this image should be used for the product grid. The number indicates which position
within the product grid item, for grid weights that show multiple images.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>priority</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

Sort by priority ascending when displaying more than one image for a product in a user interface.
This is an integer with 1 being the first / highest priority image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productId</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td>

The related product ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>variantId</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td>

The related variant ID, if linked with a particular variant

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>URLs</strong></td>
<td valign="top"><a href="#imagesizes">ImageSizes</a></td>
<td>

A list of URLs for various size files of this image

</td>
</tr>
</tbody>
</table>

### ImageSizes

A list of URLs for various sizes of an image

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>large</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Use this URL to get a large resolution file for this image

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>medium</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Use this URL to get a medium resolution file for this image

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>original</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Use this URL to get this image with its original resolution as uploaded. This may not be
the true original size if there is a hard cap on how big image files can be.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>small</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Use this URL to get a small resolution file for this image

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>thumbnail</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Use this URL to get a thumbnail resolution file for this image

</td>
</tr>
</tbody>
</table>

### IncorrectPriceFailureDetails

Details about a CartItemInput that failed to be added to a cart due to a price mismatch

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>currentPrice</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The current price in the system for this product configuration in the requested currency

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productConfiguration</strong></td>
<td valign="top"><a href="#productconfiguration">ProductConfiguration</a>!</td>
<td>

The productConfiguration that was provided with the CartItemInput that caused this failure

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>providedPrice</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The price that was provided with the CartItemInput that caused this failure

</td>
</tr>
</tbody>
</table>

### InviteShopMemberPayload

The response from the `inviteShopMember` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

The account that was successfully created or found and updated by inviting this shop member

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### MarketplaceStripeCardPaymentData

Data for a marketplace Stripe card payment

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>billingAddress</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td>

The billing address entered or chosen by the shopper

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>chargeId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Stripe charge ID

</td>
</tr>
</tbody>
</table>

### Metafield

User defined attributes

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>key</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>namespace</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>scope</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>valueType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### MinOrderQuantityFailureDetails

Details about a CartItemInput that failed to be added to a cart due to a quantity error

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>minOrderQuantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The minimum quantity that can be added to a cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productConfiguration</strong></td>
<td valign="top"><a href="#productconfiguration">ProductConfiguration</a>!</td>
<td>

The productConfiguration that was provided with the CartItemInput that caused this failure

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>quantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The quantity that was provided with the CartItemInput that caused this failure

</td>
</tr>
</tbody>
</table>

### Money

Represents some amount of a single currency

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>amount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The numeric amount

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currency</strong></td>
<td valign="top"><a href="#currency">Currency</a>!</td>
<td>

The currency, for interpreting the `amount`

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayAmount</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The display amount, with any currency symbols and decimal places already added

</td>
</tr>
</tbody>
</table>

### Order

An order

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The Order ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

The account that placed the order. Some orders are created for anonymous users. Anonymous orders have a null account.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cartId</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td>

The ID of the cart that created this order. Carts are deleted after becoming orders, so this is just a reference.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentGroups</strong></td>
<td valign="top">[<a href="#orderfulfillmentgroup">OrderFulfillmentGroup</a>]!</td>
<td>

One or more fulfillment groups. Each of these are fulfilled and charged as separate orders.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which the cart was created, which is when the first item was added to it.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

An email address that has been associated with the cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notes</strong></td>
<td valign="top">[<a href="#ordernote">OrderNote</a>]!</td>
<td>

Notes about the order. This will always return an array but it may be empty

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop through which the order was placed

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalItemQuantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Total quantity of all items in the order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this order was last updated

</td>
</tr>
</tbody>
</table>

### OrderFulfillmentGroup

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The order fulfillment group ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#orderfulfillmentgroupdata">OrderFulfillmentGroupData</a></td>
<td>

Information needed by the selected fulfillment method to properly fulfill the order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>items</strong></td>
<td valign="top"><a href="#orderitemconnection">OrderItemConnection</a></td>
<td>

The items that are part of this fulfillment group

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#orderfulfillmentgroupitemssortbyfield">OrderFulfillmentGroupItemsSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>payment</strong></td>
<td valign="top"><a href="#payment">Payment</a>!</td>
<td>

The payment details for this group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>selectedFulfillmentOption</strong></td>
<td valign="top"><a href="#fulfillmentoption">FulfillmentOption</a>!</td>
<td>

The fulfillment method that was selected, with its price quote

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop responsible for fulfilling this order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>summary</strong></td>
<td valign="top"><a href="#ordersummary">OrderSummary</a>!</td>
<td>

A summary of the totals for this group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalItemQuantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Total quantity of all items in the group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#fulfillmenttype">FulfillmentType</a>!</td>
<td>

The fulfillment type. Any valid type that has been registered by a fulfillment plugin. Examples: "shipping", "digital"

</td>
</tr>
</tbody>
</table>

### OrderItem

A single item in an order. The item contains information about a purchase.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The order item ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

"
The date and time at which this item was first added to the associated cart.
If an item is added, removed, and then added again, this will reflect the most recent addition.
However, if an item is added twice, the quantity will increase but this date will remain
the initial added date.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>attributes</strong></td>
<td valign="top">[<a href="#orderitemattribute">OrderItemAttribute</a>]</td>
<td>

FUTURE. Additional attributes of the chosen item. For example, if this item is for a product, socks, where "blue" and "small"
options were chosen for some configurable attributes, then "color:blue" and "size:small" will be indicated here.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which the order item was created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>imageURLs</strong></td>
<td valign="top"><a href="#imagesizes">ImageSizes</a></td>
<td>

The URLs for a picture of the item in various sizes

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isTaxable</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Is this a taxable item?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this cart item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>optionTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The short title of the associated option, if this is an option item

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>parcel</strong></td>
<td valign="top"><a href="#shippingparcel">ShippingParcel</a></td>
<td>

Packing information such as item weight, height, length, and depth. Used for calculating shipping rates.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The price of the item at the time of purchase

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productConfiguration</strong></td>
<td valign="top"><a href="#productconfiguration">ProductConfiguration</a>!</td>
<td>

The product and chosen options

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productSlug</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product's slug

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The type of product, used to display cart items differently

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productVendor</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The product vendor

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>quantity</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The quantity of this item that has been added to the cart. This must be a positive integer. Remove this `CartItem` from it's associated cart if you want `0` of this item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop associated with this cart item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subtotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The price of the item multiplied by the quantity of this item ordered

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tax</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The amount of tax charged for this item

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Tax code for this item

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxRate</strong></td>
<td valign="top"><a href="#rate">Rate</a>!</td>
<td>

The tax rate used for this item when calculating `tax`

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A title for use in orders that conveys the selected product's title + chosen options

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this item was last updated

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>variantTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The selected variant title

</td>
</tr>
</tbody>
</table>

### OrderItemAttribute

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>label</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The attribute label, e.g., Color

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The attribute value, e.g., Blue

</td>
</tr>
</tbody>
</table>

### OrderItemConnection

Wraps a list of `OrderItem`s, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#orderitemedge">OrderItemEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#orderitem">OrderItem</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### OrderItemEdge

A connection edge in which each node is a `OrderItem` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#orderitem">OrderItem</a></td>
<td></td>
</tr>
</tbody>
</table>

### OrderNote

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>content</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### OrderSummary

A summary of the totals for this order

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>discountTotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The total of all discounts applied, as a positive number

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>effectiveTaxRate</strong></td>
<td valign="top"><a href="#rate">Rate</a>!</td>
<td>

The calculated tax-exclusive tax rate on all items and fulfillment prices

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fulfillmentTotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The total price of all chosen fulfillment methods

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>itemTotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The combined prices of all cart items

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxTotal</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The total estimated tax that has not already been included in the item prices

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>total</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The sum of `itemTotal`, `fulfillmentTotal`, and `taxTotal`, minus `discountTotal`

</td>
</tr>
</tbody>
</table>

### PageInfo

Pagination information. When requesting pages of results, you can use `endCursor` or `startCursor`
as your `before` or `after` parameters for the query you are paging.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>endCursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td>

When paginating forwards, the cursor to continue.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hasNextPage</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

When paginating forwards, are there more items?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hasPreviousPage</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

When paginating backwards, are there more items?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startCursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td>

When paginating backwards, the cursor to continue.

</td>
</tr>
</tbody>
</table>

### Payment

Information about a payment made

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The Payment ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>amount</strong></td>
<td valign="top"><a href="#money">Money</a>!</td>
<td>

The amount that will be applied to this payment method. If there are multiple payment methods applied to the
cart, this may be less than the cart total.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cardBrand</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

For card payments, the brand of the card. Useful for showing card icons for common brands.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this payment was created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#paymentdata">PaymentData</a></td>
<td>

The shopper-provided data needed to complete the payment using this method.
For example, a billing address, store credit code, stored credit card ID, etc.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Use this identifier when showing this payment in a user interface

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#paymentmethod">PaymentMethod</a>!</td>
<td>

The payment method

</td>
</tr>
</tbody>
</table>

### PaymentMethod

Describes a payment method

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#paymentmethoddata">PaymentMethodData</a></td>
<td>

Data for this method. The data format differs for each method

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#paymentmethodname">PaymentMethodName</a>!</td>
<td>

The payment method name. Any valid name that has been registered by a payment plugin. e.g., saved_card

</td>
</tr>
</tbody>
</table>

### PlaceOrderPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>orders</strong></td>
<td valign="top">[<a href="#order">Order</a>]!</td>
<td>

Orders that were created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>token</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

If you are not logged in, this will be a token that can be used for future requests

</td>
</tr>
</tbody>
</table>

### PriceRange

Represents the minimum and maximum price of a product, among all its variants

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>range</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A range display string in the format "min - max", without any currency symbol

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>min</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The price, in shop currency, of the least expensive possible variant with the least expensive possible option

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>max</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The price, in shop currency, of the most expensive possible variant with the most expensive possible option

</td>
</tr>
</tbody>
</table>

### ProductConfiguration

Product configuration data

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>productId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The Product ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productVariantId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The ProductVariant ID

</td>
</tr>
</tbody>
</table>

### ProductPricingInfo

The product price or price range for a specific currency

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>compareAtPrice</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

A comparison price value, usually MSRP. If `price` is null, this will also be null. That is,
only purchasable variants will have a `compareAtPrice`.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currency</strong></td>
<td valign="top"><a href="#currency">Currency</a>!</td>
<td>

The code for the currency these pricing details applies to

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayPrice</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

UI should display this price. If a product has multiple potential prices depending on selected
variants and options, then this is a price range string such as "$3.95 - $6.99". It includes the currency
symbols.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>maxPrice</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The price of the most expensive possible variant+option combination

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minPrice</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The price of the least expensive possible variant+option combination

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

For variants with no options and for options, this will always be set to a price. For variants
with options and products, this will be `null`. There must be a price for a variant to be
added to a cart or purchased. Otherwise you would instead add one of its child options to a cart.

</td>
</tr>
</tbody>
</table>

### Rate

A numeric rate, with its corresponding percent values

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>amount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The rate

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayPercent</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The percent as a preformatted string with percent symbol included

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>percent</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The percent (rate x 100)

</td>
</tr>
</tbody>
</table>

### ReconcileCartsPayload

The payload returned from the `reconcileCarts` mutation call

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The account cart, potentially modified

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### RemoveAccountAddressBookEntryPayload

The response from the `removeAccountAddressBookEntry` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#address">Address</a></td>
<td>

The removed address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### RemoveAccountEmailRecordPayload

The response from the `removeAccountEmailRecord` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

The account, with updated `emailRecords`

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### RemoveAccountFromGroupPayload

The response from the `removeAccountFromGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#group">Group</a></td>
<td>

The updated group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### RemoveCartItemsPayload

The payload returned from the `removeCartItems` mutation call

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The modified cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### RemoveGroupPayload

The response from the `removeGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>wasRemoved</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Successfully removed?

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### Role

Represents a named role

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The role ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

A unique name for the role

</td>
</tr>
</tbody>
</table>

### RoleConnection

Wraps a list of `Roles`, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#roleedge">RoleEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#role">Role</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### RoleEdge

A connection edge in which each node is a `Role` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#role">Role</a></td>
<td></td>
</tr>
</tbody>
</table>

### SelectFulfillmentOptionForGroupPayload

The response from the `selectFulfillmentOptionForGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The updated Cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### SetAccountProfileCurrencyPayload

The response from the `setAccountProfileCurrency` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td>

The updated account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### SetEmailOnAnonymousCartPayload

The payload returned from the `setEmailOnAnonymousCart` mutation call

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The modified cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### SetShippingAddressOnCartPayload

The response from the `setShippingAddressOnCart` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The updated Cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### ShippingOrderFulfillmentGroupData

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>shippingAddress</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### ShippingParcel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>containers</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>distanceUnit</strong></td>
<td valign="top"><a href="#distanceunit">DistanceUnit</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>length</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>massUnit</strong></td>
<td valign="top"><a href="#massunit">MassUnit</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>weight</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>width</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### Shop

Represents a Reaction shop

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The shop ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>administrators</strong></td>
<td valign="top"><a href="#accountconnection">AccountConnection</a></td>
<td>

Returns a list of administrators for this shop, as a Relay-compatible connection.
"Administrators" means all linked accounts that have the "admin" role for this shop.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#accountsortbyfield">AccountSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currencies</strong></td>
<td valign="top">[<a href="#currency">Currency</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currency</strong></td>
<td valign="top"><a href="#currency">Currency</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>groups</strong></td>
<td valign="top"><a href="#groupconnection">GroupConnection</a></td>
<td>

Returns a list of groups for this shop, as a Relay-compatible connection.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#groupsortbyfield">GroupSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Returns shop description

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Returns shop name

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>roles</strong></td>
<td valign="top"><a href="#roleconnection">RoleConnection</a></td>
<td>

Returns a list of roles for this shop, as a Relay-compatible connection.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#rolesortbyfield">RoleSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tags</strong></td>
<td valign="top"><a href="#tagconnection">TagConnection</a></td>
<td>

Returns a paged list of tags for this shop

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">isTopLevel</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

If set, the query will return only top-level tags or only non-top-level tags. By default, both types of tags are returned.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">shouldIncludeDeleted</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Set to true if you want soft deleted tags to be included in the response

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#tagsortbyfield">TagSortByField</a></td>
<td>

By default, tags are sorted by position. Set this to sort by one of the other allowed fields

</td>
</tr>
</tbody>
</table>

### SocialMetadata

Holds metadata specific to a specific social network service

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>service</strong></td>
<td valign="top"><a href="#socialnetwork">SocialNetwork</a></td>
<td>

Which social network is this metadata for

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Default share message to use when sharing this product on this social network

</td>
</tr>
</tbody>
</table>

### StripeCardPaymentData

Data for a Stripe card payment

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>billingAddress</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td>

The billing address entered or chosen by the shopper

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>chargeId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Stripe charge ID

</td>
</tr>
</tbody>
</table>

### Tag

Represents a single tag

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The tag ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this tag was created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isDeleted</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

If `true`, this object should be considered deleted. Soft deleted objects are not
returned in query results unless you explicitly ask for them.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isTopLevel</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

If `true`, this tag should be shown at the top level of the tag hierarchy

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td>

Arbitrary additional metadata about this tag

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The display name for the tag. This is unique within a given shop.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The tag's position relative to other tags at the same level of the tag hierarchy

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subTagIds</strong></td>
<td valign="top">[<a href="#id">ID</a>]!</td>
<td>

A list of the IDs of tags that have this tag as their parent in the tag hierarchy, in the user-defined order

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subTags</strong></td>
<td valign="top"><a href="#tagconnection">TagConnection</a></td>
<td>

A paged list of tags that have this tag as their parent in the tag hierarchy. Currently only three levels are supported.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#connectionlimitint">ConnectionLimitInt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortOrder</td>
<td valign="top"><a href="#sortorder">SortOrder</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sortBy</td>
<td valign="top"><a href="#tagsortbyfield">TagSortByField</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td>

The shop to which this tag belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>slug</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A unique URL-safe string representing this tag for links

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The date and time at which this tag was last updated

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>heroMediaUrl</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A string containing the hero image url for a tag landing page

</td>
</tr>
</tbody>
</table>

### TagConnection

Wraps a list of `Tags`, providing pagination cursors and information.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#tagedge">TagEdge</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#tag">Tag</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### TagEdge

A connection edge in which each node is a `Tag` object

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#tag">Tag</a></td>
<td></td>
</tr>
</tbody>
</table>

### TaxSettings

Per-account tax exemption settings used by the Avalara plugin

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>exemptionNo</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Exemption number for an account

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>customerUsageType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Customer usage type. A value matching the `code` field of one TaxEntityCode, or any custom string.

</td>
</tr>
</tbody>
</table>

### UpdateAccountAddressBookEntryPayload

The response from the `updateAccountAddressBookEntry` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#address">Address</a></td>
<td>

The updated address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### UpdateCartItemsQuantityPayload

The payload returned from the `updateCartItemsQuantity` mutation call

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The modified cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### UpdateFlatRateFulfillmentMethodPayload

Response from the `updateFlatRateFulfillmentMethod` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#flatratefulfillmentmethod">FlatRateFulfillmentMethod</a>!</td>
<td>

The updated fulfillment method

</td>
</tr>
</tbody>
</table>

### UpdateFulfillmentOptionsForGroupPayload

The response from the `updateFulfillmentOptionsForGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cart</strong></td>
<td valign="top"><a href="#cart">Cart</a>!</td>
<td>

The updated Cart

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

### UpdateGroupPayload

The response from the `updateGroup` mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>group</strong></td>
<td valign="top"><a href="#group">Group</a></td>
<td>

The updated group

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>clientMutationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The same string you sent with the mutation params, for matching mutation calls with their responses

</td>
</tr>
</tbody>
</table>

## Enums

### AccountSortByField

The fields by which you are allowed to sort any query that returns an `AccountConnection`

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>name</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>createdAt</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>updatedAt</strong></td>
<td></td>
</tr>
</tbody>
</table>

### AddressType

A list of the possible types of `Address`

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>billing</strong></td>
<td>

Address can be used for payment transactions and invoicing

</td>
</tr>
<tr>
<td valign="top"><strong>shipping</strong></td>
<td>

Address can be used as a mailing address for sending physical items

</td>
</tr>
</tbody>
</table>

### CartItemsSortByField

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>addedAt</strong></td>
<td></td>
</tr>
</tbody>
</table>

### CartReconciliationMode

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>merge</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>keepAccountCart</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>keepAnonymousCart</strong></td>
<td></td>
</tr>
</tbody>
</table>

### CatalogItemSortByField

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>createdAt</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>minPrice</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>updatedAt</strong></td>
<td></td>
</tr>
</tbody>
</table>

### DistanceUnit

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>cm</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ft</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>in</strong></td>
<td></td>
</tr>
</tbody>
</table>

### FulfillmentType

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>digital</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>pickup</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>shipping</strong></td>
<td></td>
</tr>
</tbody>
</table>

### GroupSortByField

The fields by which you are allowed to sort any query that returns an `GroupConnection`

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>name</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>createdAt</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>updatedAt</strong></td>
<td></td>
</tr>
</tbody>
</table>

### MassUnit

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>g</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kg</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>lb</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>oz</strong></td>
<td></td>
</tr>
</tbody>
</table>

### OrderFulfillmentGroupItemsSortByField

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>addedAt</strong></td>
<td></td>
</tr>
</tbody>
</table>

### PaymentMethodName

The name of a payment method, which is how payment methods are keyed

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>none</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>iou_example</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>stripe_card</strong></td>
<td></td>
</tr>
</tbody>
</table>

### RoleSortByField

The fields by which you are allowed to sort any query that returns an `RoleConnection`

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>name</strong></td>
<td></td>
</tr>
</tbody>
</table>

### SocialNetwork

The list of currently supported social network identifiers

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>twitter</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>facebook</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>pinterest</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>googleplus</strong></td>
<td></td>
</tr>
</tbody>
</table>

### SortOrder

The order in which the connection results should be sorted, based on the `sortBy` field.

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>asc</strong></td>
<td>

ascending

</td>
</tr>
<tr>
<td valign="top"><strong>desc</strong></td>
<td>

descending

</td>
</tr>
</tbody>
</table>

### TagSortByField

The fields by which you are allowed to sort any query that returns a `TagConnection`

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>_id</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>createdAt</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>name</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>position</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>updatedAt</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### ConnectionCursor


An opaque string that identifies a particular result within a connection,
allowing you to request a subset of results before or after that result.


### ConnectionLimitInt


An integer between 1 and 50, inclusive. Values less than 1 become 1 and
values greater than 50 become 50.


### Date

A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

### DateTime

A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

### Email

A string email address

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 

### JSONObject

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### Time

A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.


## Interfaces


### CatalogItem

Catalog items are combined to create a catalog. Each item can represent a different type of content.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
</tbody>
</table>

### CatalogProductOrVariant

This interface represents the fields that are identical for both Products and Variants

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>barcode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

This should be required but we need to migrate existing data first

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isLowQuantity</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isSoldOut</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isTaxable</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>length</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lowInventoryWarningThreshold</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metafields</strong></td>
<td valign="top">[<a href="#metafield">Metafield</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minOrderQuantity</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>originCountry</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>shop</strong></td>
<td valign="top"><a href="#shop">Shop</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sku</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>taxDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

This should be required but we need to migrate existing data first

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>weight</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>width</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### Deletable

Objects implementing the `Deletable` support soft deletion

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>isDeleted</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

If `true`, this object should be considered deleted. Soft deleted objects are not
returned in query results unless you explicitly ask for them.

</td>
</tr>
</tbody>
</table>

### Node

Objects implementing the `Node` interface will always have an `_id` field that is globally unique.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

The ID of the object

</td>
</tr>
</tbody>
</table>

### NodeConnection

Objects implementing the `NodeConnection` interface are Relay-compatible connections.

For information about what Relay-style connections are and how to use them, see the following articles:
- [Relay Connection Documentation](https://facebook.github.io/relay/docs/en/graphql-server-specification.html#connections)
- [Relay Connection Specification](https://facebook.github.io/relay/graphql/connections.htm)
- [Using Relay-style Connections With Apollo Client](https://www.apollographql.com/docs/react/recipes/pagination.html)

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#nodeedge">NodeEdge</a>]</td>
<td>

The list of nodes that match the query, wrapped in an edge to provide a cursor string for each

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#node">Node</a>]</td>
<td>

You can request the `nodes` directly to avoid the extra wrapping that `NodeEdge` has,
if you know you will not need to paginate the results.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td>

Information to help a client request the next or previous page

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The total number of nodes that match your query

</td>
</tr>
</tbody>
</table>

### NodeEdge

Objects implementing the `NodeEdge` interface will always have a `node` and a `cursor`
that represents that node for purposes of requesting paginated results.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>cursor</strong></td>
<td valign="top"><a href="#connectioncursor">ConnectionCursor</a>!</td>
<td>

The cursor that represents this node in the paginated results

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#node">Node</a></td>
<td>

The node itself

</td>
</tr>
</tbody>
</table>
