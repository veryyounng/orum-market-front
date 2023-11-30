import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  ToggleButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

const dummySellerProductList = [
  {
    item: {
      _id: 4,
      seller_id: 7,
      price: 8000,
      shippingFees: 3500,
      show: true,
      active: true,
      name: '등산용 양말',
      images: 'imiageURL',
      content: '내용',
      createdAt: '2023-11-29',
      updatedAt: '2023-11-29',
      extra: {
        category: ['H01', 'H0105'],
        quantity: 1,
        buyQuantity: 1,
        order: 0,
      },
    },
  },
  {
    item: {
      _id: 6,
      seller_id: 7,
      price: 35000,
      shippingFees: 3500,
      show: true,
      active: true,
      name: '바람막이',
      images: 'imiageURL',
      content: '내용',
      createdAt: '2023-11-29',
      updatedAt: '2023-11-29',
      extra: {
        category: ['H01', 'H0101'],
        quantity: 1,
        buyQuantity: 1,
        order: 0,
      },
    },
  },
  {
    item: {
      _id: 8,
      seller_id: 5,
      price: 20000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: '등산용 바지',
      images: 'imiageURL',
      content: '내용',
      createdAt: '2023-11-29',
      updatedAt: '2023-11-29',
      extra: {
        category: ['H01', 'H0102'],
        quantity: 1,
        buyQuantity: 1,
        order: 0,
      },
    },
  },
  {
    item: {
      _id: 10,
      seller_id: 7,
      price: 40000,
      shippingFees: 3500,
      show: true,
      active: true,
      name: '등산용 배낭',
      images: 'imiageURL',
      content: '내용',
      createdAt: '2023-11-30',
      updatedAt: '2023-11-30',
      extra: {
        category: ['H01', 'H0105'],
        quantity: 1,
        buyQuantity: 1,
        order: 0,
      },
    },
  },
];

export default function ProductManager() {
  return <div>ProductManager</div>;
}
