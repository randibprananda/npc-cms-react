import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const usePostNews = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/news/create', data);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
