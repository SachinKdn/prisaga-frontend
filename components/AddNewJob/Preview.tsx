import theme from '@app/theme';
import SectionHeader from '@components/Profile/SectionHeader';
import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
interface Props {
  formData: Partial<IJob> | null;
  setActiveSectionIndex: (index: number) => void;
}
const Preview = (props: Props) => {
  const { formData, setActiveSectionIndex } = props;

  const basicBillingAmount = useMemo(() => {
    const salary = formData?.salaryTo || 0;
    const vendorPercentage = formData?.vendorData?.basicFeePercentage || 0;
    return (salary * vendorPercentage) / 100;
  }, [formData?.vendorData]);
  const proBillingAmount = useMemo(() => {
    const salary = formData?.salaryTo || 0;
    const vendorPercentage = formData?.vendorData?.premiumFeePercentage || 0;
    return (salary * vendorPercentage) / 100;
  }, [formData?.vendorData]);
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.editSection}>
        <SectionHeader
          title="Company Details"
          handleEdit={() => setActiveSectionIndex(0)}
        />
        <Box sx={styles.detailWrapper}>
          <DetailCard title="Company name" value={formData?.company?.name} />
          <DetailCard title="City" value={formData?.location?.city} />
          <DetailCard title="State" value={formData?.location?.state} />
          <DetailCard title="Website" value={formData?.company?.website_url} />
          <DetailCard title="Team size" value={formData?.company?.teamSize} />
        </Box>
        <SectionHeader
          title="Job Details"
          handleEdit={() => setActiveSectionIndex(1)}
        />
        <Box sx={styles.detailWrapper}>
          <DetailCard title="Title" value={formData?.title} />
          <DetailCard title="Openings" value={formData?.noOfOpenings} />
          <DetailCard
            title="Area of expertise"
            value={formData?.areaOfExpertise}
          />
          <DetailCard title="Job type" value={formData?.jobType} />
          <DetailCard title="Minimum Salary" value={formData?.salaryFrom} />
          <DetailCard title="Maximum Salary" value={formData?.salaryTo} />
          <DetailCard
            title="Minimum Experience Yr."
            value={formData?.experienceFrom}
          />
          <DetailCard
            title="Maximum Experience Yr."
            value={formData?.experienceTo}
          />
          <DetailCard
            title="Minimum Qualification"
            value={formData?.minQualification}
          />
        </Box>
        <SectionHeader
          title="Vendor Compensation"
          handleEdit={() => setActiveSectionIndex(3)}
        />
        <Box sx={styles.detailWrapper}>
          <DetailCard
            title="Compensation for Lite Membership"
            value={formData?.vendorData?.basicFeePercentage + '%'}
          />
          <DetailCard
            title="Compensation for Prime Membership"
            value={formData?.vendorData?.premiumFeePercentage + '%'}
          />
          <DetailCard
            title="Lite Membership Billing Amount"
            value={'₹ ' + basicBillingAmount}
          />
          <DetailCard
            title="Prime Membership Billing Amount"
            value={'₹ ' + proBillingAmount}
          />
        </Box>
        <SectionHeader
          title="Questionnaire"
          handleEdit={() => setActiveSectionIndex(4)}
        />
        <Box sx={styles.questionsWrapper}>
          {formData?.questionnaire?.map((QnA, index) => (
            <Box sx={styles.qna} key={index}>
              <Typography sx={styles.indexQna}>{index + 1 + '.'}</Typography>
              <Typography variant="body2" sx={styles.detailHeading}>
                {QnA.question}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
interface DetailProp {
  title: string;
  value?: string | number;
}
const DetailCard = (props: DetailProp) => {
  const { title, value } = props;
  return (
    <Box sx={styles.detail}>
      <Typography variant="body2" sx={styles.detailHeading}>
        {title}
      </Typography>
      <Typography variant="body2" sx={styles.detailSubHeading}>
        {value || '--'}
      </Typography>
    </Box>
  );
};
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  editSection: {
    py: 3,
    px: 3,
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  detailWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
    padding: 2,
  },
  questionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  qna: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'start',
  },
  indexQna: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailHeading: {
    fontWeight: 500,
    fontSize: '0.75rem',
    color: theme.palette.primary.contrastText,
  },
  detailSubHeading: {
    fontWeight: 500,
    fontSize: '0.75rem',
    color: theme.palette.primary.dark,
  },
};
