import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetAdminById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.admin.id', id],
    queryFn: async () => {
      const response = await Api.get(`/admin/get/${id}`);
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
