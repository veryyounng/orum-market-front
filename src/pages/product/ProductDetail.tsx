import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, IUserStore } from '../../type';
import { api } from '../../api/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useUserStore } from '../../lib/store';
import { BreadcrumbsNavBar } from '../../components/BreadcrumbsNavBar';
import useAddToCart from '../../hooks/useAddToCart';
import VerifiedIcon from '@mui/icons-material/Verified';

import { QUALITY } from '../../constants';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { isLoggedIn } = useUserStore() as IUserStore;

  const getQualityName = (value) => {
    const quality = QUALITY.find((quality) => quality.value === value);
    return quality ? quality.name : 'Unknown';
  };

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
    <Box sx={{ p: 4, mb: 5 }}>
      {product && (
        <Container>
          <Grid container spacing={2}>
            <Grid item sm={12} md={8}>
              <BreadcrumbsNavBar />
              <ProductImageGallery images={product.mainImages} />
            </Grid>
            <Grid item sm={12} md={4}>
              <ProductDetailsCard
                product={product}
                getQualityName={getQualityName}
              />
              <Typography variant="h5" gutterBottom component="h2" m={3}>
                상품 설명
              </Typography>
              <Typography
                paragraph
                dangerouslySetInnerHTML={{ __html: product.content }}
                sx={{ fontSize: '1rem', color: 'text.secondary', margin: 3 }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
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
      sx={{
        margin: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
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

const ProductDetailsCard = ({
  product,
  getQualityName,
}: {
  product: IProduct;
}) => {
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

  const generateQualityIcons = (value) => {
    const qualityIndex = QUALITY.findIndex(
      (quality) => quality.value === value,
    );
    return [...Array(qualityIndex + 1)].map((_, index) => (
      <VerifiedIcon key={index} />
    ));
  };

  return (
    <Card
      sx={{
        maxWidth: '100%',
        boxShadow: 0,
        mt: 3,
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <CardContent>
        {/* 제목 태그 */}
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Stack direction="row" spacing={1} my={2}>
          <Chip label="#캠프라인" variant="outlined" />
          <Chip label="#풀박" variant="outlined" />
        </Stack>

        {/* 가격 적립금 */}
        <Typography variant="h6" gutterBottom>
          {product.price.toLocaleString('ko-KR')} 원
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          적립포인트 {(product.price / 100).toLocaleString('ko-KR')}M
        </Typography>

        {/* 배송료 */}
        {/* <Divider sx={{ my: 1 }} /> */}
        <Stack direction="row" alignItems="center" spacing={2} my={3}>
          <Box
            sx={{
              width: '70px',
              textAlign: 'left',
              mb: 0,
            }}
          >
            <Typography variant="body2" fontWeight={800}>
              배송료
            </Typography>
          </Box>
          <Typography variant="body2">
            {product.shippingFees === 0
              ? '무료배송'
              : `${product.shippingFees.toLocaleString('ko-KR')} 원`}
          </Typography>
        </Stack>
        {/* <Divider sx={{ my: 1 }} /> */}

        {/* 상품 등급 */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ width: '70px', textAlign: 'left' }}>
            <Typography variant="body2" fontWeight={800} component="legend">
              상품 품질
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {generateQualityIcons(product.extra.sort)}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={700}
            sx={{ ml: 1 }}
          >
            {getQualityName(product.extra.sort)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {` (하<중<상<최상)`}
          </Typography>
        </Stack>

        {/* <Divider sx={{ my: 1 }} /> */}

        {/* 수량 버튼 */}
        {/* <Box my={2}>
          <Typography variant="subtitle1">수량</Typography>
          <OutlinedInput
            id="outlined-adornment-quantity"
            value={product.quantity}
            startAdornment={
              <InputAdornment position="start">
                <IconButton>
                  <RemoveIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box> */}

        {/* 구매 장바구니 북마크 버튼 */}
        <Stack spacing={2} direction="column" mt={5}>
          <Button variant="contained" onClick={perchaseProduct} fullWidth>
            바로구매
          </Button>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
              borderRadius: '5px',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ShoppingCartOutlinedIcon />}
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={() => addProductToCart(product)}
            >
              장바구니
            </Button>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => addToWishlist(product)}
              color={liked ? 'primary' : 'default'}
            >
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
