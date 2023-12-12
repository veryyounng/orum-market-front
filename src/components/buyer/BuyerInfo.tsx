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
import { Link } from 'react-router-dom';
import AddressItem from '../address/AddressItem';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 0.5rem;
`;

const initUser = {
  id: 0,
  email: '',
  name: '',
  address: '',
  extra: {
    membershipClass: '',
    address: [
      {
        id: 1,
        addressName: '',
        receiver: '',
        tel: '',
        mainAddress: '',
        subAddress: '',
      },
    ],
  },
};

export default function BuyerInfo() {
  const id = localStorage.getItem('_id');

  const [userInfo, setUserInfo] = useState(initUser); // 서버에서 받아오는 유저 정보
  const [updateUserInfo, setUpdateUserInfo] = useState({}); // 새로 업데이트되는 유저 정보
  const [addressBook, setAddressBook] = useState(initUser.extra.address);

  // API GET
  useEffect(() => {
    if (!id) {
      console.log('ID가 유효하지 않습니다.');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo(id);
        setUserInfo(response.data.item);
        setUpdateUserInfo(response.data.item);
        setAddressBook([response.data.item.extra.address]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <>사용자 정보를 받아오지 못했습니다.</>;
  }

  // userInfo update name
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserInfo({
      ...updateUserInfo,
      name: e.target.value,
    });
  };

  // userInfo update
  const handleUpdateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmUpdateUserInfo = window.confirm(
      '내 정보 변경사항을 저장하시겠습니까?',
    );

    try {
      if (confirmUpdateUserInfo) {
        await api.updateUserInfo(id, updateUserInfo);
        alert('내 정보가 수정되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {userInfo && (
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

          <Typography variant="h4" sx={{ marginTop: '4rem' }}>
            배송지 관리
          </Typography>

          {!addressBook[0].addressName ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginY: '1rem',
                }}
                height={'100px'}
              >
                <Typography variant="body2">
                  등록된 배송지가 없습니다.
                </Typography>

                <Link to={`/user/${id}/address-form`}>
                  <Button
                    size={'small'}
                    variant="outlined"
                    sx={{ marginTop: '0.5rem' }}
                  >
                    배송지 추가
                  </Button>
                </Link>
              </Box>
            </>
          ) : (
            <>
              {addressBook.map((item) => (
                <AddressItem key={item.id} {...item} userId={id} />
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
}
