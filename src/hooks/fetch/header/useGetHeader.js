import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetHeader = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.header'],
    queryFn: async () => {
      const response = await Api.get(`/header/get`);
      return response;
    },
  });

  return {
    data: data?.data?.results?.data[0],
    isLoading,
    refetch,
  };
};
