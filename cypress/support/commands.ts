Cypress.Commands.add('loginByApi', () => {
  cy.visit('/auth/login')
  cy.get('input[type="email"]').type('admin@hris.com')
  cy.get('input[type="password"]').type('password')
  cy.contains('button', 'Sign in').click()
  cy.url().should('eq', Cypress.config().baseUrl + '/')
})

declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(): Chainable<void>
    }
  }
}

export {}
