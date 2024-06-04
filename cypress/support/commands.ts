Cypress.Commands.add('interceptBusinessSlim', () => {
  cy.fixture('business').then((business) => {
    cy.intercept(
      'GET',
      `**/api/v2/businesses/${business.identifier}?slim=true`,
      { business })
  })
})

Cypress.Commands.add('interceptBusinessContact', () => {
  cy.fixture('business').then((business) => {
    cy.fixture('businessContact').then((contact) => {
      cy.intercept(
        'GET',
        `**/api/v1/entities/${business.identifier}`,
        contact)
    })
  })
})

Cypress.Commands.add('visitBusinessDash', () => {
  sessionStorage.setItem('FAKE_CYPRESS_LOGIN', 'true')
  cy.intercept('GET', '**/api/v1/users/**/settings', { fixture: 'settings.json' }).as('getSettings')
  cy.intercept(
    'REPORT',
    'https://app.launchdarkly.com/sdk/evalx/**/context',
    { fixture: 'ldarklyContext.json' }
  ).as('getLdarklyContext')
  cy.intercept('GET', '**/api/v1/orgs/**/products*', { fixture: 'products.json' }).as('getProducts')
  cy.interceptBusinessContact().as('getBusinessContact')
  cy.interceptBusinessSlim().as('getBusinessSlim')
  cy.visit('')
  cy.wait(['@getSettings', '@getProducts', '@getBusinessContact', '@getBusinessSlim'])
  cy.injectAxe()
})

Cypress.Commands.add('visitBusinessDashAuthError', () => {
  sessionStorage.setItem('FAKE_CYPRESS_LOGIN', 'true')
  cy.intercept('GET', '**/api/v1/users/**/settings', { statusCode: 500, body: {} }).as('getSettingsError')
  cy.intercept(
    'REPORT',
    'https://app.launchdarkly.com/sdk/evalx/**/context',
    { fixture: 'ldarklyContext.json' }
  ).as('getLdarklyContext')
  cy.interceptBusinessContact().as('getBusinessContact')
  cy.interceptBusinessSlim().as('getBusinessSlim')
  cy.visit('')
  cy.wait(['@getSettingsError'])
  cy.injectAxe()
})