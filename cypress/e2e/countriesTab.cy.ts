describe('Countries Tab', () => {
  it('loads header', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.get('h1').should('have.text', data.header);
    });
  });

  it('loads reset button', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.get('.reset').should('exist');
    });
  });

  it('loads alert message', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.get('.reset').click();
      cy.get('.alert').should('exist');
    });
  });

  it('loads country button text', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.contains(data.country).click();
    });
  });

  it('loads country data', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/assets/data/*',
      },
      []
    ).as('getCountryData');
    cy.visit('/');
    cy.wait('@getCountryData').then((data) => {
      assert.isNotNull(data, 'API has data');
    });
  });
});
