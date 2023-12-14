import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Typography,
  styled,
} from '@mui/material';

import { Link } from 'react-router-dom';

export default function BuyerRecentlyView() {
  const getData = localStorage.getItem('recentlyViewed');
  const viewItems = JSON.parse(getData).state.viewItems;

  return (
    <>
      <Container>
        {viewItems.map((product) => (
          <StyledCard key={product._id}>
            <CardActionArea component={Link} to={`/product/${product._id}`}>
              <ProductImage
                image={product.mainImages[0]}
                title={product.name}
              />
              <ProductDetails>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="h6" color="inherit" fontWeight={700}>
                  {product.price.toLocaleString()} 원
                </Typography>
              </ProductDetails>
            </CardActionArea>
            <ProductActions>
              <ShippingFee>
                <Typography variant="body2">
                  {product.shippingFees === 0
                    ? '무료배송'
                    : '배송료: ' + product.shippingFees.toLocaleString() + '원'}
                </Typography>
              </ShippingFee>
            </ProductActions>
          </StyledCard>
        ))}
      </Container>
    </>
  );
}

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const ProductImage = styled(CardMedia)({
  height: '200px',
  backgroundSize: 'cover',
  backgroundColor: 'grey.50',
});

const ProductDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '16px',
});

const ProductActions = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '8px',
});

const ShippingFee = styled(Box)({
  flexGrow: 1,
  padding: '0 8px',
});
