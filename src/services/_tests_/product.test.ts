import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProduct } from '../product'; // adjust path if needed

const mockResponse = {
  products: [{ id: 1, title: 'Test Product' }],
  total: 1,
  limit: 10,
  skip: 0,
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getProduct', () => {
  it('fetches product list successfully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const result = await getProduct(10, 0, 'test');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products/search?q=test&limit=10&skip=0')
    );
  });

  it('returns fallback response on fetch failure', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    );

    const result = await getProduct(10, 0, 'fail');
    expect(result).toEqual({
      products: [],
      total: 0,
      limit: 10,
      skip: 0,
    });
  });

  it('returns fallback response on fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    const result = await getProduct(5, 2, 'error');
    expect(result).toEqual({
      products: [],
      total: 0,
      limit: 5,
      skip: 2,
    });
  });
});
