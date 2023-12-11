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
import { Modal, ModalClose, ModalDialog } from '@mui/joy';

import { api } from '../../api/api';

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
  const [userInfo, setUserInfo] = useState(initUser); // 서버에서 받아오는 유저 정보
  const [updateUserInfo, setUpdateUserInfo] = useState({}); // 새로 업데이트되는 유저 정보
  const [updateAddressList, setUpdateAddressList] = useState([]);
  const [addressBook, setAddressBook] = useState(initUser.extra.address);

  // input 상태값 저장
  const [addressName, setAddressName] = useState('');
  const [addressUserName, setAddressUserName] = useState('');
  const [addressUserTel, setAddressUserTel] = useState(0);
  const [addressMain, setAddressMain] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  // Add Address input error
  const [addressNameError, setAddressNameError] = useState('');
  const [addressUserNameError, setAddressUserNameError] = useState('');
  const [addressUserTelError, setAddressUserTelError] = useState('');
  const [addressMainError, setAddressMainError] = useState('');
  const [addressDetailError, setAddressDetailError] = useState('');

  const resetData = () => {
    setUpdateUserInfo(userInfo); // 주소지 등록안하고 취소했을 때 받아온 데이터로 reset
    setAddressName('');
    setAddressUserName('');
    setAddressUserTel(0);
    setAddressMain('');
    setAddressDetail('');
    setAddressNameError('');
    setAddressUserNameError('');
    setAddressUserTelError('');
    setAddressMainError('');
    setAddressDetailError('');
  };

  // API GET
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

  // add Address -> get userInfo
  const reloadUserInfo = async () => {
    try {
      const response = await api.getUserInfo(userId);
      setUserInfo(response.data.item);
      setUpdateUserInfo(response.data.item);
      setAddressBook([response.data.item.extra.addressBook]);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit UserInfo
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserInfo({
      ...updateUserInfo,
      name: e.target.value,
    });
  };

  const submitAddressForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addressName) {
      setAddressNameError('배송지명을 입력해주세요.');
      return;
    } else {
      setAddressNameError('');
    }

    if (!addressUserName) {
      setAddressUserNameError('수령인 이름을 입력해주세요.');
      return;
    } else {
      setAddressUserNameError('');
    }

    if (!addressUserTel) {
      setAddressUserTelError('전화번호를 입력해주세요.');
      return;
    } else {
      setAddressUserTelError('');
    }

    if (!addressMain) {
      setAddressMainError('주소를 입력해주세요.');
      return;
    } else {
      setAddressMainError('');
    }

    if (!addressDetail) {
      setAddressDetailError('상세주소를 입력해주세요.');
      return;
    } else {
      setAddressDetailError('');
    }

    try {
      setUpdateAddressList((prevAddressList) => {
        const newAddressList = [
          ...prevAddressList,
          {
            id: 1,
            addressName: addressName,
            name: addressUserName,
            tel: addressUserTel,
            address_main: addressMain,
            address_sub: addressDetail,
          },
        ];

        setUpdateUserInfo((prevUserInfo) => {
          const newUserInfo = {
            ...prevUserInfo,
            extra: {
              ...prevUserInfo.extra,
              address: newAddressList,
            },
          };

          api.updateUserInfo(userId, newUserInfo);

          return newUserInfo;
        });

        return newAddressList;
      });
    } catch (error) {
      console.log(error);
    }

    resetData();
    reloadUserInfo();
    handleClose();
  };

  // userInfo update
  const handleUpdateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.updateUserInfo(userId, updateUserInfo);
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
              내 정보 수정하기
            </Button>
          </Form>

          <Typography variant="body1" sx={{ marginTop: '1rem' }}>
            기본 배송지
          </Typography>
          {userInfo.extra.address.length < 1 ? (
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
              {userInfo.extra.address.map((list) => (
                <Box
                  key={list.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    marginY: '1rem',
                  }}
                  height={'100px'}
                >
                  <Typography variant="body1" sx={{ marginBottom: '0.3rem' }}>
                    {list.addressName}
                  </Typography>
                  <Typography variant="body2">{list.name}</Typography>
                  <Typography variant="body2">{list.tel}</Typography>
                  <Typography variant="body2">
                    {list.address_main} {list.address_sub}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </>
      )}

      <>
        {/* 모달 */}
        <Form onSubmit={submitAddressForm}>
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
                    onChange={(e) => setAddressName(e.target.value)}
                    size="small"
                    fullWidth
                    required
                    sx={{ marginBottom: '1rem' }}
                    error={!!addressNameError}
                    helperText={addressNameError}
                  />
                  <FormLabel>수령인*</FormLabel>
                  <TextField
                    type="text"
                    placeholder="이름"
                    name="name"
                    onChange={(e) => setAddressUserName(e.target.value)}
                    size="small"
                    fullWidth
                    required
                    sx={{ marginBottom: '1rem' }}
                    error={!!addressUserNameError}
                    helperText={addressUserNameError}
                  />
                  <FormLabel>연락처*</FormLabel>
                  <TextField
                    type="tel"
                    placeholder="-없이 입력"
                    name="tel"
                    onChange={(e) =>
                      setAddressUserTel(
                        (e.target.value = e.target.value.replace(
                          /[^0-9]/g,
                          '',
                        )),
                      )
                    }
                    size="small"
                    fullWidth
                    required
                    sx={{ marginBottom: '1rem' }}
                    error={!!addressUserTelError}
                    helperText={addressUserTelError}
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
                    error={!!addressMainError}
                    helperText={addressMainError}
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
                    error={!!addressDetailError}
                    helperText={addressDetailError}
                  />
                  <Button
                    type="button"
                    size="large"
                    variant="contained"
                    fullWidth
                    onClick={submitAddressForm}
                  >
                    등록하기
                  </Button>
                  <ModalClose onClick={resetData} />
                </Box>
              </ModalDialog>
            </Modal>
          </FormControl>
        </Form>
      </>
    </Container>
  );
}
