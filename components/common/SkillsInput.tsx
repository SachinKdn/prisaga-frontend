'use client';
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import theme from '@app/theme';

interface Props {
  value: string[];
  onChange: (skills: string[]) => void;
  error?: string;
  placeholder?: string;
  label?: string;
}

const SkillsInput = ({
  value,
  onChange,
  error,
  placeholder = 'More than 3 skills',
  label = 'Skills',
}: Props) => {
  const [currentSkill, setCurrentSkill] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      if (!value.includes(currentSkill.trim())) {
        onChange([...value, currentSkill.trim()]);
      }
      setCurrentSkill('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSkill(e.target.value);
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    onChange(value.filter((skill) => skill !== skillToDelete));
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.labelText}>{label}</Typography>
      <TextField
        value={currentSkill}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        multiline
        placeholder={placeholder}
        sx={styles.textField}
      />
      {error && (
        <Typography
          sx={styles.error}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          {error}
        </Typography>
      )}
      <Box sx={styles.chipWrapper}>
        {value.map((skill, index) => (
          <Button
            variant="text"
            onClick={() => handleDeleteSkill(skill)}
            sx={styles.chip}
            endIcon={<CancelIcon fontSize="small" sx={{ height: '15px' }} />}
            key={index}
          >
            {skill}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SkillsInput;

const styles = {
  wrapper: {
    width: '100%',
  },
  labelText: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: theme.palette.text.secondary,
    marginBottom: '0.5rem',
  },
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      fontSize: '0.85rem',
      padding: '8px 12px',
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  error: {
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  chip: {
    backgroundColor: '#e7e7e7',
    color: theme.palette.text.secondary,
    fontSize: '0.78rem',
    padding: '4px 12px',
    borderRadius: '16px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ddd9d9',
    },
  },
};
