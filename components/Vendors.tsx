'use client';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import useDebounce from '../hooks/useDebounce';
import CustomTable from '../components/CustomTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import SearchInput from './common/SearchInput';
import theme from '@app/theme';
import { Link } from 'lucide-react';

interface Props {
  data: ITableResponse<Agency[]>;
}

const Vendors = (props: Props) => {
  const { data } = props;
  const [searchInput, setSearchInput] = useState('');

  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user from store--->', user);
  const searchValue = useDebounce(searchInput, 500);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const [tablePage, setTablePage] = useState(0);
  const [page, setPage] = useState(1);
  const handlePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
    setTablePage(newPage);
  };
  const [vendors, setVendors] = useState<Agency[]>([]);
  console.log(page, searchValue);
  useEffect(() => {
    console.log(data);
    setVendors(data.data);
  }, [data]);

  const usersColumns: Column<Agency>[] = [
    { field: 'agencyName', label: 'Agency' },
    // { field: 'email', label: 'Email' },
    { field: 'phoneNumber', label: 'Phone' },
    { field: 'activeUsers', label: 'Total Users' },
    { field: 'location', label: 'Location' },
    { field: 'subscriptionType', label: 'Subscription' },
    { field: 'spentRequest', label: 'Total Requests' },
    {
      field: 'goto',
      label: 'Action',
      render(row) {
        return <Link href={`vendor/${row._id}`}>View Here</Link>;
      },
    },
    // { field: 'isApproved', label: 'Status' },
    // { field: 'actions', label: 'Actions' },
    // { field: 'actions', label: 'Actions' }
  ];

  return (
    <Box sx={styles.outerWrapper}>
      <Header title={`Total vendors (${data.totalCount || 0})`}>
        <Box>
          <SearchInput onChange={handleOnChange} />
        </Box>
      </Header>
      <CustomTable
        columns={usersColumns}
        data={vendors || []}
        // isLoading={isFetching}
        totalCount={data.totalCount || 0}
        page={tablePage}
        handlePage={handlePage}
      />
    </Box>
  );
};

export default Vendors;
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
