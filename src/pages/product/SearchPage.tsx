import ProductCard from './ProductCard';
import { Box, Container, Grid, Typography } from '@mui/material';
import { SearchSection } from '../../components/search/SearchSection';
import { useSearchStore } from '../../lib/store';
import StickyNavbar from '../../components/NavigationBar';
import { useSort } from '../../hooks/\buseSort';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { IProduct } from '../../type';

export function SearchPage() {
  const { searchResult, setSearchResult } = useSearchStore();
  const [sortedProducts, setCurrentSortOrder] = useSort(
    searchResult,
    '최신순',
  ) as any;
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await api.getProductList();
        setSearchResult(response.data.item);
      } catch (error) {
        console.error('상품 검색 실패:', error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleDisplayChange = (value: number) => {
    setItemsPerPage(value);
  };

  // 아이템 사이즈를 계산하는 함수
  const getItemSize = () => {
    if (itemsPerPage === 8) return { xs: 6, sm: 3, md: 2, lg: 2, xl: 2 };
    return { xs: 12, sm: 6, md: 4, lg: 4, xl: 4 };
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, padding: '0px' }}>
      <SearchSection />
      <StickyNavbar
        totalProducts={sortedProducts.length}
        handleSort={setCurrentSortOrder}
        handleDisplayChange={handleDisplayChange}
      />
      <Container>
        <Grid container spacing={2}>
          {sortedProducts.map((product: IProduct) => (
            <Grid
              item
              {...getItemSize()}
              key={product._id}
              sx={{ transition: 'all 0.5s ease' }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
          {sortedProducts.length === 0 && (
            <Typography>검색 결과가 없습니다.</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
