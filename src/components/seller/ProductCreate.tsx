import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@mui/material';
import { api } from '../../api/api';

export default function ProductCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const productSubmit = async () => {
    await api
      .createProduct()
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
        <input
          type="text"
          placeholder="상품명을 입력하세요."
          value={title}
          onChange={handleTitleChange}
        ></input>
      </div>
      <div>
        <Input
          type="text"
          placeholder="상품 설명을 입력하세요."
          value={content}
          onChange={handleContentChange}
        ></Input>
      </div>
      <div>
        <input type="submit" value="등록하기" onClick={productSubmit}></input>
      </div>
    </div>
  );
}
