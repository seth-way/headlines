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

  cy.visit('localhost:5173/');
});

describe('Get more headlines from a category', () => {
  it('should get more headlines on category click', () => {
    cy.get('h2').eq(1).click();
    cy.get('h3').first().should('contain', 'Port workers from Maine to Texas')
    cy.get('h3').eq(1).should('contain', 'Free covid tests by mail program revived');
  });

  it('should get different headlines on different category click', () => {
    cy.get('h2').eq(2).click();
    cy.get('h3').first().should('contain', 'Judge to consider')
    cy.get('h3').eq(1).should('contain', 'Agatha All Along');
  })
})
