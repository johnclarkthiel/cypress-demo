describe("E2E tests for login functionality on SauceLabs demo page", () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('verifies the login page loads with correct content and username and password are required to login', () => {
        cy.verifyLoginScreenUI()
    });

    it('verifies a user with a valid username and password can authenticate and logout', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.verifyUserAuthState('be.visible');
        cy.logout();
        cy.verifyLoginScreenUI();
        cy.verifyUserAuthState('not.exist');
    });

    it('verifies a user that is locked out receives expected field level errors when attempting to authenticate', () => {
        cy.login('locked_out_user', 'secret_sauce');
        cy.verifyLockedOutState();
    });

    it('verifies a user that an authenticated user sort content as expected', () => {
        cy.login('standard_user', 'secret_sauce');

        cy.sortBy('Name (Z to A)');
        cy.getContentArray('div[class="inventory_item_name"]').then((arr) => {
            cy.verifyArraySortDesc(arr);
        })

        cy.sortBy('Name (A to Z)');
        cy.getContentArray('div[class="inventory_item_name"]').then((arr) => {
            cy.verifyArraySortAsc(arr);
        })
    });


    it('verifies a user can add and remove items from the chart as expected', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.addItemToCart(1);
        cy.verifyOneItemAddedToCart(1);
        cy.addItemToCart(2);
        cy.verifyOneItemAddedToCart(2);
    })
});