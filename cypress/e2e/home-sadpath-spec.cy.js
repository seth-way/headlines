const categories = ['business', 'entertainment', 'health', 'science', 'sports'];

beforeEach(() => {
  cy.visit('http://localhost:5173/');

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

  cy.intercept(
    'https://newsapi.org/v2/top-headlines/?country=us&category=technology',
    { statusCode: 500 }
  );

  cy.visit('localhost:5173/');
});

describe('Home Page Error Handling', () => {
  it('should display an appropriate error when api call fails', () => {
    
  })
});
