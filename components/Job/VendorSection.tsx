import React from 'react';
import { Box, Typography } from '@mui/material';
import { IndianRupee, Handshake } from 'lucide-react';
import theme from '@app/theme';
import MicroChip from '../MicroChip';
import { SubscriptionType } from '@constant/enum';
interface Props {
  vendorData: IVendorData;
  subscriptionType: SubscriptionType;
}

const VendorSection = (props: Props) => {
  const { vendorData, subscriptionType } = props;

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.section}>
        <Typography sx={styles.sectionTitle}>Lite Member</Typography>
        {subscriptionType === SubscriptionType.LITE && (
          <MicroChip label="Active" textColor="#299764" bgColor="#E9F4EF" />
        )}
        <Box sx={styles.details}>
          <Box sx={styles.infoItem}>
            <Handshake size={16} color={theme.palette.primary.main} />
            <Typography sx={styles.text}>
              Commission: {vendorData.basicFeePercentage}%
            </Typography>
          </Box>
          <Box sx={styles.infoItem}>
            <IndianRupee size={16} color={theme.palette.primary.main} />
            <Typography sx={styles.text}>
              Total Amount: {vendorData.basicBillingAmount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Box sx={styles.infoItem}>
          <Typography sx={styles.sectionTitle}>Prime Member</Typography>
          {subscriptionType === SubscriptionType.PREMIUM && (
            <MicroChip label="Active" textColor="#299764" bgColor="#E9F4EF" />
          )}
        </Box>
        <Box sx={styles.details}>
          <Box sx={styles.infoItem}>
            <Handshake size={16} color={theme.palette.primary.main} />
            <Typography sx={styles.text}>
              Commission: {vendorData.premiumFeePercentage}%
            </Typography>
          </Box>
          <Box sx={styles.infoItem}>
            <IndianRupee size={16} color={theme.palette.primary.main} />
            <Typography sx={styles.text}>
              Total Amount: {vendorData.premiumBillingAmount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorSection;

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    padding: '1rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: theme.palette.text.primary,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  tickWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#E9F4EF',
    borderRadius: '14px',
    padding: '0.25rem 0.5rem',
  },
  tickText: {
    fontSize: '0.78rem',
    color: '#299764',
    fontWeight: '600',
  },
  text: {
    fontSize: '0.85rem',
    color: theme.palette.text.secondary,
    fontWeight: '500',
  },
};
