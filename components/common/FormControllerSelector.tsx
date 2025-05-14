import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SxProps,
  Typography,
} from '@mui/material';
import { Controller, Path, FieldValues, Control } from 'react-hook-form';
import React from 'react';
import theme from '@app/theme';

// Extend Option type to support optional image
type OptionWithImage = Option & { image?: string };

interface Props<T extends FieldValues> {
  errorMessage?: string;
  options: OptionWithImage[];
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  defaultValue?: string | string[];
  labelText: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  wrapperSx?: SxProps;
  multiple?: boolean;
}

const FormControllerSelector = <T extends FieldValues>({
  errorMessage,
  options,
  control,
  name,
  defaultValue = '',
  labelText,
  placeholder,
  onSelect,
  wrapperSx,
  required = false,
  multiple = false,
}: Props<T>) => {
  return (
    <Box sx={wrapperSx} style={{ width: '100%' }}>
      <Typography sx={style.labelText}>
        {labelText} {required && '*'}
      </Typography>
      <FormControl
        fullWidth
        error={!!errorMessage}
        sx={[
          style.formController,
          {
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                border: false
                  ? '1px solid red !important'
                  : '1px solid #8B8B8B',
                outline: 'none',
              },
          },
        ]}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue as any}
          render={({ field }) => (
            <Select
              {...field}
              multiple={multiple}
              displayEmpty
              sx={style.select}
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              renderValue={(selected) => {
                if (
                  !selected ||
                  (Array.isArray(selected) && selected.length === 0)
                ) {
                  return <span style={{ color: '#aaa' }}>{placeholder}</span>;
                }
                if (multiple && Array.isArray(selected)) {
                  return options
                    .filter((opt) => selected.includes(opt.value))
                    .map((opt) => opt.label)
                    .join(', ');
                }
                const found = options.find((opt) => opt.value === selected);
                return found ? found.label : '';
              }}
            >
              {placeholder && (
                <MenuItem value="" disabled sx={style.selectItem}>
                  {placeholder}
                </MenuItem>
              )}
              {options.map((type) => {
                const Icon = type.image;
                return (
                  <MenuItem
                    key={type.value}
                    value={type.value}
                    sx={style.selectItem}
                    onClick={() => onSelect && onSelect(type.value)}
                  >
                    {type.image && (
                      <Icon />
                      // <Image
                      //   src={type.image}
                      //   alt={type.label}
                      //   style={{ width: 22, height: 22, marginRight: 8, verticalAlign: 'middle', objectFit: 'contain' }}
                      // />
                    )}
                    {type.label}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
        {!!errorMessage && (
          <Typography sx={style.error}>{errorMessage}</Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default FormControllerSelector;

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '80%',
    mx: 'auto',
    mb: '2rem',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '8px',
  },
  labelText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    marginBottom: '4px',
  },
  selectItem: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    display: 'flex',
    gap: '0.5rem',
    color: theme.palette.text.secondary,
  },
  error: {
    fontSize: '0.65rem',
    color: 'red',
    margin: 0,
    lineHeight: 'unset',
    '& .MuiFormControl-root .MuiFormHelperText-root': {
      lineHeight: '14px !important',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  formController: {
    borderRadius: '4px',
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root': {
      height: '38px !important',
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },

    '& .MuiFormHelperText-root': {
      lineHeight: '1',
    },
    '& .MuiInputBase-input': {
      padding: '10px 12px',
    },
  },
  select: {
    borderRadius: '4px',
    width: '100%',
    backgroundColor: '#FAFAFA',
    maxHeight: '350px !important',
  },
  btn: {
    width: '100%',
    height: '38px',
    marginTop: '40px',
    borderWidth: '1.5px',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '19.95px',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    },
  },
  textField: {
    borderRadius: '12px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '8px 10px',

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
