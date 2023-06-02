Feature: Tests on buying a gift voucher

    Background:
        Given User navigates to gift card demo portal
    Scenario Outline: User should able to buy a voucher succesfully to themselves
        When I fill details card value as '<Amount>' email as '<Email>' first name as '<FName>' last name as '<LName>'
        When I check and confirm details for themselves with card value '<Amount>' and Email id '<Email>'
        When I complete payment details and submit
        Then user should navigate to success page and card value '<Amount>' displayed
        Examples:
            | Amount | Email          | FName | LName |
            | 50     | sam@gmail.com  | Sam   | Test  |
            | 1000   | sam@gmail.com  | Dan   | Test  |
            | 25     | rudi@gmail.com | Rudi  | Test  |


    Scenario Outline: User should able to buy a voucher succesfully to someone else
        When I fill details card value as '<Amount>' email as '<Email>' first name as '<FName>' last name as '<LName>' recipients email as '<RecipientEmail>' message as '<Message>'
        When I check and confirm details for someone else with card value '<Amount>' Email id '<Email>' and recipients email '<RecipientEmail>'
        When I complete payment details and submit
        Then user should navigate to success page and card value '<Amount>' displayed
        Examples:
            | Amount | Email          | FName | LName | RecipientEmail | Message         |
            | 50     | sam@gmail.com  | Sam   | yyy   | sam@gmail.com  | Happy Birtday!  |
            | 999    | sam@gmail.com  | Dan   | Test  | dan@gmail.com  | Happy Birtday!  |
            | 25     | rudi@gmail.com | Rudi  | Test  | Rudi@gmail.com | Happy Birthday! |