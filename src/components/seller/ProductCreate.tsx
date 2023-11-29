import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@mui/material';
import { api } from '../../api/api';

export default function ProductCreate() {
  //   const [title, setTitle] = useState('');
  //   const [content, setContent] = useState('');
  //   const [price, setPrice] = useState('');
  //   const [shippingFees, setShippingFees] = useState('');

  const [productData, setProductData] = useState({
    mainImages: '',
    category: '',
    quality: '',
    price: '',
    shippingFees: '',
    title: '',
    content: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'content' && value.length < 10) {
      // content의 길이가 10 미만인 경우 에러 메시지 설정
      setContentError('상품 설명이 10글자 이상이여야 합니다.');
    } else {
      // 유효한 경우 에러 메시지 초기화
      setContentError('');
    }
    setProductData((prev) => ({ ...prev, [name]: value }));
  };
  const [contentError, setContentError] = useState('');

  const productSubmit = async () => {
    await api
      .createProduct(productData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
            onChange={handleChange}
          ></Input>
        </div>
        <div>
          카테고리:
          <Input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
          ></Input>
        </div>
        <div>
          상품 품질:
          <Input
            type="text"
            name="quality"
            value={productData.quality}
            onChange={handleChange}
          ></Input>
        </div>
        <div>
          상품명:
          <Input
            type="text"
            name="title"
            placeholder="상품명을 입력하세요."
            value={productData.title}
            onChange={handleChange}
          ></Input>
        </div>
        <div>
          상품 가격:
          <Input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
          ></Input>
        </div>
        <div>
          배송비:
          <Input
            type="text"
            name="shippingFees"
            value={productData.shippingFees}
            onChange={handleChange}
          ></Input>
        </div>
        <div>
          상품 설명:
          <Input
            type="text"
            name="content"
            placeholder="상품 설명을 입력하세요."
            value={productData.content}
            onChange={handleChange}
          ></Input>
          {/* 상품 설명을 10글자 이상 해야합니다 */}
          {contentError && <div style={{ color: 'red' }}>{contentError}</div>}
        </div>
        <button type="submit" onClick={productSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
}
