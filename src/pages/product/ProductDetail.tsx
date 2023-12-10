import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICartStore, IProduct, IUserStore } from '../../type';
import { api } from '../../api/api';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Snackbar,
  Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCartStore, useUserStore } from '../../lib/store';
import { BreadcrumbsNavBar } from '../../components/BreadcrumbsNavBar';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { isLoggedIn, logOut } = useUserStore() as IUserStore;

  useEffect(() => {
    fetchProduct();
    if (!isLoggedIn) {
      return;
    }
    fetchBookmark();
  }, []);

  const fetchBookmark = async () => {
    if (id) {
      try {
        const response = await api.getBookmark(Number(id));
        console.log('북마크 GET: ', response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    } else {
      console.log('id가 없습니다.');
    }
  };

  const fetchProduct = async () => {
    if (id) {
      try {
        const response = await api.getProduct(Number(id));
        setProduct(response.data.item);
      } catch (error) {
        console.error('API Error:', error);
      }
    } else {
      console.log('id가 없습니다.');
    }
  };

  if (!product) {
    return <Typography>상품이 없습니다.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      {product && (
        <Container>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <ProductImageGallery images={product.mainImages} />
            </Grid>
            <Grid item sm={12} md={6}>
              <BreadcrumbsNavBar />
              <ProductDetailsCard product={product} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom component="h2">
              상품 설명
            </Typography>
            <Typography
              paragraph
              dangerouslySetInnerHTML={{ __html: product.content }}
              sx={{ fontSize: '1rem', color: 'text.secondary' }}
            />
          </Grid>
        </Container>
      )}
    </Box>
  );
}

const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Display the selected image in a larger size */}
      <Box sx={{ marginBottom: 2 }}>
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: '100%', maxWidth: 500 }}
        />
      </Box>
      {/* List of all images */}
      <ImageList cols={3}>
        {images.map((image: string, index: number) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`Product ${index}`}
              loading="lazy"
              onClick={() => setSelectedImage(image)}
              style={{
                cursor: 'pointer',
                border: selectedImage === image ? '2px solid orange' : '',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

const ProductDetailsCard = ({ product }: { product: IProduct }) => {
  const { isLoggedIn } = useUserStore() as { isLoggedIn: boolean };
  const navigate = useNavigate();
  const { items } = useCartStore((state) => state) as ICartStore;
  const productAlreadyInCart = items.some((item) => item._id === product._id);
  const { addToCart } = useCartStore((state) => state) as ICartStore;
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishlistNotification, setWishlistNotification] = useState({
    open: false,
    message: '',
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWishlistNotification({ ...wishlistNotification, open: false });
  };

  function handleClick() {
    setLoading(true);
  }

  const handleNotLoggedIn = () => {
    const confirmLogin = confirm(
      '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
    );
    if (confirmLogin) {
      navigate('/sign-in');
    }
  };

  const addProductToCart = () => {
    if (!isLoggedIn) {
      handleNotLoggedIn();
    } else {
      if (productAlreadyInCart) {
        alert('이미 장바구니에 있는 상품입니다.');
        return;
      }
      addToCart({ ...product, quantity: 1 });
      const confirmAddToCart = confirm(
        '장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?',
      );
      if (confirmAddToCart) {
        navigate('/cart');
      }
    }
  };

  const perchaseProduct = () => {
    if (!isLoggedIn) {
      handleNotLoggedIn();
    } else {
      alert('결제 페이지로 이동합니다');
      navigate('/checkout', { state: { product } });
    }
  };

  const addToWishlist = (product) => {
    if (!isLoggedIn) {
      handleNotLoggedIn();
      return;
    }

    const isProductInWishlist = false;

    if (isProductInWishlist) {
      setWishlistNotification({
        open: true,
        message: '상품이 관심 목록에서 제거되었습니다.',
      });
    } else {
      setWishlistNotification({
        open: true,
        message: '상품이 관심 목록에 추가되었습니다.',
      });
    }

    setLiked((prev) => !prev);
  };

  return (
    <Card
      sx={{ maxWidth: '100%', boxShadow: 0, border: '1px solid #e0e0e0', m: 2 }}
    >
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Seller ID: {product.seller_id}
          <br />
          Product ID: {product._id}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6">
          {product.price.toLocaleString('ko-KR')} 원
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Typography variant="body2">
            4.0
            <FavoriteBorderIcon fontSize="small" />
          </Typography>
          <Button size="small" onClick={addToWishlist}>
            Wishlist
          </Button>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          size="large"
          variant="outlined"
          color="inherit"
          onClick={perchaseProduct}
          size="medium"
        >
          바로구매
        </Button>
        <Button
          size="large"
          variant="outlined"
          color="inherit"
          onClick={addProductToCart}
          size="medium"
        >
          장바구니
        </Button>
        <IconButton onClick={() => addToWishlist(product)}>
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Snackbar
          open={wishlistNotification.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            elevation={6}
            variant="filled"
          >
            {wishlistNotification.message}
          </MuiAlert>
        </Snackbar>
      </CardActions>
    </Card>
  );
};
