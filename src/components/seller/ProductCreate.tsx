import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  Stack,
  IconButton,
} from '@mui/material';
// import { CleaningServices } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

import { api } from '../../api/api';
import { CATEGORY, QUALITY } from '../../constants/index';
import path from 'path';
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
  quantity: 1,
  buyQuantity: 0,
  extra: {
    isNew: true,
    isBest: true,
    category: ['H01', 'H0101'],
    sort: 0,
  },
};

export default function ProductCreate() {
  const [productData, setProductData] = useState(initCreateData);

  const [isValid, setIsValid] = useState(true);
  const [filePreview, setFilePreview] = useState([]);
  const [productId, setProductId] = useState(0);

  // const [contentError, setContentError] = useState('');
  // const [numberError, setNumberError] = useState('');
  // const [titleError, setTitleError] = useState('');

  const getProductGo = async () => {
    try {
      const response = await api.getSellerProductInfo(Number(id));
      console.log(response);
    } catch (error) {
      console.log('상품불러오기오류', error);
    }
  };

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

  function handleQuantity(quantitySelected: string) {
    setProductData({
      ...productData,
      quantity: quantitySelected,
    });
  }

  //상품데이터 등록하기
  const productSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      alert('양식이 올바르지 않습니다.');
      return;
    }
    try {
      const response = await api.createProduct(productData);
      setProductData(response.data.item);
      setProductId(response.data.item._id);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  console.log('productId', productId);

  // 업로드 버튼 클릭 시 실행되는 함수
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = e.target.files;
    if (!fileInput) return;

    const totalFiles = filePreview.length + fileInput.length;

    if (totalFiles > 3) {
      alert('이미지는 3개까지 첨부가능합니다');
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < fileInput.length; i++) {
      formData.append('attach', fileInput[i]);
    }

    try {
      const response = await api.uploadFile(formData);

      //파일이 여러개일때
      if (response.data.files) {
        let fileArr = response.data.files;
        const resImgUrl = fileArr.map((images) => ({
          id: images.name,
          path: `https://localhost:443${images.path}`,
        }));
        setFilePreview([...filePreview, ...resImgUrl]);
        setProductData({
          ...productData,
          mainImages: [...filePreview, ...resImgUrl],
        });

        //단일파일일때
      } else {
        let fileArr = {
          id: response.data.file.name,
          path: `https://localhost:443${response.data.file.path}`,
        };

        setFilePreview([...filePreview, fileArr]);
        setProductData({
          ...productData,
          mainImages: [...filePreview, fileArr],
        });
      }
    } catch (error) {
      console.log('사진첨부에러발생', error);
    }
  };
  const handleFileRemove = (indexToRemove) => {
    let updatedFilePreview = [...filePreview];
    // updatedFilePreview.splice(indexToRemove, 1);
    updatedFilePreview = updatedFilePreview.filter(
      (item) => item.id !== indexToRemove,
    );
    setFilePreview(updatedFilePreview);

    setProductData({
      ...productData,
      mainImages: filePreview,
    });
  };

  return (
    <>
      <form onSubmit={productSubmit}>
        <InputLabel>상품사진</InputLabel>
        <h3>이미지는 3개까지 첨부 가능합니다.</h3>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onChange={handleFileUpload}
        >
          파일 업로드
          <input hidden type="file" multiple accept="image/*" />
        </Button>
        {filePreview.map((item) => (
          <div key={item.id}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => handleFileRemove(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
            <img
              key={item.id}
              src={item.path}
              alt={'File Preview'}
              style={{ marginTop: '10px', maxWidth: '60%' }}
            />
          </div>
        ))}
        <br></br>
        <br></br>
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
        <br />
        <br />
        <>
          <InputLabel id="quantity-label">상품 품질</InputLabel>
          <Select
            labelId="quantity-label"
            id="quantity-select"
            label="quantity"
            value={productData.quantity}
            onChange={(e) => handleQuantity(e.target.value)}
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
        </>
        <br />
        <br />
        <>
          상품명:
          <TextField
            type="text"
            name="name"
            placeholder="상품명을 입력하세요."
            value={productData.name}
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
        <Button type="submit" variant="contained">
          등록하기
        </Button>
      </form>
      <Button type="button" onClick={handleMoveBack} variant="outlined">
        취소
      </Button>
      <Button type="button" variant="outlined">
        <Link
          to={`/products/50`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          수정하기
        </Link>
      </Button>
    </>
  );
}
