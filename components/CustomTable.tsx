import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from '@mui/material';
import { createStyles } from '@mui/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Delete } from '@mui/icons-material';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import Edit from '@assets/svg/editAction.svg';
import Loader from './Loader';
import { ShieldCheck, ShieldX } from 'lucide-react';
import Link from 'next/link';
import theme from '@/app/theme';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

dayjs.extend(localizedFormat);

// Generic type definitions
export interface Column<T> {
  field: Extract<keyof T, string> | 'actions' | 'goto';
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  page?: number;
  totalCount?: number;
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  setOpenForm?: (v: boolean) => void;
  handlePage?: (_: unknown, newPage: number) => void;
  canDelete?: boolean;
  rowsPerPage?: number;
}

const CustomTable = <T extends { _id?: string }>({
  data = [],
  columns,
  isLoading,
  onEdit,
  onDelete,
  totalCount,
  handlePage,
  page = 0,
  canDelete = false,
  setOpenForm,
  rowsPerPage = 10,
}: TableProps<T>) => {
  const styles = useStyle(theme);
  const user = useSelector((state: RootState) => state.auth.user);
  // disable-no-any
  const formatDate = (date: any) => {
    return date ? dayjs(date).format('MMM DD YYYY HH:mm') : '--';
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  const renderCellContent = (column: Column<T>, row: T) => {
    // If column has custom render function, use it
    if (column.render) {
      return column.render(row);
    }

    // Handle special cases
    if (column.field === 'actions') {
      return (
        <Box sx={styles.actionContainer}>
          {onEdit && (
            <IconButton
              disabled={row._id === user?._id}
              onClick={() => {
                if (setOpenForm) setOpenForm(true);
                onEdit(row);
              }}
              sx={styles.iconEditButton}
            >
              <Edit />
            </IconButton>
          )}
          {canDelete && onDelete && row._id && (
            <IconButton
              onClick={() => onDelete(row._id as string)}
              sx={styles.iconEditButton}
            >
              <Delete sx={{ color: '#AD1400' }} />
            </IconButton>
          )}
        </Box>
      );
    }

    if (column.field === 'goto') {
      return <Link href={`vendor/${row['_id']}`}>View Here</Link>;
    }

    const value = row[column.field];

    // Handle different value types
    if (
      value instanceof Date ||
      column.field.toLowerCase().includes('date') ||
      column.field === 'createdAt'
    ) {
      return formatDate(value);
    }

    if (typeof value === 'number') {
      return formatNumber(value);
    }

    if (column.field === ('ageSex' as Extract<keyof T, string>)) {
      // disable-no-any
      const rowAsAny = row as any; // Type assertion for special case
      return (
        <Box sx={styles.flexCenter}>
          {rowAsAny['age']}
          {rowAsAny['sex'] === 'Male' ? <ManIcon /> : <WomanIcon />}
        </Box>
      );
    }

    if (column.field === 'isApproved') {
      return (
        <span>
          {row[column.field] ? (
            <ShieldCheck color="#00873C" />
          ) : (
            <ShieldX color="#DE0101" />
          )}
        </span>
      );
    }
    if (column.field === 'location') {
      const location: ILocation = row[column.field] as ILocation;
      return <span>{location.city}</span>;
    }
    return value as React.ReactNode;
  };

  return (
    <>
      <TableContainer sx={styles.tableWrapper} component={Paper}>
        <Table stickyHeader aria-label="custom table" sx={styles.table}>
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    ...styles.tableHead,
                    borderRadius:
                      index === 0
                        ? '20px 0 0 0'
                        : index === columns.length - 1
                          ? '0 20px 0 0'
                          : '0',
                    paddingLeft: index === 0 ? '40px' : '16px',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={styles.tableBody}>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ borderBottom: 'none' }}
                >
                  <Loader height={35} />
                </TableCell>
              </TableRow>
            ) : !data.length ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    ...styles.tableDataRow,
                    background: rowIndex % 2 !== 0 ? '#fafafa' : 'transparent',
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      sx={{
                        ...styles.tableRow,
                        paddingLeft: colIndex === 0 ? '40px' : '16px',
                      }}
                    >
                      {renderCellContent(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading &&
        totalCount !== undefined &&
        totalCount > 10 &&
        data.length > 0 &&
        handlePage && (
          <TablePagination
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePage}
            rowsPerPageOptions={[]}
          />
        )}
    </>
  );
};

const useStyle = (theme: Theme) =>
  createStyles({
    tableWrapper: {
      borderRadius: '20px',
      margin: '15px 0px',
      border: '1px solid #0000000f',
      boxShadow: '0px 2px 30px 0px #0000000F',
      minHeight: '35vh',
      width: 'auto',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      [theme.breakpoints.down('md')]: {
        width: 'auto',
      },
    },
    table: {
      minWidth: 233,
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    tableHeader: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '20px 20px 0px 0px',
      padding: '12px',
    },
    tableHead: {
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: '500',
      color: '#fff',
      fontFamily: theme.typography.fontFamily,
      background: 'transparent',
    },
    tableDataRow: {
      height: '55px',
    },
    tableRow: {
      fontFamily: theme.typography.fontFamily,
      border: 'none',
      fontSize: '14px',
      lineHeight: '18.52px',
      fontWeight: '400',
      color: '#040404',
    },
    tableBody: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        overflow: 'auto',
      },
    },
    iconEditButton: {
      color: '#358D9E',
      [theme.breakpoints.down('md')]: {
        padding: '0px 10px',
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    actionContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
  });

export default CustomTable;
