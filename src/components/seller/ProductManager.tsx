import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const _id = localStorage.getItem('_id');
export default function ProductManager() {
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/user/${_id}/product-update`);
  };
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div>
      ProductManager
      <Button onClick={handleUpdate}>수정하기</Button>
      <Button onClick={handleCancel}>취소</Button>
    </div>
  );
}
