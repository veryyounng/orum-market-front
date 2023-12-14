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
import CheckIcon from '@mui/icons-material/Check';

import { api } from '../../api/api';
import { IProduct } from '../../type';
import { CATEGORY, QUALITY } from '../../constants/index';

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

  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  }
  const fetchSellerProduct = async () => {
    try {
      console.log('판매자 id', _id);
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
      <Link to={`/user/${_id}/product-create`}>
        <Button variant="contained">등록하기</Button>
      </Link>
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
                <TableCell align="center">품질</TableCell>
                <TableCell align="center">가격</TableCell>
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
                    ({rows._id})
                  </TableCell>
                  <TableCell align="center">
                    {CATEGORY.depth2
                      .filter(
                        (category) =>
                          category.dbCode === rows.extra.category[1],
                      )
                      .map((categoryName) => (
                        <Typography key={categoryName.id} variant="body2">
                          {categoryName.name}
                        </Typography>
                      ))}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={`${rows.mainImages[0]}`}
                      alt="main-Image"
                      style={{ width: '80px' }}
                    />
                  </TableCell>
                  <TableCell align="center">{rows.name}</TableCell>
                  <TableCell align="center">
                    {QUALITY.find((quality) => quality.value === rows.quantity)
                      ?.name || '상급'}
                  </TableCell>
                  <TableCell align="center">
                    {rows.price.toLocaleString()}원
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    ></Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
