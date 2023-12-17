import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { api } from '../../api/api';
import { IProduct, IOrderItem } from '../../type';
import { CATEGORY, QUALITY, ORDER_STATE } from '../../constants/index';
import { Link } from 'react-router-dom';

export default function ProductManager() {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [sortedProductList, setSortedProductList] = useState<IProduct[]>([]);
  const [sortOrder, setSortOrder] = useState('최신순');
  const [orderList, setOrderList] = useState<IOrderItem[]>([]);
  const [productOrderStates, setProductOrderStates] = useState<
    Record<string, string>
  >({});

  // 날짜 변환 함수
  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  }

  useEffect(() => {
    const getOrderState = async () => {
      try {
        const response = await api.getOrderState();
        const orderState = response.data.item;
        setProductList(orderState);
        const orderStatesMap: Record<string, string> = {};
        orderState.forEach((orderItem: IOrderItem) => {
          orderItem.products.forEach((product) => {
            orderStatesMap[product._id] = orderItem.state;
          });
        });

        setProductOrderStates(orderStatesMap);
        setOrderList(orderState);
      } catch (error) {
        console.log('판매자의 주문상태 조회 실패', error);
      }
    };
    getOrderState();
  }, []);

  // SORT 정렬
  useEffect(() => {
    let sorted = [...productList];
    switch (sortOrder) {
      case '최신순':
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case '오래된순':
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case '가-하':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case '하-가':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedProductList(sorted);
  }, [productList, sortOrder]);

  if (productList.length === 0) {
    return (
      <>
        <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
          주문된 상품이 존재하지 않습니다.
        </Typography>
      </>
    );
  }
  const getOrderStateLabel = (productId) => {
    const orderItem = orderList.find((order) =>
      order.products.some((product) => product._id === productId),
    );

    if (orderItem) {
      const orderStateCode = ORDER_STATE.codes.find(
        (code) => code.code === orderItem.state,
      );
      return orderStateCode ? orderStateCode.value : 'Unknown Order State';
    }

    return '주문 없음';
  };
  const getQualityName = (quantity) => {
    const qualityItem = QUALITY.find((q) => q.value === quantity);
    return qualityItem ? qualityItem.name : 'Unknown Quality';
  };

  const updateOrderState = async (product_id, selectedOrderState) => {
    // e.preventDefault();
    try {
      await api.updateOrderState(product_id, selectedOrderState);
    } catch (error) {
      console.log('상품 배송상태 수정 오류', error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        <FormControl>
          <InputLabel id="sort-label">정렬</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOrder}
            size="small"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="오래된순">오래된순</MenuItem>
            <MenuItem value="가-하">가격: 낮은 순</MenuItem>
            <MenuItem value="하-가">가격: 높은 순</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table aria-label="판매내역">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  등록일자
                  <br /> (등록번호)
                </TableCell>

                <TableCell align="center">이미지</TableCell>
                <TableCell align="center">상품명</TableCell>
                <TableCell align="center">품질</TableCell>
                <TableCell align="center">가격</TableCell>
                <TableCell align="center">배송료</TableCell>
                <TableCell align="center">배송상태</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProductList.map((rows) => (
                <TableRow key={rows._id}>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(rows.createdAt)}
                    </Typography>
                    ({rows.products[0]._id})
                  </TableCell>

                  <TableCell align="center">
                    <img
                      key={rows.products[0].image.img_id}
                      src={rows.products[0].image.path}
                      alt={'File Preview'}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{rows.products[0].name}</TableCell>
                  <TableCell align="center">
                    {' '}
                    {getQualityName(rows.products[0].quantity)}
                  </TableCell>
                  <TableCell align="center">
                    {rows.products[0].price.toLocaleString()}원
                  </TableCell>
                  <TableCell align="center">
                    {rows.cost.shippingFees.toLocaleString()}원
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      label="주문 상태"
                      value={getOrderStateLabel(rows.products[0]._id)}
                      onChange={(e) =>
                        updateOrderState(rows.products[0]._id, e.target.value)
                      }
                    >
                      {ORDER_STATE.codes.map((state) => (
                        <MenuItem key={state.code} value={state.value}>
                          {state.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Button type="button" variant="contained">
                      수정하기
                    </Button>
                  </TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  ></Box>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
