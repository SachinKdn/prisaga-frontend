'use client';
import theme from '@app/theme';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface Props {
  title: string;
  handleEdit: () => void;
}
const SectionHeader = (props: Props) => {
  const { title, handleEdit } = props;
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.title}>{title}</Typography>
      <Button
        variant="contained"
        endIcon={<ModeEditIcon sx={{ fontSize: '0.88rem !important' }} />}
        sx={styles.editButton}
        onClick={handleEdit}
      >
        Edit
      </Button>
    </Box>
  );
};

export default SectionHeader;

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 'fit-content',
    paddingBottom: '8px',
    borderBottom: '2px solid #e7e7e757',
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.primary.main,
  },
  editButton: {
    borderRadius: '4px',
    textTransform: 'none',
    color: 'white',
    height: '28px',
    fontSize: '0.68rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
  },
};
