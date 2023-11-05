import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetNewsById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.news.id', id],
    queryFn: async () => {
      const response = await Api.get(`/news/get/${id}`);
      return response;
    },
  });

  return {
    data: data?.data[0],
    isLoading,
    refetch,
  };
};
