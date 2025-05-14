import TextField from '@mui/material/TextField';
import { SxProps, Theme, useTheme } from '@mui/material';
import { createStyles } from '@mui/styles';
import { Search } from 'lucide-react';

const useStyle = (theme: Theme, isFullWidth: boolean) =>
  createStyles({
    sx: {
      border: 'none',
      borderRadius: '4px',
      height: '36px',
      width: '210px',
      fontSize: '14px',
      fontWeight: '400',
      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.09)',
      fontFamily: '"Red Hat Display", sans-serif',
      lineHeight: '19px',
      backgroundColor: theme.palette.common.white,
      color: '#757897',
      margin: '0',
      '& input::placeholder': {
        opacity: 0.7,
      },
      '& .MuiOutlinedInput-root': {
        height: '100%',
        color: '#757897',
      },
      '.MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '8px 12px',
        border: 'none',
      },
      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline:hover': {
        border: 0,
        outline: 'none',
      },
      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 0,
        outline: 'none',
      },
      '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '.css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '8px 12px',
      },
      [theme.breakpoints.down('md')]: {
        width: isFullWidth ? '100%' : '180px',
        height: '36px',
      },
      [theme.breakpoints.down(400)]: {
        maxWidth: '170px',
        width: '85vw',
        margin: '0',
      },
    },
  });
type SearchInputProps = {
  sx?: SxProps<Theme>;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullWidth?: boolean;
};
const SearchInput = ({
  placeholder,
  sx,
  onChange,
  value,
  type,
  isFullWidth = false,
}: SearchInputProps) => {
  const theme = useTheme();
  const styles = useStyle(theme, isFullWidth);
  return (
    <TextField
      sx={{ ...styles.sx, ...sx }}
      placeholder={placeholder || 'Search'}
      value={value}
      type={type}
      autoComplete="off"
      InputProps={{
        startAdornment: (
          // <SearchIcon
          //   style={{
          //     color: '#757897',
          //     width: '22px',
          //     height: '22px',
          //     marginRight: '4px'
          //   }}
          // />
          <Search
            size={19}
            color="#757897"
            style={{ marginRight: '4px' }}
            strokeWidth={1.5}
          />
        ),
        sx: { py: 0 },
      }}
      onChange={onChange}
    />
  );
};

export default SearchInput;
