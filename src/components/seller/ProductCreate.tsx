import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@mui/material';
import { api } from '../../api/api';
import { validateProductTitle } from '../../lib/validation';
import { CleaningServices } from '@mui/icons-material';

export const data = {
  price: 22000,
  shippingFees: 3000,
  show: true,
  active: true,
  name: '',
  mainImages: ['/uploads/sample-janngu.jpg'],
  content: '',
  createdAt: '2023.10.12 12:34:56',
  updatedAt: '2023.10.12 12:34:56',
  extra: {
    isNew: true,
    isBest: true,
    category: ['PC02', 'PC0201'],
    quantity: 600,
    buyQuantity: 190,
    order: 7,
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
  return (
    <div>
      ProductCreate
      <div>
        <div>
          사진
          <Input
            type="text"
            name="mainImages"
            value={productData.mainImages}
            onChange={handleAllChange}
          ></Input>
        </div>
        <div>
          카테고리:
          <Input
            type="text"
            name="category"
            value={productData.category}
          ></Input>
        </div>
        <div>
          상품 품질:
          <Input type="text" name="quality" value={productData.quality}></Input>
        </div>
        <div>
          상품명:
          <Input
            type="text"
            name="title"
            placeholder="상품명을 입력하세요."
            value={productData.title}
            onChange={handleAllChange}
          ></Input>
          {!isValid && productData.title.length !== 0 ? (
            <div style={{ color: 'red' }}>{titleError}</div>
          ) : (
            <div> </div>
          )}
        </div>
        <div>
          상품 가격:
          <Input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleAllChange}
          ></Input>
          {numberError && <div style={{ color: 'red' }}>{numberError}</div>}
        </div>
        <div>
          배송비:
          <Input
            type="text"
            name="shippingFees"
            value={productData.shippingFees}
            onChange={handleAllChange}
          ></Input>
          {numberError && <div style={{ color: 'red' }}>{numberError}</div>}
        </div>
        <div>
          상품 설명:
          <Input
            type="text"
            name="content"
            placeholder="상품 설명을 입력하세요."
            value={productData.content}
            onChange={handleAllChange}
          ></Input>
          {/* 상품 설명을 10글자 이상 해야합니다 */}
          {contentError && <div style={{ color: 'red' }}>{contentError}</div>}
        </div>
        <button type="submit" onClick={productSubmit}>
          등록하기
        </button>
      </div>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
}
