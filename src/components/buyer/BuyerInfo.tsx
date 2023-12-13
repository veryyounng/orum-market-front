import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Typography,
  TextField,
  FormLabel,
  Button,
  Box,
} from '@mui/material';

import { api } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 0.5rem;
`;

export default function BuyerInfo() {
  const userId = localStorage.getItem('_id');

  const [userInfo, setUserInfo] = useState(null);
  const [updateUserInfo, setUpdateUserInfo] = useState({});
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    addressName: '',
    receiver: '',
    tel: '',
    mainAddress: '',
    subAddress: '',
  });

  useEffect(() => {
    if (!userId) {
      console.log('ID가 유효하지 않습니다.');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo(userId);
        setUserInfo(response.data.item);
        setUpdateUserInfo(response.data.item);
        console.log(response.data.item);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  // update userInfo name
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserInfo({
      ...updateUserInfo,
      name: e.target.value,
    });
  };

  // update userInfo
  const handleUpdateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmUpdateUserInfo = window.confirm(
      '내 정보 변경사항을 저장하시겠습니까?',
    );

    try {
      if (confirmUpdateUserInfo) {
        await api.updateUserInfo(userId, updateUserInfo);
        alert('내 정보가 수정되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  // update address
  const handleSubmitAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const addressArray = Array.isArray(userInfo.extra.address)
        ? userInfo.extra.address
        : [];

      const uuid = uuidv4();
      const updateFormData = {
        ...userInfo,
        extra: {
          ...userInfo.extra,
          address: [...addressArray, { id: uuid, ...addressData }],
        },
      };

      await api.updateUserInfo(userId, updateFormData);
      alert('주소가 등록되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('주소 업데이트에 실패했습니다.');
    }
  };

  // delete address
  const handleRemoveAddress = async (addressId) => {
    const confirmRemoveAddress =
      window.confirm('해당 주소를 삭제하시겠습니까?');

    if (confirmRemoveAddress) {
      try {
        const addressArray = userInfo.extra.address.filter(
          (list) => list.id !== addressId,
        );

        const updateFormData = {
          ...userInfo,
          extra: {
            ...userInfo.extra,
            address: addressArray,
          },
        };

        await api.updateUserInfo(userId, updateFormData);
        alert('주소가 삭제되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert('주소 삭제에 실패했습니다.');
      }
    }
  };

  if (!userInfo) {
    return <>사용자 정보를 받아오지 못했습니다.</>;
  }

  return (
    <Container>
      {userInfo && !isEditAddress && (
        <>
          <Typography variant="h4">내 정보 수정</Typography>
          <Form onSubmit={handleUpdateUserInfo}>
            <FormLabel>이메일</FormLabel>
            <TextField
              type="email"
              value={userInfo.email}
              variant="outlined"
              size="small"
              fullWidth
              required
              disabled
            />
            <FormLabel>이름</FormLabel>
            <TextField
              type="text"
              value={updateUserInfo.name || ''}
              onChange={handleChangeUserName}
              size="small"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" size="large">
              정보 수정
            </Button>
          </Form>
          <br />
          <br />
          {!userInfo.extra.address && <>주소록이 비어있습니다.</>}
          {userInfo?.extra?.address?.length === 0 && (
            <>주소록이 비어있습니다.</>
          )}

          {userInfo.extra.address && (
            <>
              {userInfo.extra.address.map((list) => (
                // 주소록 목록 테이블 형태로 출력
                <Box
                  key={list.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      배송지명: {list.addressName}
                    </Typography>
                    <Typography variant="body1">
                      메인주소: {list.mainAddress}
                      <br></br>
                      상세주소: {list.subAddress}
                    </Typography>
                    <Typography variant="body2">
                      수령인: {list.receiver}
                      <br></br>
                      전화번호: {list.tel}
                    </Typography>
                  </Box>
                  <Box>
                    {/* 수정하기 기능 추후 작업 */}
                    {/* <Button
                      onClick={() => setIsEditAddress(true)}
                      variant="contained"
                      size="small"
                    >
                      수정
                    </Button> */}
                    <Button
                      onClick={() => handleRemoveAddress(list.id)}
                      variant="contained"
                      size="small"
                    >
                      삭제
                    </Button>
                  </Box>
                </Box>
              ))}
            </>
          )}

          <Box>
            <Button
              onClick={() => setIsEditAddress(true)}
              variant="contained"
              size="large"
            >
              주소록 추가하기
            </Button>
          </Box>
        </>
      )}
      {userInfo && isEditAddress && (
        <>
          <Typography variant="h6" fontWeight={700} mb={3}>
            주소록 추가하기
          </Typography>
          <form onSubmit={(e) => handleSubmitAddress(e)}>
            <FormLabel>배송지명*</FormLabel>
            <TextField
              type="text"
              value={addressData?.addressName || ''}
              placeholder="배송지명을 입력하세요. ex)집, 회사 등"
              name="addressName"
              size="small"
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
              onChange={handleChangeAddress}
            />
            <FormLabel>수령인*</FormLabel>
            <TextField
              type="text"
              value={addressData?.receiver || ''}
              placeholder="이름"
              name="receiver"
              size="small"
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
              onChange={handleChangeAddress}
            />
            <FormLabel>연락처*</FormLabel>
            <TextField
              type="tel"
              value={addressData?.tel || ''}
              placeholder="-없이 입력"
              name="tel"
              size="small"
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
              onChange={handleChangeAddress}
            />
            <FormLabel>배송 주소*</FormLabel>
            <TextField
              type="text"
              value={addressData?.mainAddress || ''}
              placeholder="예) 서울특별시 강남구 테헤란로 443 "
              name="mainAddress"
              size="small"
              fullWidth
              required
              sx={{ marginBottom: '0.4rem' }}
              onChange={handleChangeAddress}
            />
            <TextField
              type="text"
              value={addressData?.subAddress || ''}
              placeholder="나머지 주소를 입력하세요 "
              name="subAddress"
              size="small"
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
              onChange={handleChangeAddress}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={3} my={3}>
              <Button type="submit" size="large" variant="contained" fullWidth>
                저장
              </Button>
              <Button
                onClick={() => setIsEditAddress(false)}
                variant="outlined"
                size="large"
                fullWidth
              >
                취소
              </Button>
            </Box>
          </form>
        </>
      )}
    </Container>
  );
}
