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

  cy.intercept('https://newsapi.org/v2/top-headlines/?country=us&q=apple', {
    statusCode: 200,
    fixture: 'search-apple',
  }).as('Search Keyword "Apple"');

  cy.intercept('https://newsapi.org/v2/top-headlines/?country=us&source=cnn', {
    statusCode: 200,
    fixture: 'search-cnn',
  }).as('Search Source "CNN"');

  cy.visit('localhost:5173/');
});

describe('Load the search bar', () => {
  it('opens the custom search on user click', () => {
    cy.get('#nav-secondary').should('not.be.visible');
    cy.get('.search-icon').click();
    cy.get('#nav-secondary').should('be.visible');
  });

  it('should load all search components', () => {
    cy.get('.search-icon').click();
    cy.get('#nav-secondary > p').should('contain', 'Custom Search');
    cy.get('input[placeholder="Search Keywords"]').should('exist');
    cy.get('[name="category"] option:selected').should('have.value', '');
    cy.get('[name="source"] option:selected').should('have.value', '');
    cy.get('button').should('contain', 'Search');
  });
});

describe('Use custom search', () => {
  it('should search by keyword', () => {
    cy.get('.search-icon').click();
    cy.get('input[placeholder="Search Keywords"]').type('apple');
    cy.get('button').click();
    cy.get('h2').should('contain', 'search results');
    cy.get('h3').should('contain', 'The USB-C Apple Pencil is cheaper than ever');
  });

  it('should search by category', () => {
    cy.get('.search-icon').click();
    cy.get('[name="category"]').select('business');
    cy.get('button').click();
    cy.get('h2').should('contain', 'search results');
    cy.get('h3').should('contain', 'Port workers from Maine to Texas');
  });

  it('should search by source', () => {
    cy.get('.search-icon').click();
    cy.get('[name="source"]').select('cnn');
    cy.get('button').click();
    cy.get('h2').should('contain', 'search results');
    cy.get('h3').should('contain', 'Earth Officially Has a Second Moon');
  });
});
