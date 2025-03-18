'use client';
import { Box, Button, CircularProgress, Theme, useTheme } from '@mui/material';
import { createStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useDebounce from '../hooks/useDebounce';
import { useSelector } from 'react-redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getUsersColumns } from '@/constant/TableColumns';
import { RootState } from '@/store';
import { UserRole } from '@/constant/enum';
import CustomDialog from './common/CustomDialog';
import Header from './Header';
import SearchInput from './common/SearchInput';
import CustomTable from './CustomTable';
import EditUserDetailsModal from './EditUserDetailsModal';
import theme from '@app/theme';

interface Props {
  data: ITableResponse<User[]>;
}

const Users = (props: Props) => {
  const { data } = props;
  const [searchInput, setSearchInput] = useState('');
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  //   const [deleteUser, { isLoading: deleteUserLoading }] =
  //     useDeleteUserMutation();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const handleAddUser = () => {
    setOpen(true);
  };
  const handleDeleteUser = (_id: string) => {
    setOpenDeleteDialog(!openDeleteDialog);
    setSelectedUserId(_id);
  };
  const handleDelete = async () => {
    console.log('You are trying to delete this user id-', selectedUserId);
    try {
      //   const response = await deleteUser({
      //     _id: selectedUserId,
      //   }).unwrap();
      //   handleSuccess(response.message);
      //   refetch();
    } catch (error) {
      //   handleError(error as FetchBaseQueryError);
    }
    setOpenDeleteDialog(false);
  };
  const handleUserCreated = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log(newUser);
    // refetch();
  };
  const handleUserUpdated = (updatedUser: User) => {
    console.log(updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === updatedUser._id ? { ...user, ...updatedUser } : user))
    );
    // refetch();
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setOpenDeleteDialog(false);
  };
  useEffect(() => {
    console.log(data);
    setUsers(data.data);
  }, [data]);
  useEffect(() => {
    console.log('---------users------------------------------------------');
    console.log(users);
  }, [setUsers]);

  const usersColumns: Column<User>[] = [
    {
      field: 'username',
      label: 'Name',
      render(row) {
        return (
          <span>
            {row.firstName}&nbsp; {row.lastName}
          </span>
        );
      },
    },
    { field: 'email', label: 'Email' },
    { field: 'phoneNumber', label: 'Phone' },
    { field: 'isApproved', label: 'Status' },
    { field: 'actions', label: 'Actions' },
  ];
  //   const columns = getUsersColumns();
  const columns =
    user &&
    (user.role === UserRole.SUPERADMIN ||
      (user.role === UserRole.VENDOR && user._id === user.agency?.createdBy._id))
      ? usersColumns
      : usersColumns.slice(0, -1);
  console.log(users);
  return (
    <Box sx={styles.outerWrapper}>
      <Header title={`Total members (${data.totalCount || 0})`}>
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
              onClick={handleAddUser}
            >
              Add User
            </Button>
          )}
      </Header>
      <CustomTable
        key={users.length}
        columns={columns}
        data={users || []}
        // isLoading={isFetching}
        onDelete={handleDeleteUser}
        onEdit={setSelectedUser}
        setOpenForm={setOpen}
        totalCount={data.totalCount || 0}
        page={tablePage}
        handlePage={handlePage}
      />
      {selectedUser !== null ? (
        <EditUserDetailsModal
          open={open}
          onClose={handleClose}
          isEdit={true}
          initialData={selectedUser}
          handleUserUpdated={handleUserUpdated}
        />
      ) : (
        open && (
          <EditUserDetailsModal
            open={open}
            onClose={handleClose}
            isEdit={false}
            isSuperAdmin={user && user.role === 'superAdmin' ? true : false}
            onUserCreated={handleUserCreated}
          />
        )
      )}
      {selectedUserId !== null && openDeleteDialog && (
        <CustomDialog
          open={openDeleteDialog}
          onClose={handleClose}
          title="Do you want to delete the user?"
          isCrossIcon={false}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              marginTop: '15px',
            }}
          >
            <Button onClick={handleClose} color="secondary" variant="outlined" sx={styles.closeBtn}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={styles.submit}
              onClick={handleDelete}
              disabled={false ? true : false}
            >
              {false ? <CircularProgress size={22} style={{ color: 'white' }} /> : 'Confirm'}
            </Button>
          </Box>
        </CustomDialog>
      )}
    </Box>
  );
};

export default Users;
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
