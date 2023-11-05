import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetAdmin = (limit, page, fullname) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.admin', limit, page, fullname],
    queryFn: async () => {
      const response = await Api.get(`/admin/get?limit=${limit}&page=${page}&fullname=${fullname}`);
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
