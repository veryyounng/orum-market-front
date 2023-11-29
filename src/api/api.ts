import ProductCreate from '../components/seller/ProductCreate';
import { IProduct } from './../type/index';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const data = {
  price: 22000,
  shippingFees: 3000,
  show: true,
  active: true,
  name: 'ZOZOFO 테이블 게임 축구 보드 사커 게임기 보드게임 2인경기 완구 가족모임 미니 월드컵 스포츠 어린이 크리스마스 선물 생일 선물',
  mainImages: ['/uploads/sample-janngu.jpg'],
  content:
    '<div class="product-detail"><p>ZOZOFO 테이블 게임 축구 보드 사커 게임기 보드게임 2인경기 완구 가족모임 미니 월드컵 스포츠 어린이 크리스마스 선물 생일 선물 상세 설명</p></div>',
  createdAt: '2023.10.12 12:34:56',
  updatedAt: '2023.10.12 12:34:56',
  extra: {
    isNew: true,
    isBest: true,
    category: ['PC02', 'PC0201'],
    quantity: 600,
    buyQuantity: 190,
    order: 7,
  },
};
// api 함수 정의
export const api = {
  signUp: (userData: any) => axiosInstance.post('/users/', userData),
  checkEmail: (email: string) =>
    axiosInstance.get('/users/email', { params: { email } }),
  signIn: (credentials: any) => axiosInstance.post('/users/login', credentials),
  getProductList: () => axiosInstance.get('/products'),
  getProduct: (id: string) => axiosInstance.get(`/products/${id}`),
  searchProducts: (keyword: string) =>
    axiosInstance.get('/products', { params: { keyword } }),
  createProduct: (productData: any) =>
    axiosInstance.post('/seller/products/', {
      ...data,
      price: productData.price,
      shippingFees: productData.shippingFees,
      name: 'productData.title',
      content: 'productData.content',
    }),
};
