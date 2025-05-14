import theme from '@app/theme';
import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from './common/SearchInput';

interface Props {
  title: string;
  children?: ReactNode;
  showAddButton: boolean;
  btnTitle?: string;
  handleClick?: () => void;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = (props: Props) => {
  const {
    title,
    children,
    handleClick,
    btnTitle,
    handleOnChange,
    showAddButton,
  } = props;
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.title}>{title}</Typography>
      <Box sx={styles.childWrapper}>
        {children}
        <Box sx={styles.actionWrapper}>
          {handleOnChange && (
            <SearchInput onChange={handleOnChange} sx={styles.searchBar} />
          )}
          {showAddButton && (
            <Button
              sx={styles.btn}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClick}
            >
              {btnTitle}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100% !important',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '6px',
    padding: '8px',
    // [theme.breakpoints.down(700)]: {
    //   flexDirection: "column",
    //   gap: "20px",
    //   alignItems: "start",
    // },
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    fontWeight: '600',
    color: '#040404',
    lineHeight: '23.81px',
    minWidth: 'fit-content',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: 'normal',
    },
  },
  childWrapper: {
    display: 'flex',
    justifyContent: 'end',
    // flex: 1,
    alignSelf: 'end',
    alignItems: 'center',
    [theme.breakpoints.down(700)]: {
      alignSelf: 'flex-start',
    },
    [theme.breakpoints.down(400)]: {
      // flexDirection: "column",
      // width: "100%",
      gap: '5px',
      alignItems: 'flex-end',
    },
  },
  actionWrapper: {
    display: 'flex',
    gap: 1,
    margin: '0 8px',
  },
  searchBar: {
    height: '35px !important',
    '& .MuiOutlinedInput-root': {
      fontSize: '0.88rem !important',
      height: '100%',
      color: '#757897',
      fontWeight: 500,
      paddingLeft: '8px',
    },
  },
  btn: {
    width: '158px',
    height: '35px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    lineHeight: '14.52px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
  },
};
