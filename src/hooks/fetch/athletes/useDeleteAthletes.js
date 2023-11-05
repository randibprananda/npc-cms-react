import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const useDeleteAthletes = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const response = await Api.delete(`/athletes/delete/${id}`);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
