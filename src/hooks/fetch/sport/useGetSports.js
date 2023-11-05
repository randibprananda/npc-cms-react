import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetSports = (limit, page, nameSport) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.sports', limit, page, nameSport],
    queryFn: async () => {
      const response = await Api.get(`/sports/get?limit=${limit}&page=${page}&name_sport=${nameSport}`);
      return response;
    },
  });

  return {
    data: data?.data?.results,
    isLoading,
    refetch,
  };
};
