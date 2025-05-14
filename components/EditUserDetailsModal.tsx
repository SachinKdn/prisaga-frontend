import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EmailConfirmationImage from '@assets/png/emailConfirmation.png';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import CloseIcon from '@assets/svg/close.svg';
import { UserFormSchema } from '@/utils/yup';
import theme from '@/app/theme';
import { createUser, updateUser } from '@api/client';
import handleSuccess from '@/hooks/handleSuccess';
import { Input } from './common/Input';
import Image from 'next/image';
interface UserDetailsFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: User;
  isEdit: boolean;
  isSuperAdmin?: boolean;
  onUserCreated?: (user: User) => void;
  handleUserUpdated?: (user: User) => void;
}

const EditUserDetailsModal: React.FC<UserDetailsFormProps> = ({
  open,
  onClose,
  initialData,
  isEdit,
  onUserCreated,
  handleUserUpdated,
}) => {
  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserInput>({
    resolver: yupResolver(UserFormSchema),
    context: { isEdit },
  });
  useEffect(() => {
    if (initialData && isEdit) {
      reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        phoneNumber: initialData.phoneNumber,
        username: initialData.username,
        email: initialData.email,
      });
    }
  }, [initialData, isEdit, reset]);
  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    console.log('submitted---', data);
    setLoading(true);
    if (!isEdit) {
      const result = await createUser(data);
      console.log(result);
      if (result && onUserCreated) {
        handleSuccess('Invitation Sent Successfully');
        setIsCreated(true);
        onUserCreated(result);
      }
    } else {
      const result = await updateUser(data, initialData!._id);
      console.log(result);
      if (result && handleUserUpdated) {
        handleSuccess('User Details Updated Successfully');
        handleUserUpdated(result);
      }
      onClose();
    }
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
        {!isEdit
          ? isCreated
            ? 'Invitation Sent'
            : 'Add User'
          : 'Edit User Details'}
        <CloseIcon
          style={{ cursor: 'pointer', float: 'right', marginTop: '10px' }}
          onClick={onClose}
        />
      </DialogTitle>
      <DialogContent>
        {!isCreated ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.form}>
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
                disabled={isEdit}
                placeholder="Enter email"
                register={register}
                error={errors.email?.message}
              />
              <Input
                name="username"
                type="text"
                label="UserName"
                placeholder="Create username"
                register={register}
                error={errors.username?.message}
              />
              <Input
                name="phoneNumber"
                type="phone"
                label="Phone Number"
                placeholder="Enter Phone Number"
                register={register}
                error={errors.phoneNumber?.message}
              />

              <DialogActions>
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
                    `${!isEdit ? 'Submit' : 'Update'}`
                  )}
                </Button>
              </DialogActions>
            </Box>
          </form>
        ) : (
          <Box>
            <Box sx={styles.imgWrapper}>
              <Image
                src={EmailConfirmationImage}
                alt="email image"
                style={styles.confirmImg}
              />
            </Box>
            <Typography sx={styles.thankHeading}>
              We have just sent invitation link to
            </Typography>
            <Typography sx={styles.email}>{watch('email')}</Typography>
            {/* <Typography sx={styles.thank}>
              Click the link to verify and create password.{' '}
            </Typography> */}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDetailsModal;

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
      // padding: '0 10px'
    },
    '& .MuiDialogTitle-root': {
      padding: '16px 24px',
      paddingBottom: '0px',
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'space-between',
      paddingX: 0,
      paddingBottom: '0px',
      paddingTop: '16px',
    },
  },
  btn: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
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
    fontSize: '12px',
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
    borderRadius: '8px',
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
    borderRadius: '8px',
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
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  email: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: theme.palette.primary.main,

    textAlign: 'center',
  },
  thank: {
    textAlign: 'center',
    fontSize: '0.77rem',
    marginTop: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
};
