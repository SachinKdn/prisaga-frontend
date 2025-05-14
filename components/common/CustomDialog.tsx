import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { ReactNode } from 'react';
import CloseIcon from '@assets/svg/close.svg';
import theme from '@/app/theme';

interface Props {
  open: boolean;
  isCrossIcon?: boolean;
  onClose: () => void;
  title: string;
  buttonTitle1: string;
  buttonTitle2: string;
  children?: ReactNode;
  onConfirm: () => void;
  isLoading?: boolean;
}
const CustomDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  children,
  isCrossIcon = true,
  onConfirm,
  buttonTitle1,
  buttonTitle2,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={styles.dialog}
    >
      <DialogTitle>
        {title}
        {isCrossIcon && (
          <CloseIcon
            style={{
              cursor: 'pointer',
              float: 'right',
              marginLeft: '20px',
              marginTop: '10px',
            }}
            onClick={onClose}
          />
        )}
      </DialogTitle>
      <DialogContent>
        {children}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            marginTop: '15px',
          }}
        >
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            sx={styles.closeBtn}
          >
            {buttonTitle1}
          </Button>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={styles.submit}
            onClick={onConfirm}
          >
            {isLoading ? (
              <CircularProgress size={22} style={{ color: 'white' }} />
            ) : (
              buttonTitle2
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
const styles = {
  dialog: {
    '& .MuiPaper-root': {
      maxWidth: '492px',
      boxShadow: '0px 2px 30px 0px #0000000F',
      borderRadius: '8px',
      width: 'fit-content',
      minWidth: '292px',
    },
  },
  submit: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: '#fff',
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
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ':hover': {
      borderColor: '#FD0015',
    },
  },
};
