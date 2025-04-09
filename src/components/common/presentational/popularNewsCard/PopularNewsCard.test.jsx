import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PopularNewsCard from './PopularNewsCard';

const mockArticle = {
    id: 123,
    title: 'Test Title',
    byline: 'By John Doe',
    abstract: 'This is a test abstract for the article.'
};

const imageUrl = 'https://example.com/image.jpg';

describe('PopularNewsCard', () => {
    it('renders the article title, byline, and abstract', () => {
        render(
            <MemoryRouter>
                <PopularNewsCard article={mockArticle} imageUrl={imageUrl} />
            </MemoryRouter>
        );

        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
        expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
        expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
    });

    it('renders the article image with correct alt text', () => {
        render(
            <MemoryRouter>
                <PopularNewsCard article={mockArticle} imageUrl={imageUrl} />
            </MemoryRouter>
        );

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', imageUrl);
        expect(image).toHaveAttribute('alt', mockArticle.title);
    });

    it('renders the "Read More" link with correct href', () => {
        render(
            <MemoryRouter>
                <PopularNewsCard article={mockArticle} imageUrl={imageUrl} />
            </MemoryRouter>
        );

        const link = screen.getByText(/read more/i);
        expect(link).toHaveAttribute('href', `/article/${mockArticle.id}`);
    });
});
