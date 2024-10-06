const categories = [
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

beforeEach(() => {
  cy.intercept('https://newsapi.org/v2/top-headlines/?country=us', {
    statusCode: 200,
    fixture: 'general',
  }).as('Get General Headlines');

  categories.forEach(category => {
    cy.intercept(
      `https://newsapi.org/v2/top-headlines/?country=us&category=${category}`,
      { statusCode: 200, fixture: category }
    ).as(`Get ${category} Headlines`);
  });

  cy.intercept('https://newsapi.org/v2/top-headlines/?country=us&q=apple1', {
    statusCode: 200,
    fixture: 'search-no-results',
  }).as('Search Keyword "Apple" No Results');

  cy.intercept('https://newsapi.org/v2/top-headlines/?country=us&q=apple2', {
    statusCode: 500,
  }).as('Search Keyword "Apple" Error');

  cy.visit('localhost:5173/');
});

describe('Custom search sad paths', () => {
  it('should show a useful message if no results are found', () => {
    cy.get('.search-icon').click();
    cy.get('input[placeholder="Search Keywords"]').type('apple1');
    cy.get('button').click();
    cy.get('h2').should('contain', 'No Search Results');
    cy.get('p').should('contain', 'Widen your search criteria & try again.');
  });

  it('should display an error message if an error is returned', () => {
    cy.get('.search-icon').click();
    cy.get('input[placeholder="Search Keywords"]').type('apple2');
    cy.get('button').click();
    cy.get('h2').should('contain', 'Error: 500');
    cy.get('#error-message > p').should(
      'contain',
      'We sincerely apologize.Something went wrong'
    );
  });
});
