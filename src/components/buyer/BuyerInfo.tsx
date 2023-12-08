import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
import { IUserInfo } from '../../type/index';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';

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
    addressBook: [
      {
        addressName: '',
        tel: 0,
        name: '',
        address_main: '',
        address_sub: '',
      },
    ],
  },
};

export default function BuyerInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const userId = localStorage.getItem('_id');
  const [addressForm, setAddressForm] = useState(initUser.extra.addressBook); // 주소값을 담을 정보
  const [userInfo, setUserInfo] = useState(initUser); // 서버에서 받아오는 유저 정보
  const [updateUserInfo, setUpdateUserInfo] = useState({}); // 새로 업데이트되는 유저 정보
  const [addressBook, setAddressBook] = useState(initUser.extra.addressBook);

  // input 상태값 저장
  const [addressName, setAddressName] = useState('');
  const [addressUserName, setAddressUserName] = useState('');
  const [addressUserTel, setAddressUserTel] = useState(0);
  const [addressMain, setAddressMain] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const resetData = () => {
    setUpdateUserInfo(userInfo); // 주소지 등록안하고 취소했을 때 받아온 데이터로 reset
  };

  // GET API
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
        setAddressBook([response.data.item.extra.addressBook]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <>사용자 정보를 받아오지 못했습니다.</>;
  }

  // Edit UserInfo
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserInfo({
      ...updateUserInfo,
      name: e.target.value,
    });
  };

  console.log('updateValue: ', updateUserInfo);

  const submitAddressForm = (e) => {
    e.preventDefault();
    setAddressForm([
      ...addressForm,
      {
        addressName: addressName,
        name: addressUserName,
        tel: addressUserTel,
        address_main: addressMain,
        address_sub: addressDetail,
      },
    ]);

    setAddressForm(initUser.extra.addressBook);
    handleClose();
  };

  const handleUpdateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setUpdateUserInfo({
        ...updateUserInfo,
        address: `${addressForm[1].address_main} ${addressForm[1].address_sub} `,
        extra: {
          addressBook: [...addressBook.slice(1), ...addressForm.slice(1)],
        },
      });

      await api.updateUserInfo(userId, userInfo);
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
              defaultValue={userInfo.email}
              variant="outlined"
              size="small"
              fullWidth
              required
              disabled
            />
            <FormLabel>이름</FormLabel>
            <TextField
              type="text"
              value={updateUserInfo.name}
              defaultValue={userInfo.name}
              onChange={handleChangeUserName}
              size="small"
              fullWidth
              required
            />
            <FormLabel>기본 배송지</FormLabel>
            {!userInfo.address ? (
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

                  <Button
                    size={'small'}
                    variant="outlined"
                    sx={{ marginTop: '0.5rem' }}
                    onClick={handleOpen}
                  >
                    배송지 등록
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    marginY: '1rem',
                  }}
                  height={'100px'}
                >
                  {addressForm.slice(1).map((list, idx) => (
                    <>
                      <Typography
                        key={idx}
                        variant="body1"
                        sx={{ marginBottom: '0.3rem' }}
                      >
                        {list.addressName}
                      </Typography>
                      <Typography variant="body2">{list.name}</Typography>
                      <Typography variant="body2">{list.tel}</Typography>
                      <Typography variant="body2">
                        {list.address_main} {list.address_sub}
                      </Typography>
                    </>
                  ))}
                </Box>
              </>
            )}
            <Button type="submit" variant="contained" size="large">
              내 정보 수정하기
            </Button>
          </Form>
        </>
      )}

      <>
        {/* 모달 */}
        <FormControl>
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalDialog size="lg">
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '1px solid #898989',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'rows',
                    marginY: '1rem',
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                  >
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
                  placeholder="배송지명을 입력하세요. ex)집, 회사 등"
                  name="addressName"
                  onChange={(e) => {
                    setAddressName(e.target.value);
                  }}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <FormLabel>이름*</FormLabel>
                <TextField
                  type="text"
                  placeholder="이름"
                  name="name"
                  onChange={(e) => setAddressUserName(e.target.value)}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <FormLabel>연락처*</FormLabel>
                <TextField
                  type="number"
                  placeholder="-없이 입력"
                  name="tel"
                  onChange={(e) => setAddressUserTel(e.target.value)}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <FormLabel>배송 주소*</FormLabel>
                <TextField
                  type="text"
                  placeholder="예) 서울특별시 강남구 테헤란로 443 "
                  name="address_main"
                  onChange={(e) => setAddressMain(e.target.value)}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '0.4rem' }}
                />
                <TextField
                  type="text"
                  placeholder="나머지 주소를 입력하세요 "
                  name="address_sub"
                  onChange={(e) => setAddressDetail(e.target.value)}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={submitAddressForm}
                >
                  등록하기
                </Button>
                <ModalClose />
              </Box>
            </ModalDialog>
          </Modal>
        </FormControl>
      </>
    </Container>
  );
}
