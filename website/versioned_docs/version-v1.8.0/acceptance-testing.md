---
id: version-v1.8.0-acceptance-testing
title: Acceptance Testing
original_id: acceptance-testing
---
    
## Purpose

This document seeks to outline a set of tests that can be performed
either manually or through automation that would be completed successfully
before a release is created. These tests are to verify functionality from
a users perspective (as opposed to unit or integration tests)

## Test Setup

Each test assumes this environment unless otherwise stated

1. Ran `reaction reset`
2. All orders are processed with the Example Payment method unless otherwise stated
3. The developer console is open to monitor for client-side errors. A successful test implies that no errors are shown here
4. Server logs are monitored. (the console when running locally) A successful test implies that no errors are shown here.
5. Tests are performed using U.S. currency and English unless specified

### 1A - Place an order for a single product as an anonymous user

1. Click on "Basic Reaction Product"
2. Click "Add to Cart"
3. Click on "Checkout Now"
4. Click on "Continue As Guest"
5. Fill out address
6. Click on "Save and Continue"
7. Select "Free Shipping"
8. (The Generic Payment method should be expanded by default) Enter any name
9. Enter 4242424242424242 for credit card number
10. Choose an expiration month
11. Choose an expiration year
12. Enter 345 as the CV2 code
13. Select "Complete your order"
14. Verify that you receive the confirmation screen ("Thank You!")

### 1B - Place two consecutive orders as an anonymous user

1. Follow the instructions for "Place an order for a single product as an anonymous user"
2. Return to the home screen by clicking on "Reaction" up in the upper left corner
3. Click on "Basic Reaction Product"
4. Click "Add to Cart"
5. Click on "Checkout Now"
6. Select "Free Shipping"
7. Enter 4242424242424242 for credit card number
8. Choose an expiration month
9. Choose an expiration year
10. Enter 345 as the CV2 code
11. Select "Complete your order"
12. Verify that you receive the confirmation screen ("Thank You!")

### 2A - Place an order for a single product as an authenticated user

1. From the home screen click on "Sign In"
2. In the dialog that opens click on "Register"
3. Enter an email and password
4. Click on "Register"
5. Verify that the name in the upper right corner changes to "Guest"
6. Click on "Basic Reaction Product"
7. Click "Add to Cart"
8. Click on "Checkout Now"
9. Fill out Address
10. Click on "Save and Continue"
11. Select "Free Shipping"
12. (The Generic Payment method should be expanded by default) Enter any name
13. Enter 4242424242424242 for credit card number
14. Choose an expiration month
15. Choose an expiration year
16. Enter 345 as the CV2 code
17. Select "Complete your order"
18. Verify that you receive the confirmation screen ("Thank You!")

### 2B - Place two consecutive orders as an authenticated user

1. Follow the instructions for "Place an order for a single product as an authenticated user"
2. Return to the home screen by clicking on "Reaction" up in the upper left corner
3. Click on "Basic Reaction Product"
4. Click "Add to Cart"
5. Click on "Checkout Now"
6. Select "Free Shipping"
7. Enter 4242424242424242 for credit card number
8. Choose an expiration month
9. Choose an expiration year
10. Enter 345 as the CV2 code
11. Select "Complete your order"
12. Verify that you receive the confirmation screen ("Thank You!")

### 3A - Place an order paid for via PayFlow Pro

1. Log in as the admin
2. Click on "Dashboard" in right hand column
3. Click on the gear icon
4. Scroll down to "Payflow Pro"
5. Select Enabled for "Payflow Enabled"
6. Enter API Client ID
7. Enter API Secret
8. Select "Sandbox" for Mode
9. Click on "Save Changes"
10. Perform either test 1A or 2A but substitute Payflow Pro for Generic Payment Method

### 4A - Place an order paid for via PayPal Express

**Note**: To test this method you will need to create a user, separate from your admin user, for testing. See
the PayPal documentation to [learn how to create a personal sandbox account](https://developer.paypal.com/docs/classic/lifecycle/sb_about-accounts/#create-a-personal-sandbox-account).

1. Log in as the admin
2. Click on "Dashboard" in right hand column
3. Click on the gear icon
4. Select Enabled for "Express Enabled"
5. Enter Merchant ID
6. Enter Username
7. Enter Password
8. Enter Signature
9. Select "Sandbox" for Express Mode
10. Click on "Save Changes"
11. Click on "Basic Reaction Product"
12. Click "Add to Cart"
13. Click on "Checkout Now"
14. Click on "Continue As Guest"
15. Fill out address
16. Click on "Save and Continue"
17. Select "Free Shipping"
18. Click on "Checkout with PayPal Express"
19. The PayPal modal will open. Enter the PayPal user and password you created in the Sandbox dashboard
20. When the modal returns click on "Continue"
21. Verify that you receive the confirmation screen ("Thank You!")

### 5A - Place an order paid for via Stripe

1. Log in as the admin
2. Click on "Dashboard" in right hand column
3. Click on the gear icon
4. Enter API Client ID
5. Click on "Update"
6. Perform either test 1A or 2A but substitute Stripe for Generic Payment Method

### 6A - Fulfill, Refund, and Cancel orders
1. Follow all the above steps first, and make sure you have _at least_ six (6) orders ready to be processed.
2. Login as your administrator (default) account
3. Navigate to Orders fulfillment dashboard
4. Test the text search filter by typing various emails / names / Order ID's
5. Change the table to only display five (5) rows, and test out the table pagination
6. Click one of the orders, and process the order:
  - Click the `Approve` button
  - Print the invoice
  - Click the `Capture Payment` button
  - Apply a partial refund (this will not work with the `Example Payment Provider`)
  - Print the invoice (again)
  - If Shippo is enabled, print the shipping label
  - If Shippo is not enabled, add a tracking number and save
  - Click the `All Items Packed` button
  - Click the `Shipped` button
  - Click the `Resend Shipment Notification` button
  - Make sure you receive both emails
7. Back on the Orders table, select two unprocessed orders, and use bulk actions to process:
  - Use the bulk actions dropdown to move the orders forward through the workflows
  - Use the bulk actions dropdown to regress orders backwards through the workflows
  - Press the `Capture` button to capture both orders
8. Click one of the remaining unprocessed orders, and cancel the order without restocking products
  - Write down the product and quantity of product in this order
  - Visit the PDP of the products, and write down the current inventory number
  - Return to this order, and press the `Cancel Order` button
  - Click the `Yes, but no restocking` button
  - Return to the PDP of the product, and confirm that inventory has not changed
9. Click one of the remaining unprocessed orders, and cancel the order with restocking products:
  - Write down the product and quantity of product in this order
  - Visit the PDP of the products, and write down the current inventory number
  - Return to this order, and press the `Cancel Order` button
  - Click the `Yes, and restock` button
  - Return to the PDP of the product, and confirm that inventory has changed as it should
10. Click one of the orders, and try to apply a refund that is more than the total order
11. Test the `Status` and `Shipping Status` filters now that your orders have different statuses
12. Test the column sorting in the table now that your orders have different statuses
