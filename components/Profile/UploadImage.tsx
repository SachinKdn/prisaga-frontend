'use client';
import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import defaultImage from '@assets/png/profile-pic-square.png';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Image, { StaticImageData } from 'next/image';
import theme from '@app/theme';
import { Oval } from 'react-loader-spinner';
import { AppDispatch } from '@store';
import { useDispatch } from 'react-redux';
import { useAuthenticatedFileUploadApi } from '@api/upload-file';
import handleSuccess from '@hooks/handleSuccess';
import { setUserInStore } from '@store/slices/user';

interface UserContainerProps {
  readOnly?: boolean;
  defaultSrc?: string;
}
const UploadImage: React.FC<UserContainerProps> = ({
  readOnly = false,
  defaultSrc = '',
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(
    defaultSrc || defaultImage
  );
  const { uploadProfilePicture } = useAuthenticatedFileUploadApi();
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoadingProfile(true);
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      const payload = { file };
      const result = await uploadProfilePicture(payload);
      if (result && result.data) {
        console.log(result, '<---result');
        handleSuccess('Profile Picture Updated Successfully');
        dispatch(setUserInStore(result.data));
      }
      setIsLoadingProfile(false);
    }
  };
  return (
    <Box sx={styles.imageBoxContainer}>
      {isLoadingProfile && (
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
        alt="Upload"
        layout="fill"
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      {!readOnly && !isLoadingProfile && (
        <Box sx={styles.imageBox} onClick={handleClick}>
          <input
            className="fileInputBox"
            ref={fileInputRef}
            type="file"
            id="image-input"
            name="photos"
            accept="jpeg, png"
            onChange={handleFileChange}
          />
          <CameraAltIcon
            sx={{
              width: '25px',
              height: '25px',
              color: theme.palette.primary.dark,
              [theme.breakpoints.down('sm')]: {
                width: '28px',
                height: '28px',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
export default UploadImage;

const styles = {
  imageBoxContainer: {
    width: '110px',
    height: '110px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    '& .image': {
      // borderRadius: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '110px',
    },
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08)',
  },
  imageBox: {
    // height: '40px',
    // width: '40px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    display: 'flex',
    backgroundColor: '#fff',
    zIndex: '1000',
    borderTopLeftRadius: '8px',
    padding: '2px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& .fileInputBox': {
      display: 'none',
    },
  },
};
