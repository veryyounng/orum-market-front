import ProductCard from './ProductCard';
import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  Typography,
} from '@mui/material';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          padding: '0px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={toggleSidebar} variant="outlined" color="inherit">
          {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </Button>
      </Box>

      <StickyNavbar
        totalProducts={sortedProducts.length}
        handleSort={setCurrentSortOrder}
        handleDisplayChange={handleDisplayChange}
        handleToggel={toggleSidebar}
      />
      <Box sx={{ marginTop: '50px', maxWidth: '100%', paddingX: '50px' }}>
        <Grid container spacing={2}>
          {/* Conditional Sidebar Grid */}
          {isSidebarOpen && (
            <Grid item xs={3}>
              {/* Sidebar Contents */}
              <Box sx={{ width: 240, position: 'fixed' }}>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
                <Typography>SideBar Content</Typography>
              </Box>
            </Grid>
          )}

          {/* Products Grid */}
          <Grid item xs={isSidebarOpen ? 9 : 12}>
            <Grid container spacing={2}>
              {/* 상품 카드 */}
              {sortedProducts.map((product: IProduct) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
              {/* 상품 없을 때 */}
              {sortedProducts.length === 0 && (
                <Typography>찾으시는 상품이 없습니다.</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
