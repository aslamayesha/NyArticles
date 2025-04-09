// src/components/Navbar.test.jsx
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar'; // Adjust path if needed

describe('Navbar Component', () => {
    it('renders navbar correctly', () => {
        render(<Navbar />);

        // Check if the "Popular News" text is rendered
        const logoText = screen.getByText(/Popular News/i);
        expect(logoText).toBeInTheDocument();
    });

    it('has the correct classes for styling', () => {
        render(<Navbar />);

        // Check if the navbar has the correct background color class
        const navbar = screen.getByRole('navigation');
        expect(navbar).toHaveClass('bg-blue-800');

        // Check if the logo section has the correct classes
        const logoSection = screen.getByText(/Popular News/i).closest('div');
        expect(logoSection).toHaveClass('flex items-center space-x-2');
    });
});
