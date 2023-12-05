import { useEffect, useState } from 'react';
import { ICategoryPreview, IProduct } from '../../type';
import { api } from '../../api/api';
import {
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Slider,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CATEGORY } from '../../constants/index';
import { SearchSection } from '../../components/search/SearchSection';

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;
      if (activeCategory) {
        const categoryData = CATEGORY.depth2.find(
          (item) => item.dbName === activeCategory,
        );
        const categoryCode = categoryData ? categoryData.dbCode : null;
        if (categoryCode) {
          // Construct query considering both category and price range
          const extraQuery = encodeURIComponent(
            JSON.stringify({
              'extra.category': ['H01', categoryCode],
              price: { $gte: priceRange[0], $lte: priceRange[1] },
            }),
          );
          response = await api.getProductListByCategory(extraQuery);
        }
      } else {
        // Fetch products based on price range if no category is selected
        response = await api.searchProducts('', priceRange[0], priceRange[1]);
      }
      setProducts(response.data.item);
      setLoading(false);
    } catch (error) {
      console.error('상품 목록을 가져오는데 실패했습니다', error);
      setLoading(false);
    }
  };

  const fetchPrice = async () => {
    try {
      setLoading(true);
      let response = await api.searchProducts('', priceRange[0], priceRange[1]);
      setProducts(response.data.item);
      setLoading(false);
    } catch (error) {
      console.error('상품 목록을 가져오는데 실패했습니다', error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.searchProducts(
        searchQuery,
        priceRange[0],
        priceRange[1],
      );
      setProducts(response.data.item);
    } catch (error) {
      console.error('Search failed', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {CATEGORY.depth2.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryChange(category.dbName)}
          >
            {category.name}
          </Button>
        ))}
      </Box>

      <Box sx={{ width: '80%', marginTop: 2 }}>
        <form onSubmit={handleSearch}>
          <TextField
            label="검색어"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            검색
          </Button>
        </form>
        <Slider
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={200000}
          step={5000}
          marks
        />
        <Typography>
          가격 범위: {priceRange[0]}원 - {priceRange[1]}원
        </Typography>
        <Button variant="contained" onClick={fetchPrice} sx={{ marginTop: 2 }}>
          검색
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom my={10}>
        {activeCategory ? activeCategory : '전체 상품'}
      </Typography>
      {products.length === 0 && <div>해당하는 상품이 없습니다.</div>}
      {products.length > 0 && (
        <Grid container spacing={2}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

const CategoryPreview = ({ category, products }: ICategoryPreview) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          width: '100%',
        }}
      >
        <h1>{category.dbName}</h1>
        <Button component={Link} to={`/category/${category.dbName}`}>
          더보기
        </Button>
      </Box>

      {products.length === 0 && <div>제품이 없습니다.</div>}
      {products.length > 0 && (
        <Grid container spacing={2}>
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};
