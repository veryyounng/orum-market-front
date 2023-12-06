import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export interface IUserInfoAddress {
  address: string;
  handleChangeUserAddress: (address: string) => void;
}

export default function AddressForm({
  address,
  handleChangeUserAddress,
}: IUserInfoAddress) {
  const _id = localStorage.getItem('_id');
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
          <Link to={`/user/${_id}/buyer-info/address`}>
            <Button
              size={'small'}
              variant="outlined"
              sx={{ marginTop: '0.5rem' }}
            >
              배송지 등록
            </Button>
          </Link>
        </Box>
      }
      {address && (
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
      )}
    </>
  );
}
