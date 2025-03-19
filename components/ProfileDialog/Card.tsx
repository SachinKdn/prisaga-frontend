import { Box, Theme, Typography, useTheme } from '@mui/material';
import { createStyles } from '@mui/styles';
import Link from 'next/link';
import React from 'react';

interface Props {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  href: string; // Change to href instead of to
  onClick: () => void;
}

const Card: React.FC<Props> = (props: Props) => {
  const { icon, name, href, onClick } = props;
  const theme = useTheme();
  const styles = useStyle(theme);
  const Icon = icon;

  return (
    <Box
      sx={styles.outerWrapper}
      component={Link}
      href={href}
      onClick={onClick}
    >
      <Box sx={styles.iconWrapper}>
        <Icon />
      </Box>
      <Typography variant="body1" sx={styles.title} width="100%">
        {name}
      </Typography>
    </Box>
  );
};

export default Card;

const useStyle = (theme: Theme) =>
  createStyles({
    outerWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      textDecoration: 'none',
      width: '100%',
    },

    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontSize: '0.88rem',
      fontWeight: 400,
      fontFamily: 'Sora',
      lineHeight: '24.54px',
      // color: '#5B617A',
      color: '#333333',
      [theme.breakpoints.down('md')]: {
        fontSize: '12px',
        lineHeight: '20px',
      },
    },
  });
