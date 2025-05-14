'use client';
import React, { memo } from 'react';
import { TextField, Typography, SxProps, Box } from '@mui/material';
import theme from '@app/theme';

interface MultilineTextFieldProps {
  name: string;
  label: string;
  labelSx?: SxProps;
  wrapperSx?: SxProps;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  rows?: number;
  // disable-no-any
  register?: any;
  error?: string;
}

const MultilineTextFieldComponent: React.FC<MultilineTextFieldProps> = (
  props
) => {
  const {
    label,
    name,
    placeholder,
    className = '',
    labelSx,
    wrapperSx,
    required = false,
    disabled = false,
    register,
    error,
    rows = 3,
  } = props;

  // Compute registration props once
  const registrationProps = register ? register(name) : { name };

  return (
    <Box sx={wrapperSx} style={{ width: '100%' }}>
      {label && (
        <Typography sx={labelSx || styles.labelText}>
          {label} {required && '*'}
        </Typography>
      )}

      <TextField
        {...registrationProps}
        multiline
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className} ${error ? 'text-red-500' : 'text-light-dark'}`}
        sx={styles.textField}
      />

      {error && (
        <Typography
          sx={styles.error}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          {error || ' '}
        </Typography>
      )}
    </Box>
  );
};

// Styles separated for better organization and readability
const styles = {
  labelText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    marginBottom: '4px',
  },
  error: {
    fontSize: '0.65rem',
    color: 'red',
    lineHeight: '14px',
  },
  textField: {
    borderRadius: '12px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '8px 10px !important',
      '& .MuiTextField-root': {
        padding: '8px 10px !important',
      },
      // Autofill styling
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: '#4A4A4A',
        caretColor: '#4A4A4A',
        borderRadius: 'inherit',
        fontFamily: 'inherit',
      },
      '& input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: '#4A4A4A',
      },
      '& input:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
      },
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
      outline: 'none',
    },
    '& .MuiFormHelperText-root': {
      lineHeight: '1',
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
};

// Use memo to prevent unnecessary re-renders
export const MultilineTextField = memo(MultilineTextFieldComponent);
