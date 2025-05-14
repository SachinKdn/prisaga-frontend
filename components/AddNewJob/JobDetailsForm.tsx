import theme from '@app/theme';
import FormControllerSelector from '@components/common/FormControllerSelector';
import { Input } from '@components/common/Input';
import { areaOfExpertises, jobTypes } from '@constant/resume-data';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { jobBasicSchema } from '@utils/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  formData: Partial<IJob> | null;
  setFormData: (data: Partial<IJob>) => void;
  setActiveSectionIndex: (index: number) => void;
}
const JobDetailsForm = (props: Props) => {
  const { formData, setFormData, setActiveSectionIndex } = props;
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [jobInsights, setJobInsights] = useState<string[]>(
    formData?.jobInsights || []
  );
  const [currentJobInsight, setCurrentJobInsight] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IJobBasic>({
    resolver: yupResolver(jobBasicSchema),
    defaultValues: {
      title: formData?.title,
      location: formData?.location,
      noOfOpenings: formData?.noOfOpenings,
      areaOfExpertise: formData?.areaOfExpertise,
      jobType: formData?.jobType,
      jobInsights: formData?.jobInsights,
    },
  });

  console.log(errors);
  useEffect(() => {
    const indianStates = getIndianStates();
    setStates(indianStates);
    if (formData?.location?.state) {
      const cityList = getCitiesByState(formData?.location?.state);
      setCities(cityList);
    }
  }, []);
  useEffect(() => {
    if (selectedState) {
      const cityList = getCitiesByState(selectedState);
      setCities(cityList);
      setValue('location.city', '');
    }
  }, [selectedState, setValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentJobInsight.trim() !== '') {
      e.preventDefault();
      const temp = [...jobInsights, currentJobInsight.trim()];
      setValue('jobInsights', temp);
      setJobInsights(temp);
      setCurrentJobInsight('');
    }
  };

  const handleChange = (e) => {
    setCurrentJobInsight(e.target.value);
  };
  const handleDeleteJobInsight = (value: string) => {
    const temp = jobInsights.filter((jobInsight) => jobInsight !== value);
    setValue('jobInsights', temp);
    setJobInsights(temp);
  };
  const onSubmit: SubmitHandler<IJobBasic> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, ...data };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(2);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.formContainer}>
          <Input
            wrapperSx={{ flex: 1 }}
            name="title"
            type="text"
            label="Job Title"
            placeholder="Enter job title"
            register={register}
            error={errors.title?.message}
          />
          <Input
            wrapperSx={{ flex: 1 }}
            name="noOfOpenings"
            type="number"
            label="Number of openings"
            placeholder="Enter no. of openings"
            register={register}
            error={errors.noOfOpenings?.message}
          />
        </Box>
        <Box sx={styles.formContainer}>
          <Input
            name="location.postalCode"
            type="number"
            label="Postal code"
            placeholder="6 digit code"
            register={register}
            error={errors.location?.postalCode?.message}
          />
          <FormControllerSelector<IJobBasic>
            name="location.state"
            control={control}
            labelText="Select state"
            options={states}
            errorMessage={errors.location?.state?.message}
            placeholder="Select state"
            onSelect={setSelectedState}
            wrapperSx={styles.formSelector}
          />
        </Box>
        <Box sx={styles.formContainer}>
          <FormControllerSelector<IJobBasic>
            name="location.city"
            control={control}
            labelText="Select city"
            options={cities}
            errorMessage={errors.location?.city?.message}
            placeholder="Select city"
            wrapperSx={styles.formSelector}
          />
          <FormControllerSelector<IJobBasic>
            name="areaOfExpertise"
            control={control}
            labelText="Select area of expertise"
            options={areaOfExpertises}
            errorMessage={errors.areaOfExpertise?.message}
            placeholder="Select area"
            wrapperSx={styles.formSelector}
          />
        </Box>
        <FormControllerSelector<IJobBasic>
          name="jobType"
          control={control}
          labelText="Select Job Type"
          options={jobTypes}
          errorMessage={errors.jobType?.message}
          placeholder="Select type"
          wrapperSx={styles.formWrapper}
        />
        <Box sx={{ width: '100%' }}>
          <Typography sx={styles.labelText}>Job Insights</Typography>
          <TextField
            name="jobInsights"
            id="outlined-multiline-static"
            // label="Skills"
            value={currentJobInsight}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            multiline
            placeholder="More than 3 job insights"
            sx={styles.textField}
          />
          {errors.jobInsights?.message && (
            <Typography
              sx={styles.error}
              style={{
                visibility: errors.jobInsights?.message ? 'visible' : 'hidden',
              }}
            >
              {errors.jobInsights?.message}
            </Typography>
          )}
          <Box sx={styles.chipWrapper}>
            {jobInsights.map((jobInsight, index) => (
              <Box sx={styles.chip} key={index}>
                <Typography sx={styles.chipText} key={index}>
                  {jobInsight}
                </Typography>
                <Box
                  sx={styles.chipIcon}
                  onClick={() => handleDeleteJobInsight(jobInsight)}
                >
                  <CancelIcon
                    fontSize="small"
                    sx={{ height: '15px', padding: '0' }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={styles.buttonsWrapper}>
          <Button
            onClick={() => setActiveSectionIndex(0)}
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

export default JobDetailsForm;

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
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
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
    justifyContent: 'space-between',
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
    width: '70px',
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
};
