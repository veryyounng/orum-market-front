import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Table,
  useMediaQuery,
  Card,
  Box,
  CardMedia,
  CardContent,
  styled,
} from '@mui/material';
import formatDate from '../../lib/formatDate';
import { ORDER_STATE } from '../../constants';
import { ChevronRight } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { api } from '../../api/api';

export default function OrderListTable() {
  const matches = useMediaQuery('(min-width:1200px)');
  const location = useLocation();
  const productId = location.state.productId;
  console.log(productId);

  // 구매자 구매 목록 상세조회
  useEffect(() => {
    const fetchBuyerOrderList = async () => {
      try {
        const response = await api.getOrderProductDetail(productId);
        console.log(response.data.item);
      } catch (error) {
        console.log('구매목록 조회에 실패했습니다.', error);
      }
    };
    fetchBuyerOrderList();
  }, []);

  const orderState = (list: string) =>
    ORDER_STATE.codes
      .filter((state) => state.code === list)
      .map((stateValue) => (
        <Box key={stateValue.code}>
          <Typography
            key={stateValue.code}
            variant="body2"
            marginTop={1.5}
            marginBottom={1.5}
            fontStyle={{ color: 'red' }}
          >
            {stateValue.value}
          </Typography>
          <OrderReviewBox>
            {stateValue.value === '배송 완료' ? (
              <Button variant="outlined" size="small" fullWidth>
                별점평가
              </Button>
            ) : (
              ''
            )}
          </OrderReviewBox>
        </Box>
      ));

  return (
    <>
      <Typography variant="h5" fontWeight={700}>
        주문 상세 조회
      </Typography>

      <TableContainer>
        <Table aria-label="구매 상세 내역-주문정보" padding="none">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                variant={'head'}
                sx={{
                  fontWeight: '700',
                  fontSize: '20px',
                  padding: '10px 0',
                }}
              >
                주문정보
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <BasicHeadCell>주문번호</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
            <TableRow>
              <BasicHeadCell>주문일자</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
            <TableRow>
              <BasicHeadCell>주문자</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
            <TableRow>
              <BasicHeadCell>주문상태</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <BasicTable aria-label="구매 상세 내역-결제정보" padding="none">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                variant={'head'}
                sx={{
                  fontWeight: '700',
                  fontSize: '20px',
                  padding: '10px 0',
                }}
              >
                결제정보
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <BasicHeadCell>총 결제금액</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
            <TableRow>
              <BasicHeadCell>상품금액</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
            <TableRow>
              <BasicHeadCell>배송비</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
          </TableBody>
        </BasicTable>

        <BasicTable aria-label="구매 상세 내역-배송지정보" padding="none">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                variant={'head'}
                sx={{
                  fontWeight: '700',
                  fontSize: '20px',
                  padding: '10px 0',
                }}
              >
                배송지정보
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <BasicHeadCell>수령인</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
            <TableRow>
              <BasicHeadCell>배송주소</BasicHeadCell>
              <TableCell>dd</TableCell>
            </TableRow>
          </TableBody>
        </BasicTable>

        <BasicTable aria-label="결제내역">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                variant={'head'}
                sx={{
                  fontWeight: '700',
                  fontSize: '20px',
                  padding: '10px 0',
                }}
              >
                주문 상품 정보
              </TableCell>
            </TableRow>
          </TableHead>
        </BasicTable>
        {matches ? (
          <Table aria-label="결제내역">
            <TableHead>
              <TableRow>
                <TableHeaderCell align="center" sx={{ width: '100px' }}>
                  이미지
                </TableHeaderCell>
                <TableHeaderCell align="center">상품정보</TableHeaderCell>
                <TableHeaderCell align="center">상품금액</TableHeaderCell>
                <TableHeaderCell align="center">주문상태</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <CardMedia
                    component="img"
                    height="150"
                    style={{ width: '150px', objectFit: 'cover' }}
                    // image={product.image.path}
                    // alt={product.name}
                  />
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <>
            <Card
              sx={{ marginBottom: '20px', boxShadow: 'none' }}
              // key={list._id}
            >
              {/* {list.products.map((product) => ( */}
              <OrderProductList>
                <CardMedia
                  component="img"
                  height="180"
                  style={{ width: '180px', objectFit: 'cover' }}
                  // image={product.image.path}
                  // alt={product.name}
                  sx={{ padding: '15px' }}
                />
                <CardContent
                  sx={{
                    padding: '15px 0 0 0 ',
                    margin: '0',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontStyle={{ color: '#646464' }}
                  >
                    {/* 주문번호: {product._id} */}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    textOverflow={'ellipsis'}
                    marginTop={0.3}
                  >
                    {/* {product.name} */}
                  </Typography>
                  <Typography variant="body1" marginTop={0.5}>
                    {/* {product.price.toLocaleString()}원 */}
                  </Typography>
                  {/* {orderState(list.state)} */}
                </CardContent>
              </OrderProductList>
              {/* ))} */}
            </Card>
            {/* ))} */}
          </>
        )}
      </TableContainer>
    </>
  );
}

const OrderListBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px 0 15px 15px ',
  borderBottom: '1px solid #e2e2e2',
});

const OrderProductList = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  borderBottom: '1px solid #e2e2e2',
});

const OrderReviewBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: '10px',
});

const TableHeaderCell = styled(TableCell)({
  fontWeight: '700',
});

const OrderPriceBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '15px',
  borderBottom: '1px solid #e2e2e2',
});

const BasicHeadCell = styled(TableCell)({
  fontWeight: '700',
  width: '100px',
  padding: '16px 0',
});

const BasicTable = styled(Table)({
  marginTop: '35px',
});
