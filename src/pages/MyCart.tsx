import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { ICartItem } from '../type';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function MyCart() {
  const { items, removeFromCart, clearCart } = useCartStore() as {
    items: ICartItem[];
    removeFromCart: (id: number) => void;
    clearCart: () => void;
  };

  console.log('장바구니 아이템', items);

  const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  });

  const totalCost = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Container sx={{ marginY: '50px' }}>
      <Typography variant="h4" fontWeight={700} mb={5}>
        장바구니
      </Typography>
      <Typography variant="body1">
        {items.length === 0 && <p>장바구니가 비었습니다.</p>}
        {items.length > 0 && (
          <p>장바구니에 {items.length} 개의 아이템이 있습니다.</p>
        )}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{ padding: '2rem' }}>
          {items.length > 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={clearCart}
                  variant="text"
                  color="info"
                  style={{ height: '56px' }}
                >
                  전체 삭제
                </Button>
              </Box>
              <Divider />
              <List>
                {items.map((item: ICartItem) => (
                  <ListItem key={item._id} divider>
                    {item.mainImages.length === 0 ? (
                      <img
                        src="/assets/no-image.jpg"
                        alt={item.name}
                        style={{ width: '100px', marginRight: '20px' }}
                      />
                    ) : (
                      <img
                        src={item.mainImages[0]?.path}
                        alt={item.name}
                        style={{ width: '100px', marginRight: '20px' }}
                      />
                    )}
                    <ListItemText>
                      <Typography variant="h6">{item.name}</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{ minWidth: '60px', fontWeight: '700' }}
                        textAlign={'right'}
                      >
                        {currencyFormatter.format(item.price)}
                      </Typography>
                      <IconButton onClick={() => removeFromCart(item._id)}>
                        <Button
                          type="button"
                          variant="text"
                          sx={{
                            color: '#000',
                          }}
                        >
                          <ClearIcon />
                          삭제
                        </Button>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" sx={{ my: 2, fontWeight: '800' }}>
                  총 금액: {currencyFormatter.format(totalCost)}
                </Typography>
                <Box sx={{ display: 'flex' }} gap={2}>
                  <Button
                    component={Link}
                    to="/checkout"
                    color="primary"
                    variant="outlined"
                    style={{ height: '56px' }}
                  >
                    구매하기
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      {/* <button onClick={clearCart}>Clear Cart</button>
      <Link to="/checkout">
      <button>Check Out</button>
    </Link> */}
    </Container>
  );
}
