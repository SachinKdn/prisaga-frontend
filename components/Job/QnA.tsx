'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import theme from '@app/theme';

interface Props {
  questionnaire: Questionnaire[];
}

const QnA = ({ questionnaire }: Props) => {
  const [expandedIndex] = useState<number | null>(null);

  // const handleToggle = (index: number) => {
  //   setExpandedIndex(expandedIndex === index ? null : index);
  // };

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.sectionTitle}>Questionnaire</Typography>
      {questionnaire.map((qa, index) => (
        <Box
          key={index}
          sx={{
            ...styles.qaItem,
            backgroundColor:
              expandedIndex === index ? `#fafafa` : 'transparent',
          }}
          // onClick={() => handleToggle(index)}
        >
          <Box sx={styles.questionRow}>
            <Typography sx={styles.question}>{qa.question}</Typography>
            {/* {expandedIndex === index ? (
              <ChevronUp size={20} color={theme.palette.primary.main} />
            ) : (
              <ChevronDown size={20} color={theme.palette.primary.main} />
            )} */}
          </Box>
          {/* {expandedIndex === index && (
            <Typography sx={styles.answer}>{qa.answer}</Typography>
          )} */}
        </Box>
      ))}
    </Box>
  );
};

export default QnA;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  qaItem: {
    cursor: 'pointer',
    padding: '0.5rem 0.6rem',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  questionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
  answer: {
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    marginTop: '0.25rem',
    lineHeight: '1.5',
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
};
