import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('User navigates to gift card demo portal', () => {
  cy.visit('/salons/demous');
  cy.url().should('include', '/salons');
});

When(
  'I fill details card value as {string} email as {string} first name as {string} last name as {string}',
  (amount, email, firstName, lastName) => {
    if (amount === 50 || amount === 100 || amount === 150) {
      cy.get(`#option$${amount}`).check();
    } else {
      cy.get('#optionOther').check();
      cy.get('[data-target="amount.otherInput"]').type(amount);
    }
    cy.get('[data-target="tabs.sendToMyselfTab"]').click();
    cy.get('[data-target="email.purchaserEmailInput"]').type(email);
    cy.get('[data-target="name.purchaserFirstNameInput"]').type(firstName);
    cy.get('[data-target="name.purchaserLastNameInput"]').type(lastName);
    cy.get('[data-target="checkout.checkoutButton"]').last().click();
  }
);

When(
  'I fill details card value as {string} email as {string} first name as {string} last name as {string} recipients email as {string} message as {string}',
  (amount, email, firstName, lastName, recipientEmail, message) => {
    if (amount === 50 || amount === 100 || amount === 150) {
      cy.get(`#option$${amount}`).check();
    } else {
      cy.get('#optionOther').check();
      cy.get('[data-target="amount.otherInput"]').type(amount);
    }
    cy.get('[data-target="tabs.sendToOtherTab"]').click();
    cy.get('[data-target="email.purchaserEmailInput"]').type(email);
    cy.get('[data-target="name.purchaserFirstNameInput"]').type(firstName);
    cy.get('[data-target="name.purchaserLastNameInput"]').type(lastName);
    cy.get('[data-target="email.recipientEmailInput"]').type(recipientEmail);
    cy.get('[data-target="email.recipientMessageInput"]').type(message);
    if (amount <= 25 || amount >= 1000) {
      cy.log('Enter card value between 25 and 1000');
    } else {
      cy.get('[data-target="checkout.checkoutButton"]').last().click();
    }
  }
);

When(
  'I check and confirm details for themselves with card value {string} and Email id {string}',
  (amount, email) => {
    cy.url().should('include', 'confirm');

    cy.get('#confirm-voucher-value').should('contains.text', amount);
    cy.get('#confirm-payment-amount').should('contains.text', amount);
    cy.get('#confirm-purchaser-email').should('contains.text', email);
    cy.get('#confirm-recipient-email').should('contains.text', email);

    cy.get('[data-action="confirm#confirmAction"]').click();
  }
);

When(
  'I check and confirm details for someone else with card value {string} Email id {string} and recipients email {string}',
  (amount, email, recipientEmail) => {
    cy.url().should('include', 'confirm');

    cy.get('#confirm-voucher-value').should('contains.text', amount);
    cy.get('#confirm-payment-amount').should('contains.text', amount);
    cy.get('#confirm-purchaser-email').should('contains.text', email);
    cy.get('#confirm-recipient-email').should('contains.text', recipientEmail);

    cy.get('[data-action="confirm#confirmAction"]').click();
  }
);

When('I complete payment details and submit', () => {
  cy.url().should('include', 'payment');

  cy.get('[id^="hostedform-"]')
    .iframe()
    .then(($iframe) => {
      cy.wrap($iframe).find('#card-name').type('samatha');
      cy.wrap($iframe).find('#card-zip').type('92606');
      cy.wrap($iframe).find('#card-number').type('4111 1111 1111 1111');
      cy.wrap($iframe).find('#card-expiry').type('12/23');
      cy.wrap($iframe).find('#card-security').type('999');
      cy.wrap($iframe).find('#submitButton').click();
    });
});

Then(
  'user should navigate to success page and card value {string} displayed',
  (amount) => {
    cy.url({ timeout: 3000 }).should('include', 'success');

    cy.log('check payment success message');
    cy.get('.container > p')
      .eq(0)
      .should('include.text', 'Payment accepted, thank you!');

    cy.log('check voucher amount');
    cy.get('.container > p').eq(5).should('include.text', amount);

    cy.get('button').contains('Done').click();
  }
);
