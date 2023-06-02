# Automation test suite to test voucher purchase flow

# Description

Automation framework to perform voucher purchase flow testing for https://gift-cards.phorest.com/salons/demous web page using Cypress, Gherkin.

### Set Up

Clone and install:

```bash
git clone https://github.com/samatha12/phorest-test.git
cd phorest-test
npm install
```


### Running the Application

Run it using:

```bash
npm run cypress:open
```

- And cypress app will run in your local system, then select E2E testing and select browser of your choice to run


### Other Commands

- **npm test**: Executes all tests that have the `.feature` extension
- **npm test:chrome**: Executes all tests in chrome browser


### Project Structure

    .
    ├── cypress                     # Cypress folder
        ├── fixtures                # for storing static data files
        ├── e2e                     # consists test files
        ├── support                 # reusable helper files
        ├── video                   # stores recordings of test executions
        └── screenshots             # screenshots of tests

### A typical Gherkin pattern
    .
    ├── e2e                         # Cypress e2e folder
        ├── features                # All feature files 
        └── step definitions        # All step definition files

## Files that I created

### cypress: (/e2e)

### /features

 - `buySuccessfulVoucher.feature` consists of all scenarios that are required to perform the e2e tests for buying a voucher. 

### /step_definitions

 This folder consists of step definitions for scenarios written in feature files

- `buySuccessfulVoucher.js` **buySuccessfulVoucher.js** Consists of code implementation for the scenarios in buySuccessfulVoucher.feature.

### cypress: (/support)

### /commands

 - `iframe` is a custom cypress command and that awaits for the iframe to load and returns document body contents of iframe, available on **cy.iframe()**


### Challenges faced
- On the first page, when I fill details and tried to click on Checkout button, the test got failed and in investigation I found that there is one more hidden button on bottom of page with the same name and attributes for mobile devices.
- Handling IFrames in payment details page.
- Handling locator that has dynamic attributes.


### Future Enhancements
- Continuos integration using any CI tools like jenkins, azure etc
- Checking form validations i.e., with empty values, Boundary value analysis for voucher amount 
- Implement page object pattern for reusability
- Implement cross browser and cross device testing
- Add tests that make unsuccessful payments ie., with invalid test card details etc

### Bugs
- For testing card payments, invalid expiry date was provided in requirement document
- Value not displaying on Gift card when value selected from radio buttons on first page ie., on Buy A Gift Card
- On refresh, user navigating to first page. Eg: When I am on Confirm details page and click refresh, then navigating to Buy a Gift card page and I have to start from the beginning.

