import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetAthletesById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.athletes.id', id],
    queryFn: async () => {
      const response = await Api.get(`/athletes/get/${id}`);
      return response;
    },
  });

  return {
    data: data?.data[0],
    isLoading,
    refetch,
  };
};
