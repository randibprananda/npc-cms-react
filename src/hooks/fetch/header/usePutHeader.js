import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const usePutHeader = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post(`header/update/${data.id}`, data);
      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
