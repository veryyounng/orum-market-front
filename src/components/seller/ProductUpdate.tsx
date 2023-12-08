import { Button, Input } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../type/index';
import { CATEGORY, QUALITY } from '../../constants/index';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { api } from '../../api/api';

// const initData = {
//   price: 0,
//   shippingFees: 0,
//   show: true,
//   active: true,
//   name: '',
//   mainImages: [''],
//   content: '',
//   createdAt: '',
//   updatedAt: '',
//   quantity: 1,
//   buyQuantity: 0,
//   extra: {
//     isNew: true,
//     isBest: true,
//     category: ['H01', 'H0101'],
//     sort: 0,
//   },
// };

export default function ProductUpdate() {
  //받아올 상품 id
  const { id } = useParams();

  const [productData, setProductData] = useState<Partial<IProduct>>({});
  // const [productId, setProductId] = useState(50);

  console.log('초기데이터', productData);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.getProduct(Number(id));
      console.log('응답', response);
      setProductData(response.data.item);
      console.log('제품데이터', productData);
    } catch (error) {
      console.log('제품불러오기실패', error);
    }
  };

  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProduct(productId!, productData);
      //   history.pushState('/');
    } catch (error) {
      console.log('상품수정오류', error);
    }
  };
  const handleMoveBack = () => {
    window.history.back();
  };
  return (
    <>
      <form onSubmit={updateSubmit}>
        <>
          <InputLabel>상품사진</InputLabel>
          <h3>이미지는 3개까지 첨부 가능합니다.</h3>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            파일 업로드
            <input hidden type="file" multiple accept="image/*" />
          </Button>
        </>
        <br />
        <br />
        <InputLabel id="category-label">카테고리</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          label="category"
          sx={{ width: '100px' }}
        >
          {CATEGORY.depth2.map((menu) => {
            return (
              <MenuItem key={menu.id} value={menu.dbCode}>
                {menu.name}
              </MenuItem>
            );
          })}
        </Select>
        <br />
        <br />
        <>
          상품 품질:
          <FormControl>
            <InputLabel id="quantity-label">상품 품질</InputLabel>
            <Select
              labelId="quantity-label"
              id="quantity-select"
              label="quantity"
              value={productData.quantity}
              sx={{ width: '100px' }}
            >
              {QUALITY.map((menu) => {
                return (
                  <MenuItem key={menu.id} value={menu.dbCode}>
                    {menu.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </>
        <br />
        <br />
        <>
          상품명:
          <TextField
            type="text"
            name="title"
            placeholder="상품명을 입력하세요."
          ></TextField>
          {/* {!isValid && productData.title.length !== 0 ? (
            <div style={{ color: 'red' }}>{titleError}</div>
          ) : (
            <> </>
          )} */}
        </>
        <br />
        <br />
        <>
          상품 가격:
          <TextField
            type="text"
            name="price"
            value={productData.price}
          ></TextField>
          {/* {numberError && <div style={{ color: 'red' }}>{numberError}</div>} */}
        </>
        <br />
        <br />
        <>
          배송비:
          <TextField
            type="text"
            name="shippingFees"
            value={productData.shippingFees}
          ></TextField>
          {/* {numberError && <div style={{ color: 'red' }}>{numberError}</div>} */}
        </>
        <br />
        <br />
        <>
          상품 설명:
          <TextField
            type="text"
            name="content"
            placeholder="상품 설명을 입력하세요."
            value={productData.content}
          ></TextField>
          {/* 상품 설명을 10글자 이상 해야합니다 */}
          {/* {contentError && <div style={{ color: 'red' }}>{contentError}</div>} */}
        </>
        <br />
        <Button type="submit" variant="contained">
          등록하기
        </Button>
      </form>
      <Button type="button" variant="outlined" onClick={handleMoveBack}>
        취소
      </Button>
    </>
  );
}
