import { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Input,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
// import { CleaningServices } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { api } from '../../api/api';
import { CATEGORY, QUALITY } from '../../constants/index';
// import { validateProductTitle } from '../../lib/validation';

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
    category: ['H01', 'H0101'],
    quantity: 1,
    buyQuantity: 0,
    order: 0,
  },
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ProductCreate() {
  const [productData, setProductData] = useState({
    mainImages: [''],
    extra: { category: ['H01', 'H0101'] },
    quality: '1',
    price: '',
    shippingFees: '',
    title: '',
    content: '',
  });
  // const response = await api.createProduct(productData);

  const [isValid, setIsValid] = useState(true);

  // 사진 미리보기 상태값
  const [filePreview, setFilePreview] = useState([]);
  const [fileSelect, setFileSelect] = useState([]);

  // const [contentError, setContentError] = useState('');
  // const [numberError, setNumberError] = useState('');
  // const [titleError, setTitleError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoveBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.history.back();
  };

  const handleCategory = (categorySelected: string) => {
    setProductData({
      ...productData,
      extra: { category: ['H01', categorySelected] },
    });
  };

  const handleQuilty = (quiltySelected: string) => {
    setProductData({
      ...productData,
      quality: quiltySelected,
    });
  };

  const productSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      alert('양식이 올바르지 않습니다.');
      return;
    }
    try {
      const response = await api.createProduct(productData);

      console.log(response);
      setProductData({
        ...productData,
        mainImages: [imageUrl],
        extra: { category: ['H01', 'H0101'] },
        quality: '1',
        price: '',
        shippingFees: '',
        title: '',
        content: '',
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 업로드 버튼 클릭 시 실행되는 함수
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = e.target.files;
    console.log('사용자가 선택한 파일', fileInput);
    const formData = new FormData();
    for (let i = 0; i < fileInput.length; i++) {
      formData.append('attach', fileInput[i]);
    }

    // const reader = new FileReader();

    // for (let i = 0; i < fileUrlLists.length; i++) {
    //   fileUrlLists = fileUrlLists.slice(0, 3);
    //   setFilePreview(...filePreview, fileUrlLists);
    // }

    try {
      const response = await api.uploadFile(formData);
      console.log('path값', response.data.files);
      setImageUrl(response.data.files.path);
      console.log('이미지 url', imageUrl);
      console.log('response:', response);

      setProductData({
        ...productData,
        mainImages: [response.data.files.path],
      });
    } catch (error) {
      console.log('사진첨부에러발생', error);
    }
  };

  return (
    <>
      <form>
        <>
          사진
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onChange={handleFileUpload}
          >
            Upload file
            <input hidden type="file" multiple accept="image/*" />
          </Button>
          {filePreview && (
            <img
              src={filePreview}
              alt="File Preview"
              style={{ marginTop: '10px', maxWidth: '100%' }}
            />
          )}
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
            value={productData.extra.category[1]}
            onChange={(e) => handleCategory(e.target.value)}
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
              value={productData.quality}
              onChange={(e) => handleQuilty(e.target.value)}
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
            onChange={handleAllChange}
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
            onChange={handleAllChange}
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
            onChange={handleAllChange}
          ></TextField>
          {/* 상품 설명을 10글자 이상 해야합니다 */}
          {/* {contentError && <div style={{ color: 'red' }}>{contentError}</div>} */}
        </>
        <br />
        <button type="submit" onClick={productSubmit}>
          등록하기
        </button>
      </form>
      <button type="button" onClick={handleMoveBack}>
        취소
      </button>
    </>
  );
}
