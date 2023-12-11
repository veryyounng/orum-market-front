import { Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../type/index';
import { CATEGORY, QUALITY } from '../../constants/index';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { api } from '../../api/api';

const initCreateData = {
  price: 0,
  shippingFees: 0,
  show: true,
  active: true,
  name: '',
  mainImages: [''],
  content: '',
  createdAt: '',
  updatedAt: '',
  quantity: 1,
  buyQuantity: 0,
  extra: {
    isNew: true,
    isBest: true,
    category: ['H01', 'H0101'],
    sort: 0,
  },
};

export default function ProductUpdate() {
  const { id } = useParams();

  const [productData, setProductData] =
    useState<Partial<IProduct>>(initCreateData);

  const handleMoveBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.getProduct(Number(id));
      setProductData(response.data.item);
    } catch (error) {
      console.log('제품불러오기실패', error);
    }
  };

  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProduct(id!, productData);
    } catch (error) {
      console.log('상품수정오류', error);
    }
  };

  const findDBName = (dbCode) => {
    const foundCategory = CATEGORY.depth2.find(
      (Category) => Category.dbCode === dbCode,
    );
    return console.log(
      '카테고리 이름',
      foundCategory ? foundCategory.dbName : '',
    );
  };
  console.log(productData.content);
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
          value={productData.extra?.category[1] || ''}
          onChange={(e) => {
            const selectedDBCode = e.target.value;
            const selectedDBName = findDBName(selectedDBCode);
          }}
        >
          {CATEGORY.depth2.map((menu) => (
            <MenuItem key={menu.id} value={menu.dbCode}>
              {menu.name}
            </MenuItem>
          ))}
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
              value={
                productData.quantity >= 5 ? '2' : productData.quantity || ''
              }
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
            name="name"
            value={productData.name}
          ></TextField>
        </>
        <br />
        <br />
        <>
          상품 가격:
          <TextField
            type="text"
            name="price"
            value={productData.price || ''}
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
            value={productData.shippingFees || ''}
          ></TextField>
          {/* {numberError && <div style={{ color: 'red' }}>{numberError}</div>} */}
        </>
        <br />
        <br />
        <>
          상품 설명:
          {productData.content && (
            <Editor
              initialValue={productData.content}
              previewStyle="vertical"
              height="400px"
              width="100%"
              initialEditType="markdown"
              useCommandShortcut={true}
            />
          )}
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
