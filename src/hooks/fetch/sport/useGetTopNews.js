import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetTopNews = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.top-news'],
    queryFn: async () => {
      const response = await Api.get('/sports/get-top-news');
      return response;
    },
  });

  return {
    data: data?.data?.data,
    isLoading,
    refetch,
  };
};
