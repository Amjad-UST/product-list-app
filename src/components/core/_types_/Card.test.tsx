import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'This is a long description that should be truncated.',
  price: 99.99,
  thumbnail: 'https://via.placeholder.com/150',
};

describe('Card Component', () => {
  it('renders product title', () => {
    render(<Card product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product image with correct src and alt', () => {
    render(<Card product={mockProduct} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.thumbnail);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });

  it('renders truncated description', () => {
    render(<Card product={mockProduct} />);
    const truncated = mockProduct.description.slice(0, 30) + '...';
    expect(screen.getByText(truncated)).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<Card product={mockProduct} />);
    expect(screen.getByText(`Price: $${mockProduct.price}`)).toBeInTheDocument();
  });
});
