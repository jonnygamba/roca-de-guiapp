describe('POST API', () => {
  beforeEach(() => {

  })

  it('Cannot create a new Input without id', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: '/api/inputs/cloudinary',
      body: {
        url: 'http://google.com'
      }
    }).as('response')
    cy.get('@response').its('status').should('be.equal', 400)
  })

  it('Cannot create a new Input without url', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: '/api/inputs/cloudinary',
      body: {
        id: 1654974661
      }
    }).as('response')
    cy.get('@response').its('status').should('be.equal', 400)
  })

  it('Cannot create a new Input when the timestamp is older than a minute', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: '/api/inputs/cloudinary',
      body: {
        id: Date.now() / 1000 - 6000,
        url: 'http://google.com'
      }
    }).as('response')
    cy.get('@response').its('status').should('be.equal', 400)
  })

  it('can create a new Input when the timestamp is newer than a minute', () => {
    cy.request({
      method: 'POST',
      url: '/api/inputs/cloudinary',
      body: {
        id: Date.now() / 1000 + 2000,
        url: 'http://google.com'
      }
    }).as('response')
    cy.get('@response').its('status').should('be.equal', 201)
  })

  it('can create a new input when valid data is sent', () => {
    cy.request({
      method: 'POST',
      url: '/api/inputs/cloudinary',
      body: {
        id: 1654974661,
        url: 'http://google.com',
        description: 'this is a test'
      }
    }).as('response')
    cy.get('@response').its('status').should('be.equal', 201)
  })
})
