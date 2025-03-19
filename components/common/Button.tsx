import theme from '@app/theme';
import { Box, Button, ButtonProps, CircularProgress } from '@mui/material';
import { CSSProperties } from '@mui/styles';

interface IButtonProps extends ButtonProps {
  btnText: string;
  loading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  iconOnRight?: boolean;
  style?: CSSProperties;
}

export const CustomButton = ({
  onClick,
  btnText,
  loading = false,
  type = 'button',
  children,
  isDisabled = false,
  iconOnRight = false,
  style,
}: IButtonProps) => {
  return (
    <Button
      sx={{ ...styles.btn, ...style }}
      type={type}
      onClick={onClick}
      disabled={isDisabled || loading}
      //   className={`flex justify-center items-center px-3 py-2 text-white rounded-[12px] text-center no-underline font-normal transition-colors duration-300 ${isDisabled || loading ? '!bg-gray-400 cursor-not-allowed' : 'bg-ocean-green'} ${className}`}
    >
      {loading ? (
        <>
          <CircularProgress
            sx={{ color: 'white' }} // White color circle
            size={26} // Adjust size if needed
            thickness={4} // Adjust thickness if needed
          />
        </>
      ) : iconOnRight ? (
        <>
          {btnText}
          {children}
        </>
      ) : (
        <Box sx={styles.childWrapper}>
          {children}
          {btnText}
        </Box>
      )}
    </Button>
  );
};

const styles = {
  btn: {
    display: 'flex',
    justifyContent: 'center',
    height: '38px',
    fontSize: '0.75rem',
    fontWeight: '500',
    alignItems: 'center',
    padding: '0.75rem 0.5rem !important',
    color: 'white',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.main,
    alignText: 'center',
    textDecolrationLine: 'none',
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    },
  },
  childWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.88rem',
    fontWeight: '500',
  },
};
