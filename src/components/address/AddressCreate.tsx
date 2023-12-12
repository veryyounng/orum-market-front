import { Box, Container, Typography } from '@mui/material';
import AddressForm from './AddressForm';

export default function AddressCreate() {
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
            주소지 입력
          </Typography>
          <Typography id="modal-modal-title" variant="subtitle2" component="h2">
            * 필수
          </Typography>
        </Box>
        <Typography sx={{ marginBottom: '1rem' }}>
          주소는 3개까지만 등록가능합니다.
        </Typography>
      </Container>
      <AddressForm />
    </>
  );
}
