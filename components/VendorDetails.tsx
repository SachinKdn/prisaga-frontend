'use client';
import React, { useState } from 'react';
import CustomTable from './CustomTable';

import SubmittedIcon from '@assets/svg/submitted-icon.svg';
import SuccessIcon from '@assets/svg/success-icon.svg';
import RejectedIcon from '@assets/svg/rejected-icon.svg';
import { ChartColumn, Ellipsis } from 'lucide-react';
import { Box, Typography, Button } from '@mui/material';
import AgencyDetails from './Profile/AgencyDetails';
import PersonalDetails from './Profile/PersonalDetails';
import SubscriptionDetails from './Subscription/SubscriptionDetail';
import BackPage from './BackPage';
import theme from '@app/theme';
import EditSubscriptionModal from './EditSubscriptionModal';

interface Props {
  data: AgencyDetails;
}

const VendorDetails = (props: Props) => {
  const { data } = props;
  const [isEditSubscriptionModal, setIsEditSubscriptionModal] = useState(false);

  const [agency, setAgency] = useState<Agency>(data.agency);
  console.log('Vendor Entire Date----', agency);
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <BackPage />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#0F1C1B', lineHeight: 1.33, fontWeight: '600' }}
          >
            {agency.agencyName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#5B617A', fontWeight: 500, fontSize: '1rem' }}
          >
            {agency.location.city}-{agency.location.state}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <SubscriptionDetails subscriptionType={agency?.subscriptionType} />
          <Button
            onClick={() => {
              setIsEditSubscriptionModal(true);
            }}
            color="secondary"
            variant="outlined"
            sx={styles.cancel}
          >
            Change
          </Button>
        </Box>
      </Box>
      <PersonalDetails
        title="Agency Admin Details"
        user={agency.createdBy}
        isEditable={false}
      />
      <AgencyDetails agency={agency} isEditable={false} />
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
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, mt: 4 }}
        >
          <ChartColumn size={18} />
          <Typography
            variant="body2"
            sx={{ color: '#5B617A', fontWeight: 500 }}
          >
            Applications Statistics
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, paddingLeft: 6 }}>
          <CountCard
            title="Requested"
            count={10}
            icon={SubmittedIcon}
            iconClass={{ width: '25px', height: '25px', color: '#0338CD' }}
            className={{ color: '#0338CD' }}
          />
          <CountCard
            title="Pending"
            count={2}
            icon={Ellipsis}
            iconClass={{ width: '25px', height: '25px' }}
            className={{ color: '#5B617A' }}
          />
          <CountCard
            title="Approved"
            count={6}
            icon={SuccessIcon}
            iconClass={{ width: '25px', height: '25px' }}
            className={{ color: '#1E4F56' }}
          />
          <CountCard
            title="Rejected"
            count={2}
            icon={RejectedIcon}
            iconClass={{ width: '25px', height: '20px' }}
            className={{ color: '#CB0000' }}
          />
        </Box>
      </Box>

      <CustomTable
        key={data.members.length}
        columns={columns}
        data={data.members || []}
        totalCount={data.members.length || 0}
      />
      {isEditSubscriptionModal && (
        <EditSubscriptionModal
          open={isEditSubscriptionModal}
          onClose={() => setIsEditSubscriptionModal(false)}
          agencyId={agency._id}
          currentSubscription={agency.subscriptionType}
          onSubscriptionUpdated={(newSubscriptionType: string) => {
            // Refresh agency data or update UI
            setAgency({
              ...agency,
              subscriptionType: newSubscriptionType,
            });
          }}
        />
      )}
    </Box>
  );
};

export default VendorDetails;

const styles = {
  cancel: {
    width: '90px',
    height: '25px',
    borderWidth: '1.5px',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '40px',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
};

interface CountProps {
  title: string;
  iconClass?: React.CSSProperties;
  className?: React.CSSProperties;
  count: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export const CountCard = (props: CountProps) => {
  const { count, title, icon: Icon, iconClass, className } = props;
  return (
    <div
      style={{
        border: '1px solid #D1D1D1',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        width: '1725px',
        height: 'auto',
        backgroundColor: '#FAFAFA',
        padding: '25px',
        ...className,
      }}
    >
      <Icon style={iconClass} />
      <h4 className={`mt-2`}>{title}</h4>
      <span>{count}</span>
    </div>
  );
};
