const categories = [
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const date = new Date(Date.now());

const dateNow = date.toLocaleString('en-US', dateOptions);

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

describe('Load the Home Page', () => {
  it('should load the page', () => {
    cy.get('h1').should('contain', 'The Keuka Corrier');
    cy.get('#date-display').should('contain', dateNow);
    cy.get('h2').first().should('contain', 'top headlines');
    cy.get('h2').first().next().find('article').should('have.length', 8);

    for (let i = 0; i < categories.length; i += 1) {
      cy.get('h2')
        .eq(i + 1)
        .should('contain', categories[i]);
      cy.get('h2')
        .eq(i + 1)
        .next()
        .find('article')
        .should('have.length', 4);
    }

    cy.get(
      ':nth-child(1) > :nth-child(2) > :nth-child(1) > .card-header > .headline-wrapper > h3'
    ).should('contain', 'NC Lt. Gov. Mark Robinson');

    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > p').should(
      'contain',
      'North Carolina Lt. Gov. Mark Robinson was treated for second-degree burns'
    );
  });

  it('should take the user to the article view on click', () => {
    cy.get('#home > :nth-child(1) > :nth-child(2) > :nth-child(1)').click();
    cy.get('#featured-article').should('exist');
  })
});
