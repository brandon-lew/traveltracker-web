describe('My List Tab', () => {
  it('returns country name listed after click on Countries tab', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.contains(data.country).click();
      cy.contains('My List').click();
      cy.get('.user__list li').should('have.text', data.country);
    });
  });

  it('loads country data', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/assets/data/*',
      },
      [],
    ).as('getCountryData');
    cy.visit('/');
    cy.contains('My List').click();
    cy.wait('@getCountryData').then((interception) => {
      assert.isNotNull(interception, 'API has data');
    });
  });
});
