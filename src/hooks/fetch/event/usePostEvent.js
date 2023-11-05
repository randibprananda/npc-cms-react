import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const usePostEvent = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/events/create', data);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
