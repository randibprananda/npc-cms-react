import { toast } from 'react-toastify';

export const showToastMessage = (message, type) => {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    type,
  });
};
