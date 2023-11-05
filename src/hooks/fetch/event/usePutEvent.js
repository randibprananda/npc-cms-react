import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const usePutEvent = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post(`/events/update/${data.id}`, data);
      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
