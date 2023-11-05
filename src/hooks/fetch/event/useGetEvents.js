import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetEvents = (limit, page, title, location) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.events', limit, page, title, location],
    queryFn: async () => {
      const response = await Api.get(`/events/get?limit=${limit}&page=${page}&title=${title}&location=${location}`);
      return response;
    },
  });

  return {
    data: data?.data?.results,
    isLoading,
    refetch,
  };
};
