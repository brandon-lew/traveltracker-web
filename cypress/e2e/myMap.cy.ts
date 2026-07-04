describe('My Map Tab', () => {
  it('loads Google Map element', () => {
    cy.visit('/');
    cy.contains('My Map').click();
    cy.get('google-map');
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
    cy.wait('@getCountryData').then((data) => {
      assert.isNotNull(data, 'API has data');
    });
  });
});
