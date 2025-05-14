import { Box, Typography } from '@mui/material';
import theme from '@/app/theme';
import ActivePlanActions from '@components/Subscription/ActivePlanActions';

export default function SubscriptionPlanPage() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentWrapper}>
        <Box sx={styles.headerSection}>
          <Typography variant="body2" sx={styles.getStarted}>
            Subscription Details
          </Typography>
          <Typography variant="h1" sx={styles.heading}>
            Your Active Plan
          </Typography>
          <Typography variant="h2" sx={styles.subHeading}>
            View and manage your subscription
          </Typography>
        </Box>

        <Box sx={styles.planSection}>
          <ActivePlanActions />
        </Box>

        <Box sx={styles.supportSection}>
          <Typography sx={styles.supportTitle}>Need Help?</Typography>
          <Typography sx={styles.supportText}>
            Contact our support team for any subscription related queries:
          </Typography>
          <Typography sx={styles.contactInfo}>
            Email: preeti.singh@prisaga.com
          </Typography>
          <Typography sx={styles.contactInfo}>
            Phone: (+91) 93548-49468
          </Typography>
          <Typography sx={styles.supportHours}>
            Support Hours: Monday - Friday 8 am to 8 pm IST
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    padding: { xs: '2rem', md: '4rem' },
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  headerSection: {
    marginBottom: '2rem',
  },
  getStarted: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: '1rem',
  },
  heading: {
    fontSize: { xs: '2.5rem', md: '3.5rem' },
    fontWeight: 700,
    color: theme.palette.primary.main,
    lineHeight: 1.2,
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginBottom: '2rem',
  },
  planSection: {
    width: '100%',
    marginBottom: '3rem',
  },
  supportSection: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  supportTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: '1rem',
  },
  supportText: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginBottom: '1rem',
  },
  contactInfo: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    marginBottom: '0.5rem',
  },
  supportHours: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginTop: '1rem',
  },
};
