import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Input,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { CleaningServices } from '@mui/icons-material';

import { api } from '../../api/api';
import { CATEGORY, QUALITY } from '../../constants/index';
import { validateProductTitle } from '../../lib/validation';

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
  extra: {
    isNew: true,
    isBest: true,
    category: ['H01', ''],
    quantity: 1,
    buyQuantity: 0,
    order: 0,
  },
};

export default function ProductCreate() {
  const [productData, setProductData] = useState({
    mainImages: '',
    category: '',
    quality: '',
    price: '',
    shippingFees: '',
    title: '',
    content: '',
  });

  const [selectCategory, setSelectCategory] = useState('H0101');
  const [quilty, setQuilty] = useState('1');

  console.log(productData);
  console.log(quilty);

  const [isValid, setIsValid] = useState(true);
  const [contentError, setContentError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProductData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    window.history.back();
  };

  const productSubmit = async () => {
    if (!isValid) {
      alert('양식이 올바르지 않습니다.');
      return;
    }
    try {
      const response = await api.createProduct(productData);
      console.log(response);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  console.log(selectCategory);

  return (
    <>
      ProductCreate
      <form>
        <>
          사진
          <TextField
            type="text"
            name="mainImages"
            value={productData.mainImages}
            onChange={handleAllChange}
          ></TextField>
        </>
        <br />
        <br />
        카테고리:
        <FormControl>
          <InputLabel id="category-label">카테고리</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="category"
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
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
        </FormControl>
        <br />
        <br />
        <>
          상품 품질:
          <FormControl>
            <InputLabel id="quilty-label">상품 품질</InputLabel>
            <Select
              labelId="quilty-label"
              id="quilty-select"
              label="quilty"
              value={quilty}
              onChange={(e) => setQuilty(e.target.value)}
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
            value={productData.title}
            onChange={handleAllChange}
          ></TextField>
          {!isValid && productData.title.length !== 0 ? (
            <div style={{ color: 'red' }}>{titleError}</div>
          ) : (
            <> </>
          )}
        </>
        <br />
        <br />
        <>
          상품 가격:
          <TextField
            type="text"
            name="price"
            value={productData.price}
            onChange={handleAllChange}
          ></TextField>
          {numberError && <div style={{ color: 'red' }}>{numberError}</div>}
        </>
        <br />
        <br />
        <>
          배송비:
          <TextField
            type="text"
            name="shippingFees"
            value={productData.shippingFees}
            onChange={handleAllChange}
          ></TextField>
          {numberError && <div style={{ color: 'red' }}>{numberError}</div>}
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
            onChange={handleAllChange}
          ></TextField>
          {/* 상품 설명을 10글자 이상 해야합니다 */}
          {contentError && <div style={{ color: 'red' }}>{contentError}</div>}
        </>
        <br />
        <button type="submit" onClick={productSubmit}>
          등록하기
        </button>
      </form>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
    </>
  );
}
