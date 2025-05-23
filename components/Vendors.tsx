'use client';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import useDebounce from '../hooks/useDebounce';
import CustomTable from '../components/CustomTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import theme from '@app/theme';
import SingleSelect from './common/SingleSelect';
import { getVendorsList } from '@api/client';
import { postedWithinOptions, subscriptionTypes } from '@constant/resume-data';
import Link from 'next/link';
import MicroChip from './MicroChip';
import { BellPlus } from 'lucide-react';

interface Props {
  data: ITableResponse<Agency[]>;
}

const Vendors = (props: Props) => {
  const { data } = props;
  const [searchInput, setSearchInput] = useState('');
  const [subscriptionType, setSubscriptionType] = useState<string>('');
  const [postedWithin, setPostedWithin] = useState<string>('');
  // const [isLoading, setIsLoading] = useState(false);

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
    const fetch = async () => {
      // setIsLoading(true);
      const params = new URLSearchParams();
      if (searchValue) params.append('search', searchValue);
      if (subscriptionType) params.append('subscriptionType', subscriptionType);
      if (postedWithin) params.append('timeRange', postedWithin);
      const result = await getVendorsList(params.toString());
      if (result) setVendors(result.data);
      // setIsLoading(false);
    };
    console.log('fetch the vendors--searchValue>', searchValue);
    fetch();
  }, [searchValue, subscriptionType, postedWithin]);

  const usersColumns: Column<Agency>[] = [
    {
      field: 'agencyName',
      label: 'Agency',
      render(row) {
        return (
          <Box sx={styles.flexCenter}>
            <Typography sx={styles.cellText}>{row.agencyName}</Typography>
            {row.createdAt &&
              new Date().getTime() - new Date(row.createdAt).getTime() <=
                24 * 60 * 60 * 1000 && (
                <MicroChip
                  label="New"
                  textColor={theme.palette.primary.main}
                  bgColor="#ebf7f9"
                  icon={
                    <BellPlus
                      size={14}
                      strokeWidth={2.5}
                      color={theme.palette.primary.main}
                    />
                  }
                />
              )}
          </Box>
        );
      },
    },
    { field: 'phoneNumber', label: 'Phone' },
    { field: 'activeUsers', label: 'Total Users' },
    { field: 'location', label: 'Location' },
    { field: 'subscriptionType', label: 'Subscription' },
    { field: 'createdAt', label: 'Registration Time' },
    {
      field: 'goto',
      label: 'Action',
      render(row) {
        return (
          <Link
            href={`vendor/${row._id}`}
            style={{ color: theme.palette.primary.main, fontWeight: 500 }}
          >
            View Here
          </Link>
        );
      },
    },
    // { field: 'isApproved', label: 'Status' },
    // { field: 'actions', label: 'Actions' },
    // { field: 'actions', label: 'Actions' }
  ];

  return (
    <Box sx={styles.outerWrapper}>
      <Header
        title={`Total vendors (${data.totalCount || 0})`}
        showAddButton={false}
        handleOnChange={handleOnChange}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SingleSelect
            value={postedWithin}
            setValue={setPostedWithin}
            items={postedWithinOptions}
            placeholder="Posted Within"
          />
          <SingleSelect
            value={subscriptionType}
            setValue={setSubscriptionType}
            items={subscriptionTypes}
            placeholder="Select Subscription"
          />
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
  cellText: {
    fontFamily: theme.typography.fontFamily,
    border: 'none',
    fontSize: '14px',
    lineHeight: '18.52px',
    fontWeight: '400',
    color: '#040404',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
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
