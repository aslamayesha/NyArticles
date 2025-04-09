import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MostPopularNews from './MostPopularNews';
import { fetchArticles } from 'src/helpers/utils/apiHelpers';

// Mock the dependencies
vi.mock('src/helpers/utils/apiHelpers', () => ({
  fetchArticles: vi.fn(),
}));

// Mock the PopularNewsCard component
vi.mock('../../presentational/popularNewsCard/PopularNewsCard', () => ({
  default: ({ article, imageUrl }) => (
    <div data-testid={`news-card-${article.id}`} className="news-card-mock">
      <p data-testid="title">{article.title}</p>
      <img data-testid="image" src={imageUrl} alt="Article" />
    </div>
  ),
}));

describe('MostPopularNews Component', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it('should display loading state while fetching data', () => {
    // Setup fetch articles to return a promise that never resolves to simulate loading
    fetchArticles.mockReturnValue(new Promise(() => {}));
    
    render(
      <QueryClientProvider client={queryClient}>
        <MostPopularNews />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message when fetch fails', async () => {
    // Setup fetch articles to reject
    fetchArticles.mockRejectedValue(new Error('Failed to fetch'));
    
    render(
      <QueryClientProvider client={queryClient}>
        <MostPopularNews />
      </QueryClientProvider>
    );
    
    // Wait for the error message to appear
    expect(await screen.findByText('Error fetching data')).toBeInTheDocument();
  });

  it('should render articles properly when data is fetched successfully', async () => {
    // Mock data for successful response
    const mockArticles = [
      {
        id: '1',
        title: 'Test Article 1',
        media: [
          {
            'media-metadata': [
              { url: 'small-image.jpg' },
              { url: 'medium-image.jpg' },
              { url: 'large-image.jpg' }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'Test Article 2',
        media: []
      }
    ];
    
    fetchArticles.mockResolvedValue(mockArticles);
    
    render(
      <QueryClientProvider client={queryClient}>
        <MostPopularNews />
      </QueryClientProvider>
    );
    
    // Check that the component title is rendered
    expect(await screen.findByText('Most Popular News')).toBeInTheDocument();
    
    // Check that the correct number of article cards are rendered
    expect(await screen.findByTestId('news-card-1')).toBeInTheDocument();
    expect(await screen.findByTestId('news-card-2')).toBeInTheDocument();
    
    // Verify the article with image renders with the correct image
    const article1 = screen.getByTestId('news-card-1');
    expect(article1.querySelector('[data-testid="title"]')).toHaveTextContent('Test Article 1');
    expect(article1.querySelector('[data-testid="image"]')).toHaveAttribute('src', 'large-image.jpg');
    
    // Verify the article without image renders with placeholder
    const article2 = screen.getByTestId('news-card-2');
    expect(article2.querySelector('[data-testid="title"]')).toHaveTextContent('Test Article 2');
    expect(article2.querySelector('[data-testid="image"]')).toHaveAttribute('src', 'https://via.placeholder.com/440x293?text=No+Image');
  });

  it('should handle empty data array', async () => {
    // Mock empty data
    fetchArticles.mockResolvedValue([]);
    
    render(
      <QueryClientProvider client={queryClient}>
        <MostPopularNews />
      </QueryClientProvider>
    );
    
    // Check that the heading is still rendered
    expect(await screen.findByText('Most Popular News')).toBeInTheDocument();
    
    // Verify no article cards are rendered (checking for absence)
    expect(screen.queryByTestId(/news-card/)).not.toBeInTheDocument();
  });
});