// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('verifyLoginScreenUI', () => {
    cy.get('div[class="login_logo"]')
      .should('be.visible');
    cy.get('[id="user-name"]')
      .should('be.visible');
    cy.get('[id="password"]')
      .should('be.visible')
    cy.get('[id="login-button"]')
      .should('be.visible')
      .and('be.enabled')
});

Cypress.Commands.add('login', (username,password) => {
  cy.get('[id="user-name"]')
    .type(username);
  cy.get('[id="password"]')
    .type(password);
  cy.get('[id="login-button"]')
    .click();
});

Cypress.Commands.add('logout', () => {
    cy.get('[id="react-burger-menu-btn"]')
      .click().then(() => {
          cy.get('[id="logout_sidebar_link"]')
            .click();
      });
});

Cypress.Commands.add('verifyUserAuthState', (state) => {
    cy.get('[id="react-burger-menu-btn"]')
      .should(state);
    cy.get('div[class="app_logo"]')
      .should(state);
    cy.get('[id="shopping_cart_container"]')
      .should(state);
    cy.get('[id="inventory_container"]')
      .should(state);
});

Cypress.Commands.add('verifyLockedOutState', () => {
    cy.get('[data-test="error"]')
      .contains('Epic sadface: Sorry, this user has been locked out.')
      .should('be.visible');
    cy.verifyUserAuthState('not.exist')
});

Cypress.Commands.add('sortBy', (criteria) => {
    cy.get('[data-test="product_sort_container"]')
      .select(criteria);
});

Cypress.Commands.add('getContentArray', (locator) => {
    const contentArray = [];
    cy.get(locator).each((el) => {
        cy.wrap(el).invoke('text').then((txt) => {
            contentArray.push(txt);
        })
    }).then(() => {
        return contentArray;
    })
})

Cypress.Commands.add('verifyArraySortAsc', (contentArray) => {
    const arr = [];
    cy.log(contentArray)
    for (let i = 1; i < contentArray.length; i++) {
        arr.push(contentArray[i-1].localeCompare(contentArray[i]));
    }
    arr.every((n) => expect(n).to.be.at.most(0));
})

Cypress.Commands.add('verifyArraySortDesc', (contentArray) => {
    const arr = [];
    for (let i = 1; i < contentArray.length; i++) {
        arr.push(contentArray[i-1].localeCompare(contentArray[i]));
    }
    arr.every((n) => expect(n).to.be.at.least(0));
})

Cypress.Commands.add('addItemToCart', (index) => {
    cy.get('[id^="add-to-cart-sauce-labs-"]')
      .eq((index - 1))
      .click()
})

Cypress.Commands.add('verifyOneItemAddedToCart', (index) => {
    cy.get('a[class="shopping_cart_link"]')
      .find('span[class="shopping_cart_badge"]')
      .should((el) => {
        expect(el).to.contain(`${index}`)
      })
})