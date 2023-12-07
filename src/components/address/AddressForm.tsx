import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import Modal from '@mui/joy/Modal';
import { useState } from 'react';
import { ModalClose, ModalDialog } from '@mui/joy';

export interface IUserInfoAddress {
  address: string;
  handleChangeUserAddress: (address: string) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #898989',
  boxShadow: 24,
  p: 4,
};

export default function AddressForm({
  address,
  handleChangeUserAddress,
}: IUserInfoAddress) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {
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
          <Typography variant="body2">등록된 배송지가 없습니다.</Typography>

          <Button
            size={'small'}
            variant="outlined"
            sx={{ marginTop: '0.5rem' }}
            onClick={handleOpen}
          >
            배송지 등록
          </Button>
        </Box>
      }

      <>
        <FormControl>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalDialog size="lg">
              <Box sx={style}>
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
                  value={address}
                  onChange={(e) => {
                    handleChangeUserAddress(e.target.value);
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
                  value={address}
                  onChange={(e) => {
                    handleChangeUserAddress(e.target.value);
                  }}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <FormLabel>연락처*</FormLabel>
                <TextField
                  type="text"
                  placeholder="-없이 입력"
                  value={address}
                  onChange={(e) => {
                    handleChangeUserAddress(e.target.value);
                  }}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <FormLabel>배송 주소*</FormLabel>
                <TextField
                  type="text"
                  placeholder="예) 서울특별시 강남구 테헤란로 443 "
                  value={address}
                  onChange={(e) => {
                    handleChangeUserAddress(e.target.value);
                  }}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '0.4rem' }}
                />
                <TextField
                  type="text"
                  placeholder="나머지 주소를 입력하세요 "
                  value={address}
                  onChange={(e) => {
                    handleChangeUserAddress(e.target.value);
                  }}
                  size="small"
                  fullWidth
                  required
                  sx={{ marginBottom: '1rem' }}
                />
                <Button size="large" variant="contained" fullWidth>
                  등록하기
                </Button>
                <ModalClose />
              </Box>
            </ModalDialog>
          </Modal>
        </FormControl>
      </>
      {address && (
        <>
          <TextField
            type="text"
            placeholder="주소를 입력해주세요"
            value={address}
            onChange={(e) => {
              handleChangeUserAddress(e.target.value);
            }}
            size="small"
            fullWidth
          />
        </>
      )}
    </>
  );
}
