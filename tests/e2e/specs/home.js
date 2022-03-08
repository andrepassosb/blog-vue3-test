const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home', () => {
  it('should render login page', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.url().should('include', '/login')
  })
  it('shold input fild blank msg', () => {
    cy.get('#login-email').type('andre@andre.com')
    cy.get('#submit-button').click()
    cy.get('input:invalid').should('have.length', 1)
  })
  it('should render sign up page', () => {
    cy.visit(APP_URL)
    cy.get('#signup-button').click()
    cy.url().should('include', '/signup')
  })
  it('shold input fild blank msg', () => {
    cy.get('#name-field').type('1234')
    cy.get('#gender-field').select('male')
    cy.get('#submit-button').click()
    cy.get('input:invalid').should('have.length', 1)
  })
})
