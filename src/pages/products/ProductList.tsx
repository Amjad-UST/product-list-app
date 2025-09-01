import type { Product } from '../../types/product';
import { getProduct } from '../../services/product';
import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../components/core/Card';
import SearchBar from '../../components/core/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import Pagination from '../../components/core/Pagination';

export default function ProductList(): React.ReactNode {
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const limit = 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    setSkip(0);
    setTotalProducts(0);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const response: { total?: number; products?: Product[] } | null = await getProduct(limit, skip, debouncedSearchTerm);
    if (response) {
      if (response.total) {
        setTotalProducts(response.total);
      }
      if (response.products) {
        setProductList(response.products);
      }
    } else {
      setSkip(0);
      setTotalProducts(0);
      setProductList([]);
    }
    setLoading(false);
  }, [debouncedSearchTerm, limit, skip]);

  useEffect(() => {
    fetchProducts();
  }, [skip, limit, fetchProducts, debouncedSearchTerm]);

  return (
    <>
      <div className='header'>
        <h1 className='page-title'>Product List</h1>
        <div>
          <span className='badge' data-testid="total-products">Total Products: {totalProducts}</span>
          <span className='badge'>Current Page: {Math.floor(skip / limit) + 1}</span>
        </div>
      </div>
      <div className='container'>
        <SearchBar handleInputChange={handleInputChange} searchTerm={searchTerm} />
        {loading ? <p data-testid="loading">Loading...</p>
          :
          <>
            {productList.length > 0 ? productList.map((product) => (
              <Card key={product.id} product={product} data-testid={`product-card-${product.id}`}/>
            )) : <p data-testid="no-products">No products available</p>}
          </>
        }
      </div>
      <Pagination
        totalPages={Math.ceil(totalProducts / limit)}
        currentPage={Math.floor(skip / limit) + 1}
        onPageChange={(page: number) => setSkip((page - 1) * limit)}
      />
    </>
  )
}
