import theme from '@app/theme';
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  value: string;
  placeholder: string;
  setValue: (v: string) => void;
  items: Option[];
}
const SingleSelect = (props: Props) => {
  const { value, setValue, items, placeholder } = props;
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  const handleClearClick = () => {
    setValue('');
  };
  return (
    <FormControl sx={styles.formController} size="small">
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        sx={styles.select}
        input={
          <OutlinedInput
            endAdornment={
              value ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear selection"
                    onClick={handleClearClick}
                    edge="start"
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          />
        }
        inputProps={{ MenuProps: { disableScrollLock: true } }}
      >
        <MenuItem value="" sx={styles.selectItem}>
          <span style={{ fontStyle: 'normal' }}>{placeholder}</span>
        </MenuItem>
        {items.map((type) => (
          <MenuItem key={type.value} value={type.value} sx={styles.selectItem}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;

const styles = {
  formController: {
    width: 200,
    margin: 0,
    '& .MuiSelect-root': {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: theme.palette.text.secondary,
    },
    '& .MuiSelect-outlined': {
      paddingRight: '0px !important',
      paddingLeft: '8px !important',
    },
    '& .Mui-focused': {
      border: 'none',
      boxShadow: 'none',
    },
    '& .MuiInputAdornment-root': {
      marginRight: '6px',
    },
    '& .MuiButtonBase-root .MuiSvgIcon-root': {
      height: '0.9rem',
    },
  },
  select: {
    borderRadius: '4px',
    width: '100%',
    backgroundColor: '#FAFAFA',
    height: '35px !important',
  },
  selectItem: {
    fontSize: '0.85rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
  },
};
