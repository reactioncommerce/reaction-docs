---
id: version-v1.5.0-acceptance-testing
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

1.  Ran `reaction reset`
2.  Products are created from the `reaction-sample-data` package
3.  All orders are processed with the Generic Payment method unless otherwise stated
4.  The developer console is open to monitor for client-side errors. A successful test implies that no errors are shown here
5.  Server logs are monitored. (the console when running locally) A successful test implies that no errors are shown here.
6.  Tests are performed using U.S. currency and English unless specified

### 1A - Place an order for a single product as an anonymous user

1.  Click on "Basic Reaction Product"
2.  Click "Add to Cart"
3.  Click on "Checkout Now"
4.  Click on "Continue As Guest"
5.  Fill out address
6.  Click on "Save and Continue"
7.  Select "Free Shipping"
8.  (The Generic Payment method should be expanded by default) Enter any name
9.  Enter 4242424242424242 for credit card number
10. Choose an expiration month
11. Choose an expiration year
12. Enter 345 as the CV2 code
13. Select "Complete your order"
14. Verify that you receive the confirmation screen ("Thank You!")

### 1B - Place two consecutive orders as an anonymous user

1.  Follow the instructions for "Place an order for a single product as an anonymous user"
2.  Return to the home screen by clicking on "Reaction" up in the upper left corner
3.  Click on "Basic Reaction Product"
4.  Click "Add to Cart"
5.  Click on "Checkout Now"
6.  Select "Free Shipping"
7.  Enter 4242424242424242 for credit card number
8.  Choose an expiration month
9.  Choose an expiration year
10. Enter 345 as the CV2 code
11. Select "Complete your order"
12. Verify that you receive the confirmation screen ("Thank You!")

### 2A - Place an order for a single product as an authenticated user

1.  From the home screen click on "Sign In"
2.  In the dialog that opens click on "Register"
3.  Enter an email and password
4.  Click on "Register"
5.  Verify that the name in the upper right corner changes to "Guest"
6.  Click on "Basic Reaction Product"
7.  Click "Add to Cart"
8.  Click on "Checkout Now"
9.  Fill out Address
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

1.  Follow the instructions for "Place an order for a single product as an authenticated user"
2.  Return to the home screen by clicking on "Reaction" up in the upper left corner
3.  Click on "Basic Reaction Product"
4.  Click "Add to Cart"
5.  Click on "Checkout Now"
6.  Select "Free Shipping"
7.  Enter 4242424242424242 for credit card number
8.  Choose an expiration month
9.  Choose an expiration year
10. Enter 345 as the CV2 code
11. Select "Complete your order"
12. Verify that you receive the confirmation screen ("Thank You!")

### 3A - Place an order paid for via PayFlow Pro

1.  Log in as the admin
2.  Click on "Dashboard" in right hand column
3.  Click on the gear icon
4.  Scroll down to "Payflow Pro"
5.  Select Enabled for "Payflow Enabled"
6.  Enter API Client ID
7.  Enter API Secret
8.  Select "Sandbox" for Mode
9.  Click on "Save Changes"
10. Perform either test 1A or 2A but substitute Payflow Pro for Generic Payment Method

### 4A - Place an order paid for via Paypal Express

(**Note**: To test this method you will need to create a user (separate from your admin user) for testing. See
the Paypal documentation for more details)

1.  Log in as the admin
2.  Click on "Dashboard" in right hand column
3.  Click on the gear icon
4.  Select Enabled for "Express Enabled"
5.  Enter Merchant ID
6.  Enter Username
7.  Enter Password
8.  Enter Signature
9.  Select "Sandbox" for Express Mode
10. Click on "Save Changes"
11. Click on "Basic Reaction Product"
12. Click "Add to Cart"
13. Click on "Checkout Now"
14. Click on "Continue As Guest"
15. Fill out address
16. Click on "Save and Continue"
17. Select "Free Shipping"
18. Click on "Checkout with Paypal Express"
19. The Paypal modal will open. Enter the Paypal user and password you created in the Sandbox dashboard
20. When the modal returns click on "Continue"
21. Verify that you receive the confirmation screen ("Thank You!")

### 5A - Place an order paid for via Stripe

1.  Log in as the admin
2.  Click on "Dashboard" in right hand column
3.  Click on the gear icon
4.  Enter API Client ID
5.  Click on "Update"
6.  Perform either test 1A or 2A but substitute Stripe for Generic Payment Method
