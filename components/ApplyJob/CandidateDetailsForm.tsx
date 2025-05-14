import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApplicationFormSchema } from '@utils/yup';
import theme from '@app/theme';
import { Input } from '@components/common/Input';
import { DetailsHeading } from '@components/DetailsHeading';
import FormControllerSelector from '@components/common/FormControllerSelector';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs, { Dayjs } from 'dayjs';
import {
  areaOfExpertises,
  genders,
  currencies,
  salaryTenures,
  noticePeriods,
  experienceLevels,
} from '@constant/resume-data';
import { MultilineTextField } from '@components/common/MultilineTextField';
import SkillsInput from '@components/common/SkillsInput';
import ExperienceForm from './ExperienceForm';
import Person4Icon from '@mui/icons-material/Person4';
import HistoryIcon from '@mui/icons-material/History';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PublicIcon from '@mui/icons-material/Public';
import AccessibleIcon from '@mui/icons-material/Accessible';
import TransgenderIcon from '@mui/icons-material/Transgender';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
interface Props {
  formData: Partial<IApplicationForm> | null;
  setFormData: (data: Partial<IApplicationForm>) => void;
  setActiveSectionIndex: (index: number) => void;
}

// Diversity options for the multi-select
const diversityOptions: Option[] = [
  { value: 'age', label: 'Age diversity', image: Person4Icon },
  { value: 'career_break', label: 'Career break', image: HistoryIcon },
  { value: 'cultural', label: 'Cultural diversity', image: Diversity2Icon },
  { value: 'lgbtq', label: 'LGBTQI diversity', image: Diversity1Icon },
  {
    value: 'differently_abled',
    label: 'Differently-abled',
    image: AccessibleIcon,
  },
  { value: 'gender', label: 'Gender diversity', image: TransgenderIcon },
  { value: 'international', label: 'International', image: PublicIcon },
  { value: 'religious', label: 'Religious diversity', image: TempleHinduIcon },
];

const CandidateDetailsForm = (props: Props) => {
  const { formData, setFormData, setActiveSectionIndex } = props;
  console.log('CandidateDetailsForm formData---', formData);
  const maxDate = dayjs();
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  const [skills, setSkills] = useState<string[]>([]);

  const onChangeSkills = (skills: string[]) => {
    setValue('skills', skills);
    setSkills(skills);
  };
  const methods = useForm<IApplicationForm>({
    resolver: yupResolver(ApplicationFormSchema),
    defaultValues: {
      job: formData?.job,
      resume: formData?.resume,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      phoneNumber: formData?.phoneNumber,
      email: formData?.email,
      isFresher: formData?.isFresher || true,
      experiences: formData?.experiences || [],
      isActive: true,
    },
  });
  const isActive = methods.watch('isActive');

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  const CustomCalendarIcon = () => (
    <Box sx={{ color: '#757897', display: 'grid', placeItems: 'center' }}>
      <CalendarMonthIcon />
    </Box>
  );
  useEffect(() => {
    const indianStates = getIndianStates();
    setStates(indianStates);
  }, []);
  useEffect(() => {
    if (selectedState) {
      const cityList = getCitiesByState(selectedState);
      setCities(cityList);
      setValue('location.city', '');
    }
  }, [selectedState, setValue]);

  const onSubmit: SubmitHandler<IApplicationForm> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, ...data };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(2);
  };
  const handleDateChange = (date: Dayjs | null) => {
    if (date) setValue('dob', date.format('YYYY-MM-DD'));
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.wrapper}>
          <Box sx={styles.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="firstName"
              type="text"
              required
              label="First Name"
              placeholder="First name"
              register={methods.register}
              error={errors.firstName?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last name"
              register={methods.register}
              error={errors.lastName?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="email"
              type="text"
              required
              disabled
              label="Email"
              placeholder="Email"
              register={methods.register}
              error={errors.email?.message}
            />
          </Box>
          <Box sx={styles.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="phoneNumber"
              type="text"
              required
              disabled
              label="Phone Number"
              register={methods.register}
              placeholder="10 digit phone number"
              error={errors.phoneNumber?.message}
            />
            <Box style={{ width: '100%' }}>
              <Typography sx={styles.labelText}>Date of birth *</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={watch('dob') ? dayjs(watch('dob')) : null}
                  onChange={handleDateChange}
                  sx={styles.datePicker}
                  maxDate={maxDate}
                  format="DD/MM/YYYY"
                  slots={{
                    openPickerIcon: CustomCalendarIcon,
                  }}
                />
              </LocalizationProvider>
              <Typography
                sx={styles.error}
                style={{
                  visibility: errors.dob?.message ? 'visible' : 'hidden',
                }}
              >
                {errors.dob?.message}
              </Typography>
            </Box>
            <FormControllerSelector<IApplicationForm>
              name="gender"
              control={methods.control}
              required
              labelText="Select gender"
              options={genders}
              errorMessage={errors.gender?.message}
              placeholder="Select gender"
              wrapperSx={styles.formWrapper}
            />
            <FormControllerSelector<IApplicationForm>
              name="areaOfExpertise"
              control={methods.control}
              required
              labelText="Select area of expertise"
              options={areaOfExpertises}
              errorMessage={errors.areaOfExpertise?.message}
              placeholder="Select area"
              // wrapperSx={styles.formSelector}
            />
            <FormControllerSelector<IApplicationForm>
              name="experience"
              control={methods.control}
              required
              labelText="Experience Level"
              options={experienceLevels}
              errorMessage={errors.experience?.message}
              placeholder="Select Experience Level"
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="linkedin"
              type="text"
              label="LinkedIn Profile"
              placeholder="LinkedIn URL"
              register={methods.register}
              error={errors.linkedin?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="website"
              type="text"
              label="Website URL"
              register={methods.register}
              placeholder="www.website_url.com"
              error={errors.website?.message}
            />
          </Box>
          <DetailsHeading title="Address Details" />
          <Box sx={styles.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="location.postalCode"
              type="number"
              label="Pincode"
              register={methods.register}
              placeholder="6 digit code"
              error={errors.location?.postalCode?.message}
            />
            <FormControllerSelector<IApplicationForm>
              name="location.state"
              control={methods.control}
              required
              labelText="Select state"
              options={states}
              errorMessage={errors.location?.state?.message}
              placeholder="Select state"
              onSelect={setSelectedState}
            />
            <FormControllerSelector<IApplicationForm>
              name="location.city"
              control={methods.control}
              required
              labelText="Select city"
              options={cities}
              errorMessage={errors.location?.city?.message}
              placeholder="Select city"
            />
          </Box>
          <DetailsHeading title="Additional Details" />
          {/* <Box sx={styles.formContainer}> */}
          <MultilineTextField
            name="summary"
            label="Candidate Summary"
            register={methods.register}
            placeholder="Describe the candidate"
            rows={3}
            error={errors.summary?.message}
          />
          {/* </Box> */}

          <DetailsHeading title="Education Details" />
          <MultilineTextField
            name="qualifications"
            label="Qualifications"
            register={methods.register}
            placeholder="Describe the candidate's education details"
            required
            rows={3}
            error={errors.qualifications?.message}
          />
          <Box sx={{ width: '100%' }}>
            <SkillsInput
              value={skills}
              onChange={onChangeSkills}
              error={errors.skills?.message}
            />
          </Box>
          <ExperienceForm />
          <DetailsHeading title="Salary Details" />
          {!watch('isFresher') && (
            <Box sx={styles.formContainer}>
              <FormControllerSelector<IApplicationForm>
                name="currentSalary.currency"
                control={methods.control}
                required
                labelText="Currency"
                options={currencies}
                errorMessage={errors.currentSalary?.currency?.message}
                placeholder="Select currency"
              />
              <Input
                wrapperSx={{ flex: 1 }}
                name="currentSalary.amount"
                type="number"
                required
                label="Current Salary"
                placeholder="Enter amount"
                register={methods.register}
                error={errors.currentSalary?.amount?.message}
              />
              <FormControllerSelector<IApplicationForm>
                name="currentSalary.tenure"
                control={methods.control}
                required
                labelText="Salary Tenure"
                options={salaryTenures}
                errorMessage={errors.currentSalary?.tenure?.message}
                placeholder="Select tenure"
              />
            </Box>
          )}

          <Box sx={styles.formContainer}>
            <FormControllerSelector<IApplicationForm>
              name="expectedSalary.currency"
              control={methods.control}
              required
              labelText="Currency"
              options={currencies}
              errorMessage={errors.expectedSalary?.currency?.message}
              placeholder="Select currency"
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="expectedSalary.amount"
              type="number"
              required
              label="Expected Salary"
              placeholder="Enter amount"
              register={methods.register}
              error={errors.expectedSalary?.amount?.message}
            />
            <FormControllerSelector<IApplicationForm>
              name="expectedSalary.tenure"
              control={methods.control}
              required
              labelText="Salary Tenure"
              options={salaryTenures}
              errorMessage={errors.expectedSalary?.tenure?.message}
              placeholder="Select tenure"
            />
          </Box>
          {!watch('isFresher') && (
            <FormControllerSelector<IApplicationForm>
              name="noticePeriod"
              control={methods.control}
              required
              labelText="Notice Period"
              options={noticePeriods}
              errorMessage={errors.noticePeriod?.message}
              placeholder="Select notice period"
            />
          )}
          <FormControllerSelector<IApplicationForm>
            name="diversityParameters"
            control={methods.control}
            labelText="Please identify the candidate's Diversity parameter"
            options={diversityOptions}
            errorMessage={errors.diversityParameters?.message}
            placeholder="Select diversity parameters"
            multiple
            defaultValue={[]}
          />
          <MultilineTextField
            name="diversityComments"
            label="Please describe about candidate's Diversity parameter"
            placeholder="Mention specific comments regarding the Diversity of this candidate, if any."
            rows={2}
            register={methods.register}
            error={errors.diversityComments?.message}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(e) => {
                  setValue('isActive', e.target.checked);
                }}
              />
            }
            label="Candidate is currently looking for job"
            sx={styles.checkboxLabel}
          />
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
      </form>
    </FormProvider>
  );
};

export default CandidateDetailsForm;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    height: '100%',
    width: '820px',
    margin: 'auto',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
    marginBottom: '8px',
    width: '100%',
  },
  formWrapper: {
    width: '100%',
  },
  datePicker: {
    width: '100%',
    '& .MuiPickersInputBase-root': {
      paddingLeft: '0',
    },
    '& .MuiPickersInputBase-sectionsContainer': {
      borderRadius: '8px',
      height: '38px !important',
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '10px 12px',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },
    '& .MuiInputLabel-root': {
      lineHeight: 0.5,
      overflow: 'visible',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #EDEDED !important',
    },
  },
  labelText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    marginBottom: '4px',
  },
  selectItem: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
  },
  error: {
    fontSize: '0.65rem',
    color: 'red',
    height: '18px',
    margin: 0,
    lineHeight: 'unset',
    '& .MuiFormControl-root .MuiFormHelperText-root': {
      lineHeight: '18px !important',
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
  salaryGroup: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr 120px',
    gap: '16px',
    width: '100%',
  },
  checkboxLabel: {
    width: '100%',
    '& .MuiTypography-root': {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: theme.palette.text.secondary,
    },
  },
};
