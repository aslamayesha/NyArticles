describe('MostPopularNews Component', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Ensure your app is running on this URL
  });

  it('should render loading state when data is being fetched', () => {
    // Intercept the API request to simulate loading
    cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*', {
      delay: 5000, // Simulate a delay
      statusCode: 200,
      body: [], // You can mock the empty response here
    }).as('fetchArticles');

    // Assert that the "Loading..." text is shown while waiting for the response
    cy.get('p.text-center').contains('Loading...');
  });
  
  it('should navigate to article detail page on clicking Read More', () => {
    // Mock a successful API response with mock article data
    cy.intercept('GET', '/svc/mostpopular/v2/viewed/1.json*', {
      statusCode: 200,
      body: {
        results: [
          {
            id: '1',
            title: 'Popular News Article 1',
            byline: 'By Author 1',
            abstract: 'This is an abstract of the article 1.',
            media: [
              {
                'media-metadata': [
                  {},
                  {},
                  { url: 'https://via.placeholder.com/440x293' },
                ],
              },
            ],
          },
        ],
      },
    }).as('fetchArticles');

    // Visit the landing page where the MostPopularNews component is rendered
    cy.visit('/'); // Adjust URL if needed

    // Wait for the API call to finish
    cy.wait('@fetchArticles');

    // Click on the "Read More" link
    cy.get('a').contains('Read More').click();

    // Verify that the URL changes to the article detail page
    cy.url().should('include', '/article/1'); // Ensure the URL includes the article id
  });
});
