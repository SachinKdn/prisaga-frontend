'use client';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { DetailsHeading } from './DetailsHeading';
import theme from '@app/theme';
import { Input } from './common/Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResumeFormSchema } from '@utils/yup';
import { areaOfExpertises, experienceLevels } from '@constant/resume-data';
import UploadResume from './common/UploadResume';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { createResume } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { useRouter } from 'next/navigation';

const CreateResumeForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<Resume>({
    resolver: yupResolver(ResumeFormSchema),
    defaultValues: {
      location: {
        city: '',
        state: '',
      },
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

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

  const onSubmit: SubmitHandler<Resume> = async (data) => {
    console.log('submitted---', data);
    setLoading(true);
    const result = await createResume(data);
    console.log(result);
    if (result) {
      handleSuccess('Resume created successfully');
      router.back();
    }
    setLoading(false);
  };
  return (
    <Box sx={style.wrapper}>
      <Typography variant="h2" sx={style.heading}>
        Let&apos;s add the new resume in our warehouse
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DetailsHeading title="Personal Details" />
        <Box sx={style.innerWrapper}>
          <Box sx={style.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="firstName"
              type="text"
              label="First Name"
              placeholder="First name"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last name"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="email"
              type="text"
              label="Email"
              placeholder="Email"
              register={register}
              error={errors.email?.message}
            />
          </Box>
          <Box sx={style.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="phoneNumber"
              type="text"
              label="Phone Number"
              placeholder="10 digit phone number"
              register={register}
              error={errors.phoneNumber?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="linkedin"
              type="text"
              label="LinkedIn Profile"
              placeholder="LinkedIn URL"
              register={register}
              error={errors.linkedin?.message}
            />
            <Input
              wrapperSx={{ flex: 1 }}
              name="website"
              type="text"
              label="Website URL"
              placeholder="www.website_url.com"
              register={register}
              error={errors.website?.message}
            />
          </Box>
          <DetailsHeading title="Address Details" />
          <Box sx={style.formContainer}>
            <Input
              wrapperSx={{ flex: 1 }}
              name="location.postalCode"
              type="number"
              label="Pincode"
              placeholder="6 digit code"
              register={register}
              error={errors.location?.postalCode?.message}
            />

            <Box sx={{ flex: 1 }}>
              <Typography sx={style.labelText}>Select State</Typography>
              <FormControl
                fullWidth
                error={!!errors.location?.state}
                sx={[
                  style.formController,
                  {
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        border: errors.location?.state
                          ? '1px solid red'
                          : '1px solid #8B8B8B',
                        outline: 'none',
                      },
                  },
                ]}
              >
                <Controller
                  name="location.state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      inputProps={{ MenuProps: { disableScrollLock: true } }}
                      {...field}
                      displayEmpty
                      sx={style.select}
                    >
                      <MenuItem value="" disabled sx={style.selectItem}>
                        Select State
                      </MenuItem>
                      {states.map((state) => (
                        <MenuItem
                          key={state.value}
                          value={state.label}
                          onClick={() => setSelectedState(state.value)}
                          sx={style.selectItem}
                        >
                          {state.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {!!errors.location?.state?.message && (
                  <Typography sx={style.error}>
                    {errors.location?.state?.message}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={style.labelText}>Select City</Typography>
              <FormControl
                fullWidth
                error={!!errors.location?.city}
                sx={[
                  style.formController,
                  {
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        border: errors.location?.city
                          ? '1px solid red'
                          : '1px solid #8B8B8B',
                        outline: 'none',
                      },
                  },
                ]}
              >
                <Controller
                  name="location.city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      sx={style.select}
                      inputProps={{ MenuProps: { disableScrollLock: true } }}
                    >
                      <MenuItem value="" disabled sx={style.selectItem}>
                        Select City
                      </MenuItem>
                      {cities.map((city) => (
                        <MenuItem
                          key={city.value}
                          value={city.value}
                          sx={style.selectItem}
                        >
                          {city.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {!!errors.location?.city?.message && (
                  <Typography sx={style.error}>
                    {errors.location?.city?.message}
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
          <DetailsHeading title="Professional Details" />
          <Box sx={style.formContainer}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={style.labelText}>
                Select Experience Level
              </Typography>
              <FormControl
                fullWidth
                error={!!errors.experience}
                sx={[
                  style.formController,
                  {
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        border: errors.experience
                          ? '1px solid red !important'
                          : '1px solid #8B8B8B',
                        outline: 'none',
                      },
                  },
                ]}
              >
                <Controller
                  name="experience"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      sx={style.select}
                      inputProps={{ MenuProps: { disableScrollLock: true } }}
                    >
                      <MenuItem value="" disabled sx={style.selectItem}>
                        Select Experience
                      </MenuItem>
                      {experienceLevels.map((type) => (
                        <MenuItem
                          key={type.value}
                          value={type.value}
                          sx={style.selectItem}
                        >
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {!!errors.experience && (
                  <Typography sx={style.error}>
                    {errors.experience.message}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={style.labelText}>
                Select Area Of Expertise
              </Typography>
              <FormControl
                fullWidth
                error={!!errors.areaOfExpertise}
                sx={[
                  style.formController,
                  {
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        border: errors.areaOfExpertise
                          ? '1px solid red'
                          : '1px solid #8B8B8B',
                        outline: 'none',
                      },
                  },
                ]}
              >
                <Controller
                  name="areaOfExpertise"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputProps={{ MenuProps: { disableScrollLock: true } }}
                      displayEmpty
                      sx={style.select}
                    >
                      <MenuItem value="" disabled sx={style.selectItem}>
                        Select Area
                      </MenuItem>
                      {areaOfExpertises.map((type) => (
                        <MenuItem
                          key={type.value}
                          value={type.value}
                          sx={style.selectItem}
                        >
                          {type.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {!!errors.areaOfExpertise && (
                  <Typography sx={style.error}>
                    {errors.areaOfExpertise.message}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={style.labelText}>Summary</Typography>
              <TextField
                {...register('summary')}
                name="summary"
                id="outlined-multiline-static"
                // label="Summary"
                multiline
                rows={3}
                placeholder="Enter summary"
                sx={style.textField}
              />
            </Box>
          </Box>
          <DetailsHeading title="Upload Resume" />
          <UploadResume
            name="pdf"
            label="Upload Resume"
            required={true}
            setValue={setValue}
            error={errors.resume && errors.resume.message}
            setIsUploading={setUploading}
            uploadedFileName={''}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={style.btn}
          >
            {loading || uploading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={18} style={{ color: 'white' }} />
                <Typography
                  sx={{ fontSize: '0.75rem' }}
                >{`${uploading ? 'Uploading...' : 'Saving...'}`}</Typography>
              </Box>
            ) : (
              `Save`
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateResumeForm;

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '80%',
    mx: 'auto',
    mb: '2rem',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '8px',
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
    fontSize: '12px',
    color: 'red',
    height: '18px',
    margin: 0,
    lineHeight: 'unset',
    '& .MuiFormControl-root .MuiFormHelperText-root': {
      lineHeight: '18px !important',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  formController: {
    borderRadius: '4px',
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root': {
      height: '38px !important',
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },

    '& .MuiFormHelperText-root': {
      lineHeight: '1',
    },
    '& .MuiInputBase-input': {
      padding: '10px 12px',
    },
  },
  select: {
    borderRadius: '4px',
    width: '100%',
    backgroundColor: '#FAFAFA',
    maxHeight: '350px !important',
  },
  btn: {
    width: '100%',
    height: '38px',
    marginTop: '40px',
    borderWidth: '1.5px',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '19.95px',
    // fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    },
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
};
