import styled from 'styled-components';
import { TextField, Button } from '@mui/material';

const AddressBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;

export default function AddressForm() {
  return (
    <>
      <AddressBox>
        <TextField
          type="text"
          placeholder="주소 검색으로 입력해주세요"
          size="small"
          sx={{ width: 'calc(100% - 90px)' }}
          disabled
        />
        <Button
          variant="outlined"
          sx={{ width: '90px', fontWeight: 700, fontSize: 15 }}
        >
          주소검색
        </Button>
      </AddressBox>
      <TextField
        type="text"
        placeholder="상세 주소를 입력해주세요"
        size="small"
        fullWidth
      />
    </>
  );
}
