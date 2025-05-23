'use client';
import React, { memo } from 'react';
import {
  TextField,
  Typography,
  SxProps,
  InputAdornment,
  Box,
} from '@mui/material';
import theme from '@app/theme';

interface InputProps {
  name: string;
  label: string;
  labelSx?: SxProps;
  wrapperSx?: SxProps;
  type?: 'text' | 'email' | 'phone' | 'password' | 'number';
  endAdornment?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  // disable-no-any
  register?: any;
  error?: string;
}

const InputComponent: React.FC<InputProps> = (props) => {
  const {
    label,
    name,
    type = 'text',
    placeholder,
    className = '',
    labelSx,
    wrapperSx,
    required = false,
    disabled = false,
    register,
    error,
    endAdornment,
  } = props;

  // const [inputType, setInputType] = useState(type);
  // const [showPassword, setShowPassword] = useState(false);

  // // Memoize handlers to prevent unnecessary re-renders
  // const handleClickShowPassword = useCallback(() => {
  //   setShowPassword((prev) => !prev);
  //   setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  // }, []);

  // const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // }, []);

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
        type={type}
        // type={inputType}
        placeholder={placeholder}
        // required={required}
        disabled={disabled}
        InputProps={{
          startAdornment:
            type === 'phone' ? (
              <InputAdornment position="start">+91</InputAdornment>
            ) : undefined,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
        }}
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
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
    },
    '& .MuiInputBase-input::placeholder': {
      color: theme.palette.primary.contrastText,
    },
    '& .MuiOutlinedInput-root': {
      height: '38px !important',
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
      // Autofill styling
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: theme.palette.text.primary,
        caretColor: theme.palette.text.primary,
        borderRadius: 'inherit',
        fontFamily: 'inherit',
      },
      '& input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: theme.palette.text.primary,
      },
      '& input:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
      },
      '& .MuiInputAdornment-root': {
        marginRight: '0',
      },
      '& .MuiTypography-root': {
        fontSize: '0.8rem',
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
export const Input = memo(InputComponent);
