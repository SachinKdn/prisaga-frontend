import theme from '@app/theme';
import { Box, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@assets/svg/cloud.svg';
import React, { useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useAuthenticatedFileUploadApi } from '@api/upload-file';
import { useEffect } from 'react';

interface Props {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  uploadedFileName?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  setValue: any;
  setIsUploading: (v: boolean) => void;
}
const UploadResume = (props: Props) => {
  const { uploadFile } = useAuthenticatedFileUploadApi();
  const { error: propError = '', setValue, setIsUploading } = props;
  // const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    setError(propError);
  }, [propError]);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setIsUploading(true);
        // setFileName(file.name);
        const payload = { file };
        const result = await uploadFile(payload);
        if (result && result.data?.resume.fileUrl) {
          console.log('result.data?.resume.fileUrl', result.data?.resume._id);
          setValue('resume', result.data?.resume._id);
        }
        setIsUploading(false);
        setError('');
      } else {
        setError('Please upload a valid pdf file.');
        setSelectedFile(null);
      }
    }
  };
  const handleBoxClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  return (
    <Box
      sx={{
        margin: 'auto',
        marginTop: '15px',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={handleBoxClick}
    >
      <Box sx={style.labelWrapper}>
        <Typography sx={style.para}>Upload</Typography>
        <Typography sx={style.error}>{error}</Typography>
      </Box>
      <Box sx={style.inputWrapper}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" style={{ margin: 'auto' }}>
          <IconButton disableRipple component="span" sx={style.iconWrapper}>
            <CloudUploadIcon />
            <Typography variant="body2" sx={style.text}>
              {selectedFile ? selectedFile.name : 'Upload Resume'}
            </Typography>
          </IconButton>
        </label>
      </Box>
    </Box>
  );
};

export default UploadResume;

const style = {
  para: {
    marginBottom: '7px',
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
    fontWeight: 400,
    lineHeight: '21px',
    [theme.breakpoints.down('md')]: {
      fontSize: '15px',
    },
  },
  error: {
    fontSize: '12px',
    color: 'red',
    height: '18px',
    marginBottom: '7px',
  },
  inputWrapper: {
    border: '1px solid #8B8B8B',
    backgroundColor: '#FAFAFA',
    borderRadius: '4px',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    height: '45px',
    display: 'grid',
    [theme.breakpoints.down('md')]: {
      // width: '306px',
    },
    [theme.breakpoints.down('sm')]: {
      // width: '216px',
    },
  },
  iconWrapper: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
  },
  labelWrapper: {
    display: 'flex',
    gap: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: '0.88rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    lineHeight: '21px',
    [theme.breakpoints.down('md')]: {
      fontSize: '13px',
    },
  },
};
