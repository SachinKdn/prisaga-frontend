'use client'
import { Box, Theme, Typography, useTheme, Grid, Divider } from '@mui/material';
import { createStyles } from "@mui/styles";
import React from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import UploadImage from "./UploadImage";
import { RootState } from "@store";
import theme from "@app/theme";
import { ChartColumn, Ellipsis, UserRound } from "lucide-react";
import { CountCard } from './VendorDetails';
import SubmittedIcon from '@assets/svg/submitted-icon.svg';
import SuccessIcon from '@assets/svg/success-icon.svg';
import RejectedIcon from '@assets/svg/rejected-icon.svg';
import DiamondIcon from '@assets/svg/diamond-icon.svg';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Box
    sx={{
      py: 4,
      px: 6,
      width: '100%',
      boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
      borderRadius: '8px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Grid container spacing={2}>
    <Grid item xs={12} sm={2}>
      <UploadImage/>
    </Grid>
      <Grid item xs={12} sm={7}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb:2 }}>
            <UserRound size={18} />
            <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
              Agency Admin
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 4, paddingLeft: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                Full Name
              </Typography>
              <Typography variant="body2" sx={{ color: '#5B617A' }}>
                {user?.firstName || 'NA'} {user?.lastName ?? ''}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ color: '#5B617A' }}>
              {user?.email ? user?.email : "--"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                Phone Number
              </Typography>
              <Typography variant="body2" sx={{ color: '#5B617A' }}>
              {user?.phoneNumber ? user?.phoneNumber : "--"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                Created At
              </Typography>
              <Typography variant="body2" sx={{ color: '#5B617A' }}>
                Created At {dayjs(user?.createdAt).format('MMM DD YYYY')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: 'min-content' }}>
          <DiamondIcon />
          <Box>
            <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
              Subscription Type
            </Typography>
            <Typography variant="body1" sx={{  color: '#0338CD', fontWeight: 600 }}>
              Upgrade Now
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>

    <Divider sx={{ my: 2 }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, mt: 4 }}>
      <ChartColumn size={18} />
      <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
        Applications Statistics
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', gap: 4, paddingLeft: 6 }}>
      <CountCard
        title="Requested"
        count={10}
        icon={SubmittedIcon}
        iconClass={{width: '25px', height: '25px', color: "#0338CD"}}
        className={{color: "#0338CD"}}
      />
      <CountCard
        title="Pending"
        count={2}
        icon={Ellipsis}
        iconClass={{width: '25px', height: '25px'}}
        className={{color: "#5B617A"}}
      />
      <CountCard
        title="Approved"
        count={6}
        icon={SuccessIcon}
        iconClass={{width: '25px', height: '25px'}}
        className={{color: "#1E4F56"}}
      />
      <CountCard
        title="Rejected"
        count={2}
        icon={RejectedIcon}
        iconClass={{width: '25px', height: '20px'}}
        className={{color: "#CB0000"}}
      />
    </Box>
  </Box>
    // <Box sx={styles.wrapper}>
    //   <Box sx={styles.innerWrapper}>
    //     <Box sx={styles.profileContainer}>
    //       <UploadImage />
    //       <Box sx={styles.detail}>
    //         <Typography sx={styles.userName}>{user?.firstName}</Typography>
    //         <Typography sx={styles.role}>{user?.role}</Typography>
    //       </Box>
    //     </Box>
    //     <Box sx={styles.contactContainer}>
    //       <Box sx={styles.dataCard}>
    //         <Typography sx={styles.contactType}>Email</Typography>
    //         <Typography sx={styles.contact}>
    //           {user?.email ? user?.email : "--"}
    //         </Typography>
    //       </Box>
    //       <Box
    //         sx={{
    //           ...styles.dataCard,
    //           backgroundColor: "#E0ECFC",
    //           border: "1.5px solid #74A9F0",
    //         }}
    //       >
    //         <Typography sx={styles.contactType}>Contact Number</Typography>
    //         <Typography sx={styles.contact}>
    //           {user?.phoneNumber ? user?.phoneNumber : "--"}
    //         </Typography>
    //       </Box>
    //       <Box
    //         sx={{
    //           ...styles.dataCard,
    //           backgroundColor: "#FEEFC2",
    //           border: "1.5px solid #FBBF09",
    //         }}
    //       >
    //         <Typography sx={styles.contactType}>Account Created On</Typography>
    //         <Typography sx={styles.contact}>
    //           {/* {user?.createdAt.slice(0, 10)} */}
    //           {user?.createdAt
    //             ? dayjs(user?.createdAt).format("MMM DD YYYY")
    //             : "--"}
    //           {/* {dayjs(user?.createdAt).format("MMM DD YYYY")} */}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default Profile;

const styles  ={
    wrapper: {
      width: "100%",
      height: "auto",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxSizing: "border-box",
      boxShadow: "0px 2.11px 105.51px 0px #00000014",
      padding: "12px",
    },
    innerWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "8px",
      gap: 2,
      justifyContent: "space-between",
      alignItems: "flex-start",

      boxSizing: "border-box",
    },
    profileContainer: {
      display: "flex",
      gap: 4,
      alignItems: "center",
    },
    detail: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    contactContainer: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 3,
      [theme.breakpoints.down("lg")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
    },
    userName: {
      fontSize: "30px",
      color: "#040404",
      fontWeight: 600,
      lineHeight: "39.69px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "25px",
      },
    },
    role: {
      fontSize: "20px",
      color: "#545454",
      fontWeight: 500,
      lineHeight: "26.46px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "25px",
      },
    },
    contactType: {
      fontSize: "15px",
      color: "#545454",
      fontWeight: 400,
      lineHeight: "19.85px",
      [theme.breakpoints.down("md")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
    contact: {
      fontSize: "20px",
      color: "#545454",
      fontWeight: 500,
      lineHeight: "26.46px",
      [theme.breakpoints.down("md")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
      },
    },
    dataCard: {
      border: "1.5px solid #DD626A",
      borderRadius: "12px",
      width: "auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#FCF0F2",
    },
    avatar: {
      width: "150px",
      height: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "110px",
      },
    },
  }
