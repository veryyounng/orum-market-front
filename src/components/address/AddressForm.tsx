import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  FormLabel,
  Button,
  FormControl,
  Box,
} from '@mui/material';

import { api } from '../../api/api';
import { validateTel } from '../../lib/validation';

export default function AddressForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.userInfo._id;
  const uuid = uuidv4();
  const [formData, setFormData] = useState({
    addressName: '',
    receiver: '',
    tel: '',
    mainAddress: '',
    subAddress: '',
  });
  const [telError, setTelError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'tel') {
      if (!validateTel(value)) {
        setTelError('올바른 전화번호를 입력해 주세요.');
      } else {
        setTelError('');
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updateFormData = {
        ...location?.state.userInfo,
        extra: {
          ...location?.state.userInfo.extra,
          address: [
            ...location?.state.userInfo.extra.address,
            { id: uuid, ...formData },
          ],
        },
      };

      api.updateUserInfo(userId, updateFormData);
      alert('주소가 등록되었습니다.');
      navigate(`/user/${userId}/buyer-info`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'rows',
                  marginY: '1rem',
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  주소지 입력
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="subtitle2"
                  component="h2"
                >
                  * 필수
                </Typography>
              </Box>
              <FormLabel>배송지명*</FormLabel>
              <TextField
                type="text"
                value={formData?.addressName}
                placeholder="배송지명을 입력하세요. ex)집, 회사 등"
                name="addressName"
                size="small"
                fullWidth
                required
                sx={{ marginBottom: '1rem' }}
                onChange={handleChange}
              />
              <FormLabel>수령인*</FormLabel>
              <TextField
                type="text"
                value={formData?.receiver}
                placeholder="이름"
                name="receiver"
                size="small"
                fullWidth
                required
                sx={{ marginBottom: '1rem' }}
                onChange={handleChange}
              />
              <FormLabel>연락처*</FormLabel>
              <TextField
                type="tel"
                value={formData?.tel}
                placeholder="-없이 입력"
                name="tel"
                size="small"
                fullWidth
                required
                sx={{ marginBottom: '1rem' }}
                onChange={handleChange}
                error={!!telError}
                helperText={telError}
              />
              <FormLabel>배송 주소*</FormLabel>
              <TextField
                type="text"
                value={formData?.mainAddress}
                placeholder="예) 서울특별시 강남구 테헤란로 443 "
                name="mainAddress"
                size="small"
                fullWidth
                required
                sx={{ marginBottom: '0.4rem' }}
                onChange={handleChange}
              />
              <TextField
                type="text"
                value={formData?.subAddress}
                placeholder="나머지 주소를 입력하세요 "
                name="subAddress"
                size="small"
                fullWidth
                required
                sx={{ marginBottom: '1rem' }}
                onChange={handleChange}
              />
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Button
                  type="button"
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  저장
                </Button>
                <Button
                  type="button"
                  size="large"
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  취소
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Form>
      </Container>
    </>
  );
}
