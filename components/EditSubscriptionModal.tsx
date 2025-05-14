'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
import theme from '@/app/theme';
import FormControllerSelector from './common/FormControllerSelector';
import { subscriptionTypes } from '@constant/resume-data';
import handleSuccess from '@/hooks/handleSuccess';
import { updateAgencySubscription } from '@api/client';

interface EditSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  agencyId: string;
  currentSubscription: string;
  onSubscriptionUpdated: (type: string) => void;
}

const subscriptionSchema = yup.object().shape({
  subscriptionType: yup.string().required('Subscription type is required'),
});

const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
  open,
  onClose,
  agencyId,
  onSubscriptionUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: {
      subscriptionType: '',
    },
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    setLoading(true);
    try {
      const result = await updateAgencySubscription(data, agencyId);
      if (result) {
        handleSuccess('Subscription Updated Successfully');
        if (onSubscriptionUpdated) {
          onSubscriptionUpdated(data.subscriptionType);
        }
        onClose();
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
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
        Edit Subscription
        <CloseIcon
          style={{ cursor: 'pointer', float: 'right', marginTop: '10px' }}
          onClick={onClose}
        />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styles.form}>
            <FormControllerSelector<SubscriptionFormData>
              name="subscriptionType"
              control={control}
              required
              labelText="Subscription Type"
              options={subscriptionTypes.slice(0, 2)}
              errorMessage={errors.subscriptionType?.message}
              placeholder="Select subscription type"
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
                // color="primary"
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

export default EditSubscriptionModal;

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
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ':hover': {
      borderColor: '#FD0015',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1rem',
  },
};
