import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  ToggleButton,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

import { api } from '../../api/api';
import { IProduct } from '../../type';
import { CATEGORY } from '../../constants/index';

export default function SellerOrderList() {
  const _id = localStorage.getItem('_id');
  const { id } = useParams();

  const [productList, setProductList] = useState<IProduct[]>([]);
  const [sortedProductList, setSortedProductList] = useState<IProduct[]>([]);
  const [sortOrder, setSortOrder] = useState('최신순');
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    fetchSellerProduct();
  }, []);
  const fetchSellerProduct = async () => {
    try {
      const response = await api.getSellerProductInfo();
      console.log('상품데이터 조회', response);
      const getMatchItem = response.data.item.filter(
        (id: IProduct) => id.seller_id === Number(_id),
      );
      setProductList(getMatchItem);
    } catch (error) {
      console.log('판매 상품 조회 실패', error);
    }
  };
  return (
    <>
      <Link to={`/user/${_id}/product-create`}>
        <Button variant="contained">등록하기</Button>
      </Link>
    </>
  );
}
