import { useNavigate } from 'react-router-dom';
import { useCartStore, useUserStore } from '../lib/store';
import { IProduct } from '../type';

const useAddToCart = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserStore() as { isLoggedIn: boolean };
  const { items, addToCart } = useCartStore() as {
    items: IProduct[];
    addToCart: Function;
  };

  const addProductToCart = (product: IProduct) => {
    if (!isLoggedIn) {
      const confirmLogin = confirm(
        '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
      );
      if (confirmLogin) {
        navigate('/sign-in');
      }
      return;
    }

    const productAlreadyInCart = items.some((item) => item._id === product._id);

    if (productAlreadyInCart) {
      alert('이미 장바구니에 있는 상품입니다.');
      return;
    }

    const confirmAddToCart = confirm('장바구니에 추가하시겠습니까?');
    if (confirmAddToCart) {
      addToCart({ ...product, quantity: 1 });
      const navigateToCart = confirm(
        '장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?',
      );
      if (navigateToCart) {
        navigate('/cart');
      }
    }
  };

  return addProductToCart;
};

export default useAddToCart;
