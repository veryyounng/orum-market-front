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
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';

import { api } from '../../api/api';
import { IProduct } from '../../type';
import { CATEGORY } from '../../constants/index';
import { Link } from 'react-router-dom';

export default function ProductManager() {
  const _id = localStorage.getItem('_id');
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [isShow, setIsShow] = useState(false);

  // 날짜 변환 함수
  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  }

  useEffect(() => {
    const fetchSellerProductData = async () => {
      try {
        const response = await api.getProductList();
        const getMatchItem = response.data.item.filter(
          (id: IProduct) => id.seller_id === Number(_id),
        );
        setProductList(getMatchItem);
      } catch (error) {
        console.log('상품 목록을 가져오는데 실패했습니다', error);
      }
    };
    fetchSellerProductData();
  }, []);

  if (productList.length === 0) {
    return (
      <>
        <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
          등록된 물품이 없습니다.
        </Typography>
        <Link to={`/user/${_id}/product-create`}>
          <Button type="button" variant="contained" size="large">
            물품 등록하러 가기
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="구매내역">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                등록일자
                <br /> (등록번호)
              </TableCell>
              <TableCell align="center">카테고리</TableCell>
              <TableCell align="center">이미지</TableCell>
              <TableCell align="center">상품명</TableCell>
              <TableCell align="center">수량</TableCell>
              <TableCell align="center">가격</TableCell>
              <TableCell align="center">공개여부</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummySellerProductList
              .filter((matchId) => matchId.item.seller_id === Number(_id))
              .map((rows) => (
                <TableRow key={rows.item._id}>
                  <TableCell align="center">
                    {rows.item.updatedAt} <br /> {rows.item._id}
                  </TableCell>
                  <TableCell align="center">
                    {rows.item.extra.category[1]}
                  </TableCell>
                  <TableCell align="center">{rows.item.images}</TableCell>
                  <TableCell align="center">{rows.item.name}</TableCell>
                  <TableCell align="center">
                    {rows.item.extra.quantity}
                  </TableCell>
                  <TableCell align="center">{rows.item.price}</TableCell>
                  <TableCell align="center">
                    <ToggleButton
                      value="check"
                      selected={isShow}
                      size={'small'}
                      onChange={() => {
                        setIsShow(!rows.item.show);
                      }}
                    >
                      <CheckIcon />
                    </ToggleButton>
                  </TableCell>
                  <TableCell>
                    <button type="button">수정하기</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
