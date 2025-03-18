import toast from 'react-hot-toast';

const handleSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    style: {
      fontSize: '12px',
      fontFamily: 'Poppins',
    },
  });
  return;
};

export default handleSuccess;
