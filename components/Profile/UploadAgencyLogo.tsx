'use client';
import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import defaultImage from '@assets/png/default-company-logo.png';
import Image, { StaticImageData } from 'next/image';
import theme from '@app/theme';
import { Oval } from 'react-loader-spinner';
import { AppDispatch } from '@store';
import { useDispatch } from 'react-redux';
import { useAuthenticatedFileUploadApi } from '@api/upload-file';
import handleSuccess from '@hooks/handleSuccess';
import { setAgencyLogoInStore } from '@store/slices/user';

interface AgencyLogoProps {
  readOnly?: boolean;
  defaultSrc?: string;
  agencyId: string;
}

const UploadAgencyLogo: React.FC<AgencyLogoProps> = ({
  readOnly = false,
  defaultSrc = '',
  agencyId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(
    defaultSrc || defaultImage
  );
  const { uploadAgencyLogo } = useAuthenticatedFileUploadApi();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoadingLogo(true);
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      const payload = { file };
      const result = await uploadAgencyLogo(payload, agencyId);
      if (result && result.data) {
        console.log(result);
        handleSuccess('Agency Logo Updated Successfully');
        dispatch(setAgencyLogoInStore(result.data.logo));
      }
      setIsLoadingLogo(false);
    }
  };

  //   const handleDeleteLogo = () => {
  //     setImageUrl(defaultImage);
  //     // Add API call to delete logo if needed
  //   };

  return (
    <Box sx={styles.outerWrapper}>
      <Box sx={styles.imageBoxContainer}>
        {isLoadingLogo && (
          <Box
            sx={{
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(1px)',
              position: 'absolute',
              zIndex: '10000',
            }}
          >
            <Oval
              ariaLabel="loading"
              height={30}
              width={30}
              color="#358D9E"
              secondaryColor="#fff"
              strokeWidth={7}
            />
          </Box>
        )}
        <Image
          className="image"
          src={imageUrl}
          alt="Agency Logo"
          layout="fill"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
        {!readOnly && !isLoadingLogo && (
          <Box sx={styles.buttonContainer}>
            <input
              className="fileInputBox"
              ref={fileInputRef}
              type="file"
              id="logo-input"
              name="logo"
              accept="jpeg, png"
              onChange={handleFileChange}
            />
          </Box>
        )}
      </Box>
      {!readOnly && (
        <Box sx={styles.buttonWrapper}>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={styles.uploadButton}
          >
            {defaultSrc.length === 0 ? 'Upload Logo' : 'Change Logo'}
          </Button>
          {/* {defaultSrc.length !== 0 && <Button
            variant="outlined"
            onClick={handleDeleteLogo}
            sx={styles.deleteButton}
          >
            Delete Logo
          </Button>} */}
        </Box>
      )}
    </Box>
  );
};

export default UploadAgencyLogo;

const styles = {
  outerWrapper: {
    width: 'auto',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    // marginBottom: '2rem'
  },
  imageBoxContainer: {
    // border: '2px solid #358D9E',
    width: '110px',
    height: '110px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0px 0px 8px 0px #358D9E',
    [theme.breakpoints.down('sm')]: {
      width: '110px',
    },
  },
  buttonContainer: {
    position: 'absolute',
    right: '-120px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '& .fileInputBox': {
      display: 'none',
    },
  },
  uploadButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '20px',
    textTransform: 'none',
    fontSize: '0.75rem',
    boxShadow: 'none',
    padding: '4px 12px',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  deleteButton: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    borderRadius: '20px',
    textTransform: 'none',
    fontSize: '0.75rem',
    padding: '4px 12px',
    '&:hover': {
      borderColor: theme.palette.error.dark,
      backgroundColor: 'rgba(211, 47, 47, 0.04)',
    },
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
};
