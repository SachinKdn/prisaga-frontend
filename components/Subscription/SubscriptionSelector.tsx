import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import theme from '@app/theme';
import { SubscriptionType } from '@constant/enum';
import { sendUpgradeRequest } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EmailConfirmationImage from '@assets/png/emailConfirmation.png';

const SubscriptionSelector = () => {
  const [loadingPlan, setLoadingPlan] = useState<SubscriptionType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionType | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const storedPlan = localStorage.getItem('selectedSubscriptionPlan');
    if (storedPlan) {
      setSelectedPlan(storedPlan as SubscriptionType);
    }
  }, []);

  const onSelect = async (value: SubscriptionType) => {
    setLoadingPlan(value);
    const result = await sendUpgradeRequest({ subscriptionType: value });
    setLoadingPlan(null);
    if (result) {
      handleSuccess(result);
      setSelectedPlan(value);
      localStorage.setItem('selectedSubscriptionPlan', value);
    }
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@prisaga.com';
  };

  interface SubscriptionPlan {
    title: SubscriptionType;
    price: string;
    originalPrice: string;
    validity: string;
    discount: string;
    features: string[];
    recommended?: boolean;
    bonus?: string;
  }

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      title: SubscriptionType.LITE,
      price: '1,700',
      originalPrice: '8,500',
      validity: '5 years',
      discount: '20%',
      features: [
        '12 Prime job engagements',
        'Earn up to 20% higher income on placements',
        'Get faster payments (within 60 days)',
        'Collaborate and add up to 4 team members',
        "Gain 48 hours exclusive (early) to 'Premium' jobs",
      ],
    },
    {
      title: SubscriptionType.PREMIUM,
      price: '2,500',
      originalPrice: '5,000',
      validity: '1 year',
      discount: '50%',
      recommended: true,
      bonus: '',
      features: [
        '40 Prime job engagements',
        'Earn up to 20% higher income on placements',
        'Get faster payments (within 60 days)',
        'Collaborate and add up to 10 team members',
        "Gain 48 hours exclusive (early) to 'Premium' jobs",
      ],
    },
  ];

  if (selectedPlan) {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.successWrapper}>
          <Box sx={styles.imageContainer}>
            <Image
              src={EmailConfirmationImage}
              alt="Success illustration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain' as const,
              }}
              priority
            />
          </Box>

          <Typography sx={styles.successHeading}>
            Your Subscription Request Has Been Submitted!
          </Typography>

          <Typography sx={styles.successSubHeading}>
            Thank you for choosing our {selectedPlan} plan. Our team will review
            your request and connect with you shortly.
          </Typography>

          <Box sx={styles.infoContainer}>
            <Typography sx={styles.infoText}>What happens next?</Typography>
            <Box sx={styles.stepsContainer}>
              <Box sx={styles.step}>
                <Box sx={styles.stepNumber}>1</Box>
                <Typography sx={styles.stepText}>
                  Our team will review your subscription request
                </Typography>
              </Box>
              <Box sx={styles.step}>
                <Box sx={styles.stepNumber}>2</Box>
                <Typography sx={styles.stepText}>
                  Our team will connect with you
                </Typography>
              </Box>
              <Box sx={styles.step}>
                <Box sx={styles.stepNumber}>3</Box>
                <Typography sx={styles.stepText}>Buy Subscription</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.contactSupport}>
            <Typography sx={styles.contactTitle}>Need Help?</Typography>
            <Typography sx={styles.contactText}>
              Contact our support team:
            </Typography>
            <Typography sx={styles.contactInfo}>
              Email: support@prisaga.com
            </Typography>
            <Typography sx={styles.contactInfo}>
              Phone: +91 9879879870
            </Typography>
            <Button
              variant="outlined"
              onClick={handleContactSupport}
              sx={styles.contactButton}
            >
              Contact Support
            </Button>
          </Box>

          <Button
            variant="contained"
            onClick={handleGoToHome}
            sx={styles.homeButton}
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Subscription plans
      </Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        Agency Partner Privilege Program
      </Typography>

      <Box sx={styles.plansContainer}>
        {subscriptionPlans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              ...styles.planCard,
              ...(plan.recommended ? styles.recommendedCard : {}),
            }}
          >
            {plan.recommended && (
              <Typography sx={styles.recommendedLabel}>Recommended</Typography>
            )}
            <Typography variant="h5" sx={styles.planTitle}>
              {plan.title}
            </Typography>

            <Box sx={styles.priceSection}>
              {plan.discount && (
                <Typography component="span" sx={styles.payText}>
                  Pay Rs.{plan.price} -{plan.discount}
                </Typography>
              )}
              <Typography sx={styles.price}>
                Price :{' '}
                {plan.discount ? (
                  <Typography component="span" sx={styles.strikethrough}>
                    {plan.originalPrice}
                  </Typography>
                ) : (
                  plan.price
                )}
              </Typography>
              <Typography sx={styles.validity}>
                valid for {plan.validity}
              </Typography>
              {plan.bonus && (
                <Typography sx={styles.bonus}>{plan.bonus}</Typography>
              )}
            </Box>

            <Box sx={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <Typography key={idx} sx={styles.feature}>
                  ✓ {feature}
                </Typography>
              ))}
            </Box>

            <Button
              variant={plan.recommended ? 'contained' : 'outlined'}
              sx={{
                ...styles.upgradeButton,
                color: plan.recommended ? 'white' : '',
              }}
              onClick={() => onSelect(plan.title)}
              disabled={loadingPlan !== null}
            >
              {loadingPlan === plan.title ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Upgrade'
              )}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SubscriptionSelector;

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    paddingTop: '0',
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    mb: 1,
  },
  subtitle: {
    textAlign: 'center',
    color: 'text.secondary',
    mb: 4,
  },
  plansContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  planCard: {
    position: 'relative',
    width: '450px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid #e0e0e0',
  },
  recommendedCard: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  recommendedLabel: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.875rem',
  },
  planTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'center',
  },
  priceSection: {
    textAlign: 'center',
    mb: 2,
  },
  payText: {
    color: '#333',
    '& span': {
      color: 'error.main',
    },
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 500,
    mt: 1,
  },
  strikethrough: {
    textDecoration: 'line-through',
    color: 'text.secondary',
  },
  validity: {
    color: 'text.secondary',
    fontSize: '0.875rem',
    mt: 0.5,
  },
  bonus: {
    color: theme.palette.primary.main,
    fontSize: '0.875rem',
    fontWeight: 500,
    mt: 0.5,
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  feature: {
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  upgradeButton: {
    textTransform: 'none',
    borderRadius: '24px',
    ':hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  successWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    paddingTop: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
  },
  imageContainer: {
    width: '200px',
    height: '200px',
    marginBottom: '2rem',
    position: 'relative',
  },
  successHeading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: '0.4rem',
  },
  successSubHeading: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  infoContainer: {
    width: '100%',
    marginBottom: '2rem',
  },
  infoText: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: '0.75rem',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 600,
  },
  stepText: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  contactSupport: {
    width: '100%',
    padding: '2rem',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  contactTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: '1rem',
  },
  contactText: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginBottom: '0.5rem',
  },
  contactInfo: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    marginBottom: '0.25rem',
  },
  contactButton: {
    marginTop: '1rem',
    textTransform: 'none',
  },
  homeButton: {
    width: '100%',
    maxWidth: '300px',
    height: '48px',
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'none',
    color: 'white',
    ':hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
};
