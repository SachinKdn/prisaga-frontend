import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import CloseIcon from '@assets/svg/close.svg';
import { UserFormSchema } from '@/utils/yup';
import theme from '@/app/theme';
import { updateUser } from '@api/client';
import handleSuccess from '@/hooks/handleSuccess';
import { Input } from '@components/common/Input';
import { setUserInStore } from '@store/slices/user';
import { AppDispatch } from '@store';
import { useDispatch } from 'react-redux';
interface UserDetailsFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: User;
}

const UpdateProfileModal: React.FC<UserDetailsFormProps> = ({
  open,
  onClose,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInput>({
    resolver: yupResolver(UserFormSchema),
    context: { isEdit: true },
  });
  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        phoneNumber: initialData.phoneNumber,
        username: initialData.username,
        email: initialData.email,
      });
    }
  }, [initialData, reset]);
  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setLoading(true);
    const result = await updateUser(data, initialData!._id);
    console.log(result);
    if (result) {
      handleSuccess('User Details Updated Successfully');
      dispatch(setUserInStore(result));
    }
    onClose();
    setLoading(false);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={styles.dialog}
    >
      <DialogTitle sx={styles.title}>
        Update Profile
        <CloseIcon
          style={{ cursor: 'pointer', float: 'right', marginTop: '10px' }}
          onClick={onClose}
        />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styles.formWrapper}>
            <Input
              name="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              name="email"
              type="text"
              label="Email"
              disabled={true}
              placeholder="Enter email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              name="username"
              type="text"
              label="UserName"
              disabled={true}
              placeholder="Username"
              register={register}
              error={errors.username?.message}
            />
            <Input
              name="phoneNumber"
              type="text"
              label="Phone Number"
              placeholder="Enter Phone Number"
              register={register}
              error={errors.phoneNumber?.message}
            />

            <DialogActions sx={styles.diaogAction}>
              <Button
                onClick={onClose}
                color="secondary"
                variant="outlined"
                sx={styles.closeBtn}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={styles.btn}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: 'white' }} />
                ) : (
                  'Update'
                )}
              </Button>
            </DialogActions>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;

const styles = {
  title: {
    fontSize: '18px',
    fontWeight: '500',
  },
  dialog: {
    '& .MuiPaper-root': {
      maxWidth: '492px',
      boxShadow: '0px 2px 30px 0px #0000000F',
      borderRadius: '8px',
    },
  },
  diaogAction: {
    '& .MuiDialogActions-root': {
      justifyContent: 'space-between',
    },
    padding: '8px 0',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  btn: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '19.95px',
    // fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  closeBtn: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    borderColor: '#FD0015',
    color: '#FD0015',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '19.95px',
    // fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ':hover': {
      borderColor: '#FD0015',
    },
  },
  formController: {
    borderRadius: '12px',
    width: '100%',
    backgroundColor: 'white',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root': {
      fontFamily: '"Red Hat Display", sans-serif',
      color: '#040404',
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '21px',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },

    '& .MuiFormHelperText-root': {
      lineHeight: '1',
    },
    '& .MuiInputBase-input': {
      padding: '10.5px 14px',
    },
  },
  select: {
    borderRadius: '12px',
    width: '100%',
    backgroundColor: '#FAFAFA',
  },
  confirmImg: {
    width: '70%',
    height: 'auto',
    margin: 'auto',
  },
  imgWrapper: {
    display: 'grid',
    placeItems: 'center',
  },
  thankHeading: {
    fontSize: '18px',
    textAlign: 'center',
  },
  thank: {
    textAlign: 'center',
    fontSize: '13px',
    marginTop: '5px',
  },
};
