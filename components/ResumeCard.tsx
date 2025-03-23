import theme from '@app/theme';
import { Box, Typography, Button, Divider } from '@mui/material';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

interface Props {
  data: UploadedResume;
}
const ResumeCard = (props: Props) => {
  const { data } = props;
  const handleDownload = async () => {
    const link = document.createElement('a');
    link.href = data.resume.fileUrl;

    link.download = data.resume.fileName || 'resume-file';

    document.body.appendChild(link);
    link.target = '_blank';
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(data.resume.fileUrl);
  };

  return (
    <Box sx={style.wrapper}>
      <Box sx={style.innerWrapper}>
        {/* Row 1: Name, Email, Phone */}
        <Box sx={style.row}>
          <Box sx={style.nameSection}>
            <Typography sx={style.heading}>
              {data.firstName} &nbsp; {data.lastName}
            </Typography>
          </Box>
          <Box sx={style.contactSection}>
            <Box sx={style.contactItem}>
              <EmailIcon sx={style.icon} />
              <Typography sx={style.text}>{data.email}</Typography>
            </Box>
            <Box sx={style.contactItem}>
              <PhoneIcon sx={style.icon} />
              <Typography sx={style.text}>+91 {data.phoneNumber}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={style.divider} />

        {/* Row 2: Location and Experience */}
        <Box sx={style.row}>
          <Box sx={style.infoItem}>
            <LocationOnIcon sx={style.icon} />
            <Typography sx={style.text}>
              {data.location.city}, {data.location.state}
            </Typography>
          </Box>
          <Box sx={style.infoItem}>
            <WorkIcon sx={style.icon} />
            <Typography
              sx={style.text}
            >{`${data.experience === '0' ? '0-1 Yr. Experience' : data.experience + '+ Yr. Experience'}`}</Typography>
          </Box>
        </Box>

        <Divider sx={style.divider} />

        {/* Row 3: Skills, Expertise, Department */}
        <Box sx={style.skillsRow}>
          {/* <Box sx={style.skillSection}>
            <Box sx={style.skillHeader}>
              <CodeIcon sx={style.icon} />
              <Typography sx={style.subHeading}>Skills</Typography>
            </Box>
            <Box sx={style.skillTags}>
              <Box sx={style.tag}>React</Box>
              <Box sx={style.tag}>Node.js</Box>
              <Box sx={style.tag}>MongoDB</Box>
            </Box>
          </Box> */}

          <Box sx={style.skillSection}>
            <Box sx={style.skillHeader}>
              <BuildIcon sx={style.icon} />
              <Typography sx={style.subHeading}>Expertise</Typography>
            </Box>
            <Box sx={style.skillTags}>
              <Box sx={style.tag}>{data.areaOfExpertise}</Box>
            </Box>
          </Box>

          <Box sx={style.skillSection}>
            <Box sx={style.skillHeader}>
              <BusinessCenterIcon sx={style.icon} />
              <Typography sx={style.subHeading}>Summary</Typography>
            </Box>
            <Typography sx={style.text}>
              {data.summary || 'Not available'}
            </Typography>
          </Box>
        </Box>

        {/* Download Button */}
        <Box sx={style.downloadSection}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon sx={{ fontSize: '0.88rem !important' }} />}
            sx={style.downloadBtn}
            onClick={handleDownload}
          >
            Download Resume
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResumeCard;

const style = {
  wrapper: {
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '4px 8px',
  },
  nameSection: {
    display: 'flex',
    alignItems: 'center',
  },
  contactSection: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  skillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    padding: '4px 8px',
  },
  skillSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: '1 1 200px',
  },
  skillHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.68rem',
    display: 'inline-block',
  },
  heading: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  subHeading: {
    fontSize: '0.88rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  text: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
  divider: {
    margin: '2px 0',
  },
  downloadSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  downloadBtn: {
    borderRadius: '4px',
    textTransform: 'none',
    color: 'white',
    height: '28px',
    fontSize: '0.68rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
  },
};
