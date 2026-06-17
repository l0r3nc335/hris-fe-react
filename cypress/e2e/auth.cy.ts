describe('Auth flows', () => {
  it('redirects unauthenticated users to login', () => {
    cy.visit('/users')
    cy.url().should('include', '/auth/login')
    cy.contains('Sign in').should('be.visible')
  })

  it('logs in with valid credentials', () => {
    cy.loginByApi()
    cy.contains('h1', 'Dashboard').should('be.visible')
  })

  it('shows validation on invalid login', () => {
    cy.visit('/auth/login')
    cy.contains('button', 'Sign in').click()
    cy.contains('Sign in').should('be.visible')
  })

  it('navigates to register and forgot password pages', () => {
    cy.visit('/auth/login')
    cy.contains('a', 'Create account').click()
    cy.url().should('include', '/auth/register')
    cy.contains('Register').should('be.visible')

    cy.visit('/auth/login')
    cy.contains('a', 'Forgot password?').click()
    cy.url().should('include', '/auth/forgot-password')
    cy.contains('Forgot password').should('be.visible')
  })
})
