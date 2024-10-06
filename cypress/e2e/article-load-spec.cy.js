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

describe('Load an article', () => {
  it('should load an article on user click', () => {
    cy.get('article').first().click();
    cy.get('#featured-article')
      .get('h2')
      .should(
        'contain',
        '“NC Lt. Gov. Mark Robinson was treated for second-degree burns following incident at campaign event - CNN”'
      );
    cy.get('img')
      .should('have.attr', 'src')
      .should(
        'include',
        'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2158620606.jpg?c=16x9&q=w_800,c_fill'
      );

    cy.get('p.content').should(
      'contain',
      'North Carolina Lt. Gov. Mark Robinson was treated for second-degree burns at Northern Regional Hospital following an incident at a campaign event in Mount Airy on Friday night'
    );

    cy.get('#featured-article > :nth-child(5)').should(
      'contain',
      'Read the entire article on'
    );

    cy.get('a')
      .should('have.attr', 'href')
      .should(
        'include',
        'https://www.cnn.com/2024/09/27/politics/mark-robinson-hospitalized/index.html'
      );
  });

  it('should return home on title click', () => {
    cy.get('article').first().click();
    cy.get('#featured-article')
      .get('h2')
      .should(
        'contain',
        '“NC Lt. Gov. Mark Robinson was treated for second-degree burns following incident at campaign event - CNN”'
      );
    cy.get('h1').click();
    cy.get('h2').first().should('contain', 'top headlines');
  });
});
