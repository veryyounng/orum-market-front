import { api } from '../api/api';
import { useQuery, UseQueryResult } from 'react-query';
import { IProductListQueryParams, IProductListResponse } from '../type';

export const useFetchProducts = ({
  page,
  limit,
  ...restQuery
}: IProductListQueryParams): UseQueryResult<IProductListResponse, Error> => {
  return useQuery(
    ['productList', { page, limit, ...restQuery }],
    () => {
      const response = api.getProductList({
        page,
        limit,
        ...restQuery,
      } as IProductListQueryParams);
      return response;
    },
    {
      keepPreviousData: true,
    },
  );
};
