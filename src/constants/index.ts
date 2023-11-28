const _id = localStorage.getItem('_id');

export const DASHBOARD_MENU = {
  buyer: [
    {
      id: 1,
      title: '구매자 대시보드',
      url: `/user/${_id}`,
    },
    {
      id: 2,
      title: '내 정보 수정',
      url: `/user/${_id}/buyer-info`,
    },
    {
      id: 3,
      title: '주문 내역',
      url: `/user/${_id}/buyer-orderlist`,
    },
    {
      id: 4,
      title: '찜한 상품',
      url: `/user/${_id}/buyer-favorite`,
    },
    {
      id: 5,
      title: '최근 본 상품',
      url: `/user/${_id}/buyer-orderlist`,
    },
  ],

  seller: [
    {
      id: 1,
      title: '판매자 대시보드',
      url: `/user/${_id}/seller-orderlist`,
    },
    {
      id: 2,
      title: '판매자 정보',
      url: `/user/${_id}/seller-info`,
    },
    {
      id: 3,
      title: '상품 관리',
      url: `/user/${_id}/product-manager`,
    },
  ],
};
