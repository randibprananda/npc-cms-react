import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetAthletes = (limit, page, name) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.athletes', limit, page, name],
    queryFn: async () => {
      const response = await Api.get(`/athletes/get?limit=${limit}&page=${page}&atheletes_name=${name}`);
      return response;
    },
  });

  return {
    data: data?.data?.results,
    isLoading,
    refetch,
  };
};
