'use client'
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Header from './Header'
import SearchInput from './common/SearchInput'
import useDebounce from '@hooks/useDebounce'
import theme from '@app/theme'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import AddIcon from '@mui/icons-material/Add';
import { UserRole } from '@constant/enum'
import { useRouter } from 'next/navigation'

const Jobs = () => {
    const [searchInput, setSearchInput] = useState('');
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
      const searchValue = useDebounce(searchInput, 500);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };
  
  return (
    <Box sx={styles.outerWrapper}>
      <Header title={`Total jobs (10)`}>
        <Box>
          <SearchInput onChange={handleOnChange} />
        </Box>
        {user &&
          (user.role === UserRole.SUPERADMIN ||
            (user.role === UserRole.VENDOR && user._id === user.agency?.createdBy._id)) && (
            <Button
              sx={styles.btn}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={()=> router.push('/jobs/new')}
            >
              Add User
            </Button>
          )}
      </Header>
      </Box>
  )
}

export default Jobs


const styles = {
    outerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      minHeight: 'calc(100vh - 150px)',
      overflowX: 'auto',
    },
    btn: {
      margin: '0 8px',
      width: '138px',
      height: '36px',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.common.white,
      lineHeight: '14.52px',
      textTransform: 'capitalize',
      boxShadow: 'none',
      backgroundColor: theme.palette.secondary.main,
      ':hover': {
        backgroundColor: '#43afb0',
        boxShadow: 'none',
      },
    },

    submit: {
      width: '100%',
      height: '35px',
      borderWidth: '1.5px',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '19.95px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      boxShadow: 'none',
      backgroundColor: theme.palette.secondary.main,
      ':hover': {
        backgroundColor: '#43afb0',
        boxShadow: 'none',
      },
      '&:disabled': {
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
      },
    },
    closeBtn: {
      width: '100%',
      height: '35px',
      borderWidth: '1.5px',
      borderColor: '#FD0015',
      color: '#FD0015',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '19.95px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main,
      ':hover': {
        borderColor: '#FD0015',
      },
    },
  };
