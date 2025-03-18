import { Box, Typography } from '@mui/material';
import React from 'react';
interface Props {
  title: string;
}
export const DetailsHeading = (props: Props) => {
  const { title } = props;
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.heading} >
        {title}
      </Typography>
    </Box>
  );
};
const styles = {
  wrapper:{
    width: '100%',
    height: 'auto'
  },
  heading:{
    fontSize: "0.88rem",
    color: "#0F1C1B",
    lineHeight: "1.33rem",
    fontWeight: 500,
    margin: "8px 0"
  }
}
