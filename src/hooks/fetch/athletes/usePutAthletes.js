import { useMutation } from '@tanstack/react-query';
import Api from '../../../lib/axios';

export const usePutAthletes = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post(`/athletes/update/${data.id}`, data);
      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
