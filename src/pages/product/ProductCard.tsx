import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { IProduct } from '../../type';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../../hooks/useAddToCart';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = useAddToCart();

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'grey.50',
      }}
    >
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.mainImages[0]}
          alt={product.name}
          sx={{ objectFit: 'cover', padding: '4px' }}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body1" color="blue">
          {product.price.toLocaleString()} 원
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          sx={{ marginLeft: '1rem' }}
          onClick={() => handleAddToCart(product)}
        >
          장바구니
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<PaymentIcon />}
          sx={{ marginRight: '1rem' }}
          onClick={() => handleAddToCart(product)}
        >
          주문하기
        </Button>
      </Box>
    </Card>
  );
}
