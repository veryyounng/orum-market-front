import { IProduct } from '../type';

export const initProductData: Partial<IProduct> = {
  name: '',
  price: 0,
  shippingFees: 0,
  show: true,
  active: true,
  mainImages: [],
  content: '',
  createdAt: '',
  updatedAt: '',
  extra: {
    isNew: true,
    isBest: true,
    category: ['H01', 'H0101'],
    sort: 0,
    quantity: 1,
    buyQuantity: 0,
    order: 0,
  },
};
