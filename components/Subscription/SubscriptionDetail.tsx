import theme from '@app/theme';
import { Box, Typography } from '@mui/material';
import DiamondIcon from '@assets/svg/diamond-icon.svg';

const SubscriptionDetails = ({
  subscriptionType,
}: {
  subscriptionType: string;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        height: 'min-content',
      }}
    >
      <DiamondIcon width="28" height="28" />
      <Box sx={styles.detail}>
        <Typography variant="body2" sx={styles.detailHeading}>
          Subscription Type
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...styles.detailSubHeading,
            fontWeight: 700,
            color: theme.palette.primary.dark,
          }}
        >
          {subscriptionType}
        </Typography>
      </Box>
    </Box>
  );
};
export default SubscriptionDetails;

const styles = {
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailHeading: {
    fontWeight: 500,
    fontSize: '0.88rem',
    color: theme.palette.primary.contrastText,
  },
  detailSubHeading: {
    fontWeight: 500,
    fontSize: '0.88rem',
    color: theme.palette.primary.dark,
  },
};
