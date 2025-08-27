import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '../ProductList';
import * as productService from '../../../services/product';

const mockProducts = [
  { id: 1, title: 'Product A', description: 'Description A', price: 100, thumbnail: 'img-a.jpg' },
  { id: 2, title: 'Product B', description: 'Description B', price: 200, thumbnail: 'img-b.jpg' },
];

beforeEach(() => {
  vi.resetAllMocks();
});

describe('ProductList Component', () => {
  it('renders product list from API', async () => {
    vi.spyOn(productService, 'getProduct').mockResolvedValue({
      products: mockProducts,
      total: 2,
      limit: 10,
      skip: 0,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
      expect(screen.getByText('Total Products: 2')).toBeInTheDocument();
    });
  });

  it('shows fallback when no products are returned', async () => {
    vi.spyOn(productService, 'getProduct').mockResolvedValue({
      products: [],
      total: 0,
      limit: 10,
      skip: 0,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('No products available')).toBeInTheDocument();
    });
  });

  it('updates search term and resets pagination', async () => {
    vi.spyOn(productService, 'getProduct').mockResolvedValue({
      products: mockProducts,
      total: 2,
      limit: 10,
      skip: 0,
    });

    render(<ProductList />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'phone' } });

    await waitFor(() => {
      expect(input).toHaveValue('phone');
      expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    });
  });

  it('handles pagination buttons', async () => {
    vi.spyOn(productService, 'getProduct').mockResolvedValue({
      products: mockProducts,
      total: 20,
      limit: 10,
      skip: 0,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Current Page: 2')).toBeInTheDocument();
    });

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    });
  });
});
