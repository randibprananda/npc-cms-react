import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useGetCardStatistics = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.card-statiscits'],
    queryFn: async () => {
      const response = await Api.get('/athletes/get-statistic?ASEAN=ASEAN&ASIAN=ASIAN&WORLD=WORLD');
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
