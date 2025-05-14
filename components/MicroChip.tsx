import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { CircleCheck } from 'lucide-react';
interface Props {
  label: string;
  onClick?: () => void;
  bgColor: string;
  textColor: string;
  icon?: ReactElement<SVGSVGElement>;
}

const MicroChip = (props: Props) => {
  const { label, bgColor, textColor, icon } = props;

  return (
    <Box sx={[styles.tickWrapper, { backgroundColor: bgColor }]}>
      {icon ? (
        icon
      ) : (
        <CircleCheck size={14} strokeWidth={2.5} color={textColor} />
      )}
      <Typography sx={[styles.tickText, { color: textColor }]}>
        {label}
      </Typography>
    </Box>
  );
};

export default MicroChip;
const styles = {
  tickWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    borderRadius: '14px',
    padding: '0.25rem 0.5rem',
  },
  tickText: {
    fontSize: '0.68rem',
    fontWeight: '600',
  },
};
