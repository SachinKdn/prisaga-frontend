import React from 'react';
import CustomTable from './CustomTable';

import SubmittedIcon from '@assets/svg/submitted-icon.svg';
import SuccessIcon from '@assets/svg/success-icon.svg';
import RejectedIcon from '@assets/svg/rejected-icon.svg';
import DiamondIcon from '@assets/svg/diamond-icon.svg';
import { ChartColumn, Ellipsis, Gem, UserRound } from 'lucide-react';
import dayjs from 'dayjs';
import { Box, Typography, Grid, Divider } from '@mui/material';

interface Props {
  data: AgencyDetails;
}

const VendorDetails = (props: Props) => {
  const { data } = props;
  console.log('Vendor Entire Date----', data.agency);
  const columns: Column<User>[] = [
    {
      field: 'username',
      label: 'Name',
      render(row) {
        return (
          <span>
            {row.firstName ?? '-'}&nbsp; {row.lastName ?? '-'}
          </span>
        );
      },
    },
    { field: 'email', label: 'Email' },
    { field: 'phoneNumber', label: 'Phone' },
    { field: 'isApproved', label: 'Status' },
  ];
  return (
    <Box
    sx={{
      width: '100%',
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      gap: 2,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="h6" sx={{ color: '#0F1C1B', lineHeight: 1.33, fontWeight: '600' }}>
        {data.agency.agencyName}
      </Typography>
      <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
        {data.agency.location.city}-{data.agency.location.state}
      </Typography>
    </Box>

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
        <Grid item xs={12} sm={8}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb:2 }}>
              <UserRound size={18} />
              <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
                Agency Admin
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, paddingLeft: 6 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                  Full Name
                </Typography>
                <Typography variant="body2" sx={{ color: '#5B617A' }}>
                  {data.agency.createdBy.firstName || 'NA'} {data.agency.createdBy.lastName ?? ''}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                  Email
                </Typography>
                <Typography variant="body2" sx={{ color: '#5B617A' }}>
                  {data.agency.createdBy.email}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                  Phone Number
                </Typography>
                <Typography variant="body2" sx={{ color: '#5B617A' }}>
                  {data.agency.createdBy.phoneNumber}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#0338CD', fontWeight: 600 }}>
                  Created At
                </Typography>
                <Typography variant="body2" sx={{ color: '#5B617A' }}>
                  Created At {dayjs(data.agency.createdAt).format('MMM DD YYYY')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: 'min-content' }}>
            <DiamondIcon />
            <Box>
              <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
                Subscription Type
              </Typography>
              <Typography variant="h6" sx={{ color: '#0338CD', fontWeight: 600 }}>
                {data.agency.subscriptionType}
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

    <CustomTable
      key={data.members.length}
      columns={columns}
      data={data.members || []}
      totalCount={data.members.length || 0}
    />
  </Box>
  );
};

export default VendorDetails;

interface CountProps {
  title: string;
  iconClass?: React.CSSProperties;
  className?: React.CSSProperties;
  count: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export const CountCard = (props: CountProps) => {
  const { count, title, icon: Icon, iconClass , className  } = props;
  return (
    <div
      style={{ border: '1px solid #D1D1D1', display: 'flex', flexDirection: 'column', borderRadius: '8px', width: '1725px', height: 'auto', backgroundColor: "#FAFAFA", padding: '25px', ...className }}
    >
      <Icon style={iconClass} />
      <h4 className={`mt-2`}>{title}</h4>
      <span>{count}</span>
    </div>
  );
};
