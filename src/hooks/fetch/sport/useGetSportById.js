import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetSportById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.sport.id', id],
    queryFn: async () => {
      const response = await Api.get(`/sports/get/${id}`);
      return response;
    },
  });

  return {
    data: data?.data[0],
    isLoading,
    refetch,
  };
};
