import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material';
import Image from 'next/image';
import HeaderImg from '@assets/png/subscription-header-img.png';
import Available from '@assets/svg/available.svg';
import { useRouter } from 'next/navigation';
import theme from '@/app/theme';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: SubscriptionPopup;
}

const SubscriptionAlertDialog = (props: DialogProps) => {
  const { isOpen, onClose, data } = props;
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={styles.dialog}
    >
      <Box sx={styles.headerWrapper}>
        <Image
          src={HeaderImg}
          alt="Header Image"
          layout="fill"
          objectFit="contain"
          style={styles.headerImage}
        />
      </Box>
      <DialogContent sx={styles.content}>
        <DialogTitle sx={styles.title}>{data.heading}</DialogTitle>
        <Typography sx={styles.subheading}>{data.subheading}</Typography>
        <Box sx={styles.featuresWrapper}>
          <Typography sx={styles.featuresTitle}>Also Unlock:</Typography>
          <Box sx={styles.featuresList}>
            {data.accessPoints.map((feature, index) => (
              <Box key={index} sx={styles.featureItem}>
                <Available />
                <Typography sx={styles.featureText}>{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={styles.buttonWrapper}>
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            sx={styles.closeBtn}
          >
            Not Now
          </Button>
          <Button
            onClick={() => {
              router.push('/subscription');
              onClose();
            }}
            color="primary"
            variant="contained"
            sx={styles.upgradeBtn}
          >
            Upgrade
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionAlertDialog;

const styles = {
  dialog: {
    '& .MuiPaper-root': {
      maxWidth: '500px',
      boxShadow: '0px 2px 30px 0px #0000000F',
      borderRadius: '8px',
      overflow: 'hidden',
    },
  },
  headerWrapper: {
    position: 'relative',
    width: '100%',
    height: '120px',
    backgroundColor: '#0338CD',
    [theme.breakpoints.up('lg')]: {
      height: '200px',
    },
  },
  headerImage: {
    borderRadius: '8px',
  },
  content: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#0A0F1F',
    padding: 0,
    [theme.breakpoints.up('xl')]: {
      fontSize: '1rem',
    },
  },
  subheading: {
    fontSize: '0.88rem',
    color: '#676D7E',
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.75rem',
      lineHeight: '16px',
    },
  },
  featuresWrapper: {
    borderRadius: '12px',
    backgroundColor: '#EFF2F9',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    [theme.breakpoints.up('lg')]: {
      padding: '18px 12px',
    },
  },
  featuresTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#0F1C1B',
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  featureText: {
    fontSize: '0.75rem',
    color: '#0F1C1B',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '8px',
  },
  closeBtn: {
    width: '122px',
    height: '30px',
    borderWidth: '1.5px',
    borderColor: '#EFF2F9',
    color: '#5B617A',
    borderRadius: '14px',
    fontSize: '0.75rem',
    fontWeight: '500',
    [theme.breakpoints.up('lg')]: {
      height: '40px',
    },
    '&:hover': {
      borderColor: '#EFF2F9',
      backgroundColor: 'transparent',
    },
  },
  upgradeBtn: {
    width: '122px',
    height: '30px',
    backgroundColor: '#0338CD',
    color: 'white',
    borderRadius: '14px',
    fontSize: '0.8rem',
    fontWeight: '500',
    [theme.breakpoints.up('lg')]: {
      height: '40px',
    },
    '&:hover': {
      backgroundColor: '#0338CD',
    },
  },
};
