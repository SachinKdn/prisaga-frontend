'use client';
import React, { useState } from 'react';
import { Box, Tooltip as MuiTooltip } from '@mui/material';
import { Check, Copy } from 'lucide-react';
import theme from '@app/theme';

interface Props {
  referenceId: string;
}

const Tooltip = ({ referenceId }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceId);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <MuiTooltip title={isCopied ? 'Copied' : 'Copy Reference ID'} arrow>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '4px',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
        onClick={handleCopy}
      >
        {isCopied ? (
          <Check size={15} color={theme.palette.primary.main} />
        ) : (
          <Copy size={15} color={theme.palette.primary.main} />
        )}
      </Box>
    </MuiTooltip>
  );
};

export default Tooltip;
