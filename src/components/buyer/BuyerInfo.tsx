import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  Typography,
  TextField,
  FormLabel,
  Button,
} from '@mui/material';

import { api } from '../../api/api';
import AddressForm from '../address/AddressForm';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 0.5rem;
`;

export interface IBuyerInfo {
  _id: number;
  email: string;
  name: string;
  address?: string;
}

export default function BuyerInfo() {
  const { id } = useParams();
  const [buyerFormData, setBuyFormData] = useState<IBuyerInfo>({
    _id: 0,
    email: '',
    name: '',
    address: '',
  });

  useEffect(() => {
    const getBuyerInfo = async () => {
      try {
        const response = await api.getBuyerInfo(id);
        setBuyFormData({
          ...buyerFormData,
          _id: response.data.item._id,
          email: response.data.item.email,
          name: response.data.item.name,
          address: response.data.item.address,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getBuyerInfo();
  }, []);

  return (
    <Container>
      <Typography variant="h4">내 정보 수정</Typography>

      <Form action="">
        <FormLabel>이메일</FormLabel>
        <TextField
          type="email"
          value={buyerFormData.email}
          variant="outlined"
          size="small"
          fullWidth
          required
          disabled
        />
        <FormLabel>이름</FormLabel>
        <TextField
          type="text"
          value={buyerFormData.name}
          onChange={(e) =>
            setBuyFormData({
              ...buyerFormData,
              name: e.target.value,
            })
          }
          size="small"
          fullWidth
        />
        <FormLabel>기본 배송지</FormLabel>
        <AddressForm />
        <Button type="button" variant="contained" size="large">
          내 정보 수정하기
        </Button>
      </Form>
    </Container>
  );
}
