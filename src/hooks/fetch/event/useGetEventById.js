import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetEventById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.event.id', id],
    queryFn: async () => {
      const response = await Api.get(`/events/get/${id}`);
      return response;
    },
  });

  return {
    data: data?.data[0],
    isLoading,
    refetch,
  };
};
