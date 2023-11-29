import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { IProduct } from '../../type';

const _id = localStorage.getItem('_id');

export default function ProductManager() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<IProduct[]>([]);

  const handleUpdate = () => {
    navigate(`/user/${_id}/product-update`);
  };

  useEffect(() => {
    const getProductInfo = async () => {
      const response = await api.getSellerProductInfo();
      setProductData(response.data.item);
    };
    getProductInfo();
  });
  return (
    <div>
      ProductManager
      <Button onClick={handleUpdate}>수정하기</Button>
    </div>
  );
}
