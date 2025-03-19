'use client';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../components/CustomTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserRole } from '@/constant/enum';
import SearchInput from './common/SearchInput';
import theme from '@app/theme';
import { getCompanyList } from '@api/server-company';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Company = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [companies, setCompanies] = useState<Company[]>();

  const user = useSelector((state: RootState) => state.auth.user);
  // const searchValue = useDebounce(searchInput, 500);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const [tablePage, setTablePage] = useState(0);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const handlePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
    setTablePage(newPage);
  };
  console.log('searchInput--->', searchInput, page);

  useEffect(() => {
    const fetchCompanyList = async () => {
      const result = await getCompanyList();
      console.log(result);
      if (result) {
        setTotalCount(result.totalCount);
        setCompanies(result.data);
      }
    };
    fetchCompanyList();
  }, []);

  const companyColumns: Column<Company>[] = [
    { field: 'name', label: 'Company Name' },
    // { field: 'email', label: 'Email' },
    { field: 'location', label: 'Location' },
    {
      field: 'goto',
      label: 'Action',
      render(row) {
        return <Link href={`company/${row._id}`}>View Here</Link>;
      },
    },
    // { field: 'isApproved', label: 'Status' },
    // { field: 'actions', label: 'Actions' },
    // { field: 'actions', label: 'Actions' }
  ];

  return (
    <Box sx={styles.outerWrapper}>
      <Header title={`Total companies (10)`}>
        <Box>
          <SearchInput onChange={handleOnChange} />
        </Box>
        {user &&
          (user.role === UserRole.SUPERADMIN ||
            (user.role === UserRole.VENDOR &&
              user._id === user.agency?.createdBy._id)) && (
            <Button
              sx={styles.btn}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push('/company/new')}
            >
              Add Company
            </Button>
          )}
      </Header>
      <CustomTable
        columns={companyColumns}
        data={companies || []}
        // isLoading={isFetching}
        totalCount={totalCount || 0}
        page={tablePage}
        handlePage={handlePage}
      />
    </Box>
  );
};

export default Company;
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
    width: '188px',
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
