import { Box, Typography } from '@mui/material';
import theme from '@/app/theme';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function SupportPage() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentWrapper}>
        <Box sx={styles.headerSection}>
          <Typography variant="body2" sx={styles.getStarted}>
            Get Started
          </Typography>
          <Typography variant="h1" sx={styles.heading}>
            Get in touch with us.
          </Typography>
          <Typography variant="h2" sx={styles.subHeading}>
            We&apos;re here to assist you.
          </Typography>
        </Box>

        <Box sx={styles.socialLinks}>
          <Box component="a" href="#" sx={styles.socialIcon}>
            <FacebookIcon />
          </Box>
          <Box component="a" href="#" sx={styles.socialIcon}>
            <InstagramIcon />
          </Box>
          <Box component="a" href="#" sx={styles.socialIcon}>
            <TwitterIcon />
          </Box>
        </Box>

        <Box sx={styles.contactSection}>
          <Box sx={styles.contactInfo}>
            <Box sx={styles.contactDetails}>
              <Box sx={styles.contactColumn}>
                <Typography sx={styles.contactLabel}>Contact Info</Typography>
                <Typography sx={styles.contactSubTitle}>
                  We are always happy to assist you
                </Typography>
              </Box>
              <Box sx={styles.contactColumn}>
                <Typography sx={styles.contactLabel}>Email Address</Typography>
                <Typography sx={styles.contactValue}>
                  preeti.singh@prisaga.com
                </Typography>
                <Typography sx={styles.contactDetail}>
                  Assistance hours:
                </Typography>
                <Typography sx={styles.contactDetail}>
                  Monday - Friday 8 am to 8 pm IST
                </Typography>
              </Box>
              <Box sx={styles.contactColumn}>
                <Typography sx={styles.contactLabel}>Number</Typography>
                <Typography sx={styles.contactValue}>
                  (+91) 93548-49468
                </Typography>
                <Typography sx={styles.contactDetail}>
                  Assistance hours:
                </Typography>
                <Typography sx={styles.contactDetail}>
                  Monday - Friday 8 am to 8 pm IST
                </Typography>
              </Box>
            </Box>
          </Box>
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
    position: 'relative',
  },
  headerSection: {
    marginBottom: '3rem',
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
  socialLinks: {
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  socialIcon: {
    color: theme.palette.text.primary,
    transition: 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  contactSection: {
    width: '100%',
    marginTop: '2rem',
  },
  contactInfo: {
    marginTop: '4rem',
  },
  contactTitle: {
    fontSize: '1.15rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  contactSubTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: '2rem',
  },
  contactDetails: {
    display: 'flex',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  contactColumn: {
    flex: 1,
    minWidth: '250px',
  },
  contactLabel: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: '0.5rem',
  },
  contactValue: {
    fontSize: '1rem',
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: '1rem',
    textDecoration: 'none',
  },
  contactDetail: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.5,
  },
};
