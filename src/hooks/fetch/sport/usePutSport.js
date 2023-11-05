import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const usePutSport = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post(`/sports/update/${data.id}`, data);
      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
