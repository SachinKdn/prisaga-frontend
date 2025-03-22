const UsersTableColumns: Column[] = [
  { label: 'First Name', field: 'firstName' },
  { label: 'Last Name', field: 'lastName' },
  { label: 'Email', field: 'email' },
  { label: 'Mobile', field: 'phone' },
  {
    label: 'Actions',
    field: 'actions',
  },
];

export const getUsersColumns = (access?: string) => {
  if (access === 'Read Only') {
    return UsersTableColumns.slice(0, UsersTableColumns.length - 1);
  } else {
    return UsersTableColumns;
  }
};
