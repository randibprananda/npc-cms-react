import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useDeleteSport = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const response = await Api.delete(`/sports/delete/${id}`);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
