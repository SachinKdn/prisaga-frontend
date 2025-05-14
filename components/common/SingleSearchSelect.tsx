import theme from '@app/theme';
import {
  Autocomplete,
  Box,
  MenuItem,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  value: Option | null;
  setValue: (value: Option | null) => void;
  onSelect?: (value: string | null) => void;
  options: Option[];
  label?: string;
  labelSx?: SxProps;
  wrapperSx?: SxProps;
  error?: string;
}
const SingleSearchSelect = (props: Props) => {
  const {
    value,
    setValue,
    options,
    label,
    labelSx,
    wrapperSx,
    onSelect,
    error,
  } = props;
  const [inputValue, setInputValue] = React.useState('');
  const onSelectChange = (data: Option | null) => {
    if (onSelect) onSelect(data?.value || null);
    console.log(data);
    setValue(data);
  };
  return (
    <Box sx={wrapperSx}>
      {label && (
        <Typography sx={labelSx || styles.labelText}>{label}</Typography>
      )}
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: Option | null) => {
          onSelectChange(newValue);
        }}
        sx={styles.select}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-autocomplete-select"
        options={options}
        renderInput={(params) => <TextField placeholder="Search" {...params} />}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <MenuItem
              key={key}
              value={option.value}
              sx={styles.selectItem}
              {...optionProps}
            >
              {option.label}
            </MenuItem>
          );
        }}
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

export default SingleSearchSelect;

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
  select: {
    width: 'auto',
    borderRadius: '4px',
    backgroundColor: '#FAFAFA',
    '& .MuiAutocomplete-input': {
      fontSize: '0.88rem',
      fontWeight: '500',
      color: theme.palette.text.secondary,
    },
    '& .MuiOutlinedInput-root': {
      padding: '0px',
      paddingLeft: '5px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },
  },
  selectItem: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
  },
};
