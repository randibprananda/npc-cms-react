import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetNews = (limit, page, title) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.news', limit, page, title],
    queryFn: async () => {
      const response = await Api.get(`/news/get?limit=${limit}&page=${page}&title=${title} `);
      return response;
    },
  });

  return {
    data: data?.data?.results,
    isLoading,
    refetch,
  };
};
