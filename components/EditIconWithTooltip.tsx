'use client';
import React from 'react';
import { Box, Tooltip as MuiTooltip } from '@mui/material';
import { Pencil } from 'lucide-react';
import theme from '@app/theme';
import { useRouter } from 'next/navigation';
interface Props {
  path: string;
}
const EditIconWithTooltip = ({ path }: Props) => {
  const router = useRouter();

  return (
    <MuiTooltip title={'Edit'} arrow>
      <Box sx={styles.editIcon} onClick={() => router.push(path)}>
        <Pencil
          size={15}
          strokeWidth={2.2}
          color={theme.palette.primary.main}
        />
      </Box>
    </MuiTooltip>
  );
};

export default EditIconWithTooltip;

const styles = {
  editIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
};
