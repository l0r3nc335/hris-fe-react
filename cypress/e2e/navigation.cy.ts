describe('Enterprise navigation', () => {
  beforeEach(() => {
    cy.loginByApi()
  })

  it('shows grouped sidebar categories', () => {
    cy.visit('/')
    cy.contains('Overview').should('be.visible')
    cy.contains('People & Organization').should('be.visible')
    cy.contains('Talent & Performance').should('be.visible')
  })

  it('shows breadcrumbs in header on desktop', () => {
    cy.viewport(1280, 800)
    cy.visit('/employees')
    cy.contains('Employees').should('be.visible')
  })

  it('opens notification popover with seeded notifications', () => {
    cy.visit('/')
    cy.get('button[aria-label="Notifications"]').click()
    cy.contains('Notifications').should('be.visible')
    cy.contains('Notification 1').should('be.visible')
    cy.contains('Details for notification 1').should('be.visible')
  })

  it('opens global search and navigates to a page', () => {
    cy.viewport(1280, 800)
    cy.visit('/')
    cy.get('header').contains('button', 'Search').click()
    cy.get('[data-slot="command-input"]').should('be.visible')
    cy.get('[data-slot="command-input"]').type('Employees')
    cy.contains('[data-slot="command-item"]', 'Employees').click()
    cy.url().should('include', '/employees')
  })
})
