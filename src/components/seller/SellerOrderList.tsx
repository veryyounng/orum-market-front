import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

const _id = localStorage.getItem('_id');
export default function SellerOrderList() {
  return (
    <div>
      SellerOrderList
      <Link to={`/user/${_id}/product-create`}>
        <Button variant="contained">등록하기</Button>
      </Link>
    </div>
  );
}
