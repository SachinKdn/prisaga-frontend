'use client';

import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import theme from '@/app/theme';
import { SubscriptionType } from '@constant/enum';
import { sendUpgradeRequest } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ActivePlanActions = () => {
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const handleUpgrade = async () => {
    setLoading(true);
    const result = await sendUpgradeRequest({
      subscriptionType: SubscriptionType.PREMIUM,
    });
    setLoading(false);
    if (result) {
      handleSuccess(result);
    }
  };

  const getPlanDetails = (plan: SubscriptionType) => {
    switch (plan) {
      case SubscriptionType.LITE:
        return {
          price: '1,700',
          validity: '5 years',
          features: [
            '12 Prime job engagements',
            'Earn up to 20% higher income on placements',
            'Get faster payments (within 60 days)',
            'Collaborate and add up to 4 team members',
            "Gain 48 hours exclusive (early) to 'Premium' jobs",
          ],
        };
      case SubscriptionType.PREMIUM:
        return {
          price: '2,500',
          validity: '1 year',
          features: [
            '40 Prime job engagements',
            'Earn up to 20% higher income on placements',
            'Get faster payments (within 60 days)',
            'Collaborate and add up to 10 team members',
            "Gain 48 hours exclusive (early) to 'Premium' jobs",
          ],
        };
      default:
        return null;
    }
  };

  if (!user?.agency) return null;

  const planDetails = getPlanDetails(user?.agency?.subscriptionType);
  if (!planDetails) return null;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.planCard}>
        <Box sx={styles.planHeader}>
          <Box>
            <Typography sx={styles.planType}>
              {user?.agency?.subscriptionType} Plan
            </Typography>
            <Typography sx={styles.planPrice}>
              ₹{planDetails.price}
              <Typography component="span" sx={styles.validity}>
                / {planDetails.validity}
              </Typography>
            </Typography>
          </Box>
          {user?.agency?.subscriptionType === SubscriptionType.LITE && (
            <Button
              variant="contained"
              onClick={handleUpgrade}
              disabled={loading}
              sx={styles.upgradeButton}
            >
              Upgrade to Premium
            </Button>
          )}
        </Box>

        <Box sx={styles.divider} />

        <Box sx={styles.featuresSection}>
          <Typography sx={styles.featuresTitle}>Your Plan Features</Typography>
          <Box sx={styles.featuresList}>
            {planDetails.features.map((feature, index) => (
              <Box key={index} sx={styles.featureItem}>
                <Typography sx={styles.checkmark}>✓</Typography>
                <Typography sx={styles.featureText}>{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  planHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  planType: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: '0.5rem',
    textTransform: 'capitalize',
  },
  planPrice: {
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  validity: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  upgradeButton: {
    height: '48px',
    textTransform: 'none',
    borderRadius: '24px',
    padding: '0 2rem',
    color: 'white',
    ':hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '1.5rem 0',
  },
  featuresSection: {
    marginTop: '1.5rem',
  },
  featuresTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: '1.5rem',
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  checkmark: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  featureText: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
};

export default ActivePlanActions;
