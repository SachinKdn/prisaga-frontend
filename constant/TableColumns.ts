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

export const dummpUsers: User[] = [
  {
    _id: '6779a5412771c09f42e60937',
    email: 'user@gmail.com',
    phoneNumber: '9876543210',
    username: 'user',
    password: '$2a$12$An8zXBjpVsr.rmw5wewjEOLUUr7NxoLFZ51bQZrHsU8w6zn/28HMa',
    role: 'USER',
    isDeleted: false,
    createdAt: '2025-01-04T21:16:49.617Z',
    updatedAt: '2025-01-04T21:16:49.617Z',
  },
  {
    _id: '6779a39b2771c09f42e6092c',
    email: 'vendormember@gmail.com',
    phoneNumber: '9876543210',
    username: 'vendormember',
    password: '$2a$12$eIXXzGBp1spxGyNwSw7vJu0Q/SMehyJmU3FYJgzbz3H8D0Z1yVz5m',
    role: 'VENDOR',
    isDeleted: false,
    agency: '6779a2b2e5f81138d4f3bb76',
    createdAt: '2025-01-04T21:09:47.037Z',
    updatedAt: '2025-01-04T21:09:47.037Z',
  },
  {
    _id: '6779a1beadde073a7f1b3b3c',
    email: 'vendor@gmail.com',
    phoneNumber: '9876543210',
    username: 'vendor',
    password: '$2a$12$l8pSXOtuw1eaSbZYgzoLOuyS6QzIAdr/QU7GyyyhCm0jscdHjg3vG',
    role: 'VENDOR',
    isDeleted: false,
    agency: '6779a2b2e5f81138d4f3bb76',
    createdAt: '2025-01-04T21:01:50.448Z',
    updatedAt: '2025-01-04T21:05:54.118Z',
  },
  {
    _id: '6779a18dadde073a7f1b3b34',
    email: 'admin@gmail.com',
    phoneNumber: '9876543210',
    username: 'admin',
    password: '$2a$12$cr4PGdwZEyuVzB6QLYQmsu6JHckuJtC4C3amcVFzTmIATvronC9um',
    role: 'ADMIN',
    createdBy: '6779a1495dbfe5d12399372d',
    isDeleted: false,
    createdAt: '2025-01-04T21:01:01.390Z',
    updatedAt: '2025-01-04T21:01:01.390Z',
  },
  {
    _id: '6779a1495dbfe5d12399372d',
    email: 'superadmin@gmail.com',
    phoneNumber: '9876543210',
    username: 'superadmin',
    password: '$2a$12$xd.kLcfeCShpIO21reFXHOLgMyhf1Jrzi1IACn9wBSXsixWUzykA2',
    role: 'SUPERADMIN',
    isDeleted: false,
    createdAt: '2025-01-04T20:59:53.694Z',
    updatedAt: '2025-01-04T20:59:53.694Z',
  },
];
