import theme from '@app/theme';
import { Input } from '@components/common/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { AddCandidateFormSchema } from '@utils/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { checkCandidate } from '@api/client';
// import pdfToText from 'react-pdftotext';
import UploadResume from '@components/common/UploadResume';
import { CircleCheck } from 'lucide-react';
import handleError from '@hooks/handleError';

interface Props {
  jobId: string;
  formData: Partial<IApplicationForm> | null;
  setFormData: (data: Partial<IApplicationForm>) => void;
  setActiveSectionIndex: (index: number) => void;
}
const AddCandidateForm = (props: Props) => {
  const { setFormData, setActiveSectionIndex, jobId } = props;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isOpenUploadResume, setIsOpenUploadResume] = useState<boolean>(false);
  const [uploadedResumes, setUploadedResumes] = useState<UploadedFile[]>([]);
  console.log('uploading', uploading);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IAddCandidate>({
    resolver: yupResolver(AddCandidateFormSchema),
    context: { isResumeRequired: isOpenUploadResume },
  });

  console.log(errors, 'watch', watch('resume'));

  const onSubmit: SubmitHandler<IAddCandidate> = async (data) => {
    console.log('submitted---', data);
    if (!isOpenUploadResume) {
      setLoading(true);
      const payload = { jobId, ...data };
      const res = await checkCandidate(payload);
      console.log('res---->\n\n\n', res);
      setLoading(false);
      if (!res) return;
      if (res.isAlreadyApplied) {
        handleError(new Error('Candidate already applied for this job'));
        // setIsCandidateFound(true);
      } else {
        // setIsCandidateFound(false);
        setIsOpenUploadResume(true);
        const resumes = res.applications
          .map((app) => app.resume)
          .filter(Boolean)
          .map((resume) => ({
            fileName: resume.fileName,
            fileUrl: resume.fileUrl,
            _id: resume._id,
          }));

        setUploadedResumes(resumes);
      }
    } else {
      setFormData({ ...data, job: jobId });
      setActiveSectionIndex(1);
    }
  };
  const handleSelectResume = (resumeId: string) => {
    setValue('resume', resumeId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isOpenUploadResume ? (
        <Box sx={styles.wrapper}>
          <Box sx={styles.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="firstName"
              type="text"
              label="Candidate name"
              placeholder="Enter candidate name"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              name="email"
              type="text"
              label="Email"
              placeholder="Enter email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              name="phoneNumber"
              type="phone"
              label="Phone Number"
              placeholder="Enter Phone Number"
              register={register}
              error={errors.phoneNumber?.message}
            />
          </Box>
          {/* {isCandidateFound && <Typography sx={styles.message}>Candidate already applied for this job</Typography>} */}
          <Box sx={styles.buttonsWrapper}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={styles.next}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={18} style={{ color: 'white' }} />
                </Box>
              ) : (
                `Check and Continue`
              )}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={styles.wrapper}>
          <UploadResume
            name="pdf"
            label="Upload Resume"
            required={true}
            setValue={setValue}
            error={errors.resume && errors.resume.message}
            setIsUploading={setUploading}
            uploadedFileName={''}
          />
          {uploadedResumes.length > 0 && (
            <Typography sx={styles.or}>or</Typography>
          )}
          <Box sx={styles.wrapper}>
            {uploadedResumes.map((resume, index) => (
              <ResumeSelector
                key={index}
                resume={resume}
                handleSelectResume={handleSelectResume}
                isSelected={watch('resume') === resume._id}
              />
            ))}
          </Box>
          <Box sx={styles.buttonsWrapper}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={styles.next}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </form>
  );
};

export default AddCandidateForm;

const ResumeSelector = ({
  resume,
  handleSelectResume,
  isSelected,
}: {
  resume: UploadedFile;
  handleSelectResume: (v: string) => void;
  isSelected: boolean;
}) => {
  return (
    <Box sx={styles.card} onClick={() => handleSelectResume(resume._id)}>
      <Typography sx={styles.text}>{resume.fileName}</Typography>
      {isSelected && (
        <CircleCheck size={16} strokeWidth={2.5} color={'#299764'} />
      )}
    </Box>
  );
};

const styles = {
  card: {
    width: '100%',
    display: 'flex',
    borderRadius: '4px',
    border: '1px solid #8B8B8B',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    gap: '1rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0000000F',
      boxShadow: '0px 2px 30px 0px #0000000F',
    },
  },
  text: {
    fontSize: '0.75rem',
    color: theme.palette.text.primary,
    fontWeight: '500',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    height: '100%',
    width: '420px',
    margin: 'auto',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '5px',
    marginBottom: '8px',
    width: '100%',
  },
  formSelector: {
    width: '200px !important',
  },
  formWrapper: {
    width: '100%',
  },
  or: {
    fontWeight: 600,
    fontSize: '0.75rem',
  },
  createButton: {
    fontWeight: 600,
    fontSize: '0.75rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 2,
    marginTop: '15px',
    minWidth: '350px',
    width: '100%',
    mx: 'auto',
  },
  error: {
    fontSize: '0.65rem',
    color: 'red',
    lineHeight: '14px',
  },
  labelText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    marginBottom: '4px',
  },
  textField: {
    borderRadius: '12px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '8px 10px',

      // Autofill styling
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: '#4A4A4A',
        caretColor: '#4A4A4A',
        borderRadius: 'inherit',
        fontFamily: 'inherit',
      },
      '& input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: '#4A4A4A',
      },
      '& input:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
      },
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
      outline: 'none',
    },
    '& .MuiFormHelperText-root': {
      lineHeight: '1',
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: '0.25rem',
    width: '100%',
    height: 'auto',
    marginTop: '8px',
  },
  chipText: {
    fontSize: '0.6rem',
    fontWeight: '500',
    color: theme.palette.primary.main,
  },
  chipIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  chip: {
    borderRadius: '4px',
    lineHeight: '17px',
    width: '100%',
    padding: '6px 8px',
    border: '1px solid #358D9E',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  next: {
    width: '150px',
    height: '30px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.6rem',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  back: {
    width: '60px',
    height: '30px',
    borderWidth: '1.5px',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  message: {
    fontSize: '0.88rem',
    fontWeight: '500',
    color: 'red',
  },
};
