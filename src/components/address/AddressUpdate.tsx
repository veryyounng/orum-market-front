import { Box, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddressForm from './AddressForm';

export default function AddressUpdate() {
  const location = useLocation();
  console.log('location', location.state);
  return (
    <>
      <Container>
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
            주소지 수정
          </Typography>
          <Typography id="modal-modal-title" variant="subtitle2" component="h2">
            * 필수
          </Typography>
        </Box>
      </Container>
      <AddressForm {...location.state} isEdit={'isEdit'} />
    </>
  );
}
