import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, IUserStore } from '../../type';
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
import { useUserStore } from '../../lib/store';
import { BreadcrumbsNavBar } from '../../components/BreadcrumbsNavBar';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { isLoggedIn } = useUserStore() as IUserStore;

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
      <Box sx={{ mb: 4, ml: 1 }}>
        <BreadcrumbsNavBar />
      </Box>
      {product && (
        <Container>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <ProductImageGallery images={product.mainImages} />
            </Grid>
            <Grid item sm={12} md={6}>
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
  const imageContainerStyle = {
    overflow: 'hidden', // 컨테이너 밖으로 넘어가는 이미지를 숨김
    position: 'relative',
    width: '100%',
    height: '100%',
    margin: '10px 10px',
  };
  const imageListStyle = {
    width: '100%', // 이미지 리스트의 전체 너비
    height: '100%', // 이미지 리스트의 최대 높이
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ImageList sx={imageListStyle} cols={3} gap={9}>
        {images.map((image: string, index: number) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`Product ${index}`}
              loading="lazy"
              onClick={() => setSelectedImage(image)}
              style={{
                borderRadius: '5px',
                cursor: 'pointer',
                border: selectedImage === image ? '2px solid #EF5B2A' : '',
                // 선택 안된 것들은 검은색 레이어를 덮어줌
                filter: selectedImage === image ? '' : 'brightness(0.5)',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={imageContainerStyle}>
        <img
          src={selectedImage}
          alt="Selected-Image"
          style={{
            borderRadius: '5px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

const ProductDetailsCard = ({ product }: { product: IProduct }) => {
  const { isLoggedIn } = useUserStore() as { isLoggedIn: boolean };
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [wishlistNotification, setWishlistNotification] = useState({
    open: false,
    message: '',
  });

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setWishlistNotification({ ...wishlistNotification, open: false });
  };

  const handleNotLoggedIn = () => {
    const confirmLogin = confirm(
      '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
    );
    if (confirmLogin) {
      navigate('/sign-in');
    }
  };

  const addProductToCart = useAddToCart();

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
          onClick={() => addProductToCart(product)}
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
