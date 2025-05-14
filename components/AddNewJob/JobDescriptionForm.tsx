import theme from '@app/theme';
import { Input } from '@components/common/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { jobDescriptionSchema } from '@utils/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MultilineTextField } from '@components/common/MultilineTextField';
import SkillsInput from '../common/SkillsInput';

interface Props {
  formData: Partial<IJob> | null;
  setFormData: (data: Partial<IJob>) => void;
  setActiveSectionIndex: (index: number) => void;
}
const JobDescriptionForm = (props: Props) => {
  const { formData, setFormData, setActiveSectionIndex } = props;
  const [skills, setSkills] = useState<string[]>(formData?.skills || []);

  const onChangeSkills = (skills: string[]) => {
    setValue('skills', skills);
    setSkills(skills);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IJobDescription>({
    resolver: yupResolver(jobDescriptionSchema),
    defaultValues: {
      minQualification: formData?.minQualification || undefined,
      salaryFrom: formData?.salaryFrom || undefined,
      salaryTo: formData?.salaryTo || undefined,
      experienceFrom: formData?.experienceFrom || undefined,
      experienceTo: formData?.experienceTo || undefined,
      description: formData?.description || undefined,
      skills: formData?.skills || [],
    },
  });
  const onSubmit: SubmitHandler<IJobDescription> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, ...data };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(3);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.wrapper}>
        <Input
          wrapperSx={{ flex: 1 }}
          name="minQualification"
          type="text"
          label="Minimum Qualification"
          placeholder="i.e. Bachelor's Degree"
          register={register}
          error={errors.minQualification?.message}
        />
        <Box sx={styles.formContainer}>
          <Input
            wrapperSx={{ flex: 1 }}
            name="salaryFrom"
            type="text"
            endAdornment="INR"
            label="Minimum Salary"
            placeholder="i.e. 600000"
            register={register}
            error={errors.salaryFrom?.message}
          />
          <Input
            wrapperSx={{ flex: 1 }}
            name="salaryTo"
            type="text"
            endAdornment="INR"
            label="Maximum Salary"
            placeholder="i.e. 700000"
            register={register}
            error={errors.salaryTo?.message}
          />
        </Box>
        <Box sx={styles.formContainer}>
          <Input
            wrapperSx={{ flex: 1 }}
            name="experienceFrom"
            type="text"
            endAdornment="Yr."
            label="Minimum Experience"
            placeholder="i.e. 6 months"
            register={register}
            error={errors.experienceFrom?.message}
          />
          <Input
            wrapperSx={{ flex: 1 }}
            name="experienceTo"
            type="text"
            endAdornment="Yr."
            label="Maximum Experience"
            placeholder="i.e. 2 years"
            register={register}
            error={errors.experienceTo?.message}
          />
        </Box>
        <MultilineTextField
          name="description"
          label="Job description"
          placeholder="Describe the job requirements..."
          rows={3}
          register={register}
          error={errors.description?.message}
        />
        <Box sx={{ width: '100%' }}>
          <SkillsInput
            value={skills}
            onChange={onChangeSkills}
            error={errors.skills?.message}
          />
        </Box>
        <Box sx={styles.buttonsWrapper}>
          <Button
            onClick={() => setActiveSectionIndex(1)}
            color="secondary"
            variant="outlined"
            sx={styles.back}
          >
            Back
          </Button>
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
    </form>
  );
};

export default JobDescriptionForm;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    height: '100%',
    width: '420px',
    margin: 'auto',
  },
  formWrapper: {
    width: '100%',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    marginTop: '15px',
    minWidth: '350px',
    width: '100%',
    mx: 'auto',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '8px',
    width: '100%',
  },
  error: {
    fontSize: '0.65rem',
    color: 'red',
    lineHeight: '14px',
  },
  next: {
    width: '70px',
    height: '30px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '12px',
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
};
