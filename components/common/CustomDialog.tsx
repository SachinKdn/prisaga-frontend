import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { ReactNode } from 'react';
import CloseIcon from '@assets/svg/close.svg';
import theme from '@/app/theme';

interface Props {
  open: boolean;
  isCrossIcon?: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
const CustomDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  children,
  isCrossIcon = true,
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
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
const styles = {
  dialog: {
    '& .MuiPaper-root': {
      maxWidth: '492px',
      boxShadow: '0px 2px 30px 0px #0000000F',
      borderRadius: '20px',
      width: 'fit-content',
      minWidth: '292px',
    },
  },
  btn: {
    width: '100%',
    height: '47px',
    borderWidth: '1.5px',
    color: theme.palette.primary.main,
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
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
    height: '47px',
    borderWidth: '1.5px',
    borderColor: '#FD0015',
    color: '#FD0015',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      borderColor: '#FD0015',
    },
  },
};
