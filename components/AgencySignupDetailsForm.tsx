'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import theme from '@/app/theme';
import { Input } from '@/components/common/Input';
import { CustomButton } from '@/components/common/Button';
import { AgencyDetailsSchema } from '@utils/yup';
import FormControllerSelector from './common/FormControllerSelector';
import { areaOfExpertises, experienceLevels } from '@constant/resume-data';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { createAgency } from '@api/client';
import ThankYouPage from './AgencyRegistration/ThankYouPage';

const AgencySignupDetailsForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [isAgencyCreated, setIsAgencyCreated] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IAgencyDetails>({
    resolver: yupResolver(AgencyDetailsSchema),
    defaultValues: {
      isBulkHiring: false,
    },
  });

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

  const onSubmit = async (formData: IAgencyDetails) => {
    setIsLoading(true);
    console.log(formData);
    const result = await createAgency(userId, formData);
    if (result) {
      setIsAgencyCreated(true);
    }
    setIsLoading(false);
  };

  return (
    <Box sx={styles.wrapper}>
      {!isAgencyCreated ? (
        <Box sx={styles.formWrapper}>
          <Typography sx={styles.heading}>Agency Details</Typography>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.formContainer}>
              <Input
                label="Agency Name"
                required
                placeholder="Enter Agency Name"
                name="agencyName"
                register={register}
                error={errors.agencyName?.message}
              />

              <Input
                label="Phone Number"
                required
                type="phone"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber?.message}
              />
            </Box>

            <Box sx={styles.formContainer}>
              <Input
                label="Website URL"
                required
                placeholder="Enter Website URL"
                name="website_url"
                register={register}
                error={errors.website_url?.message}
              />

              <Input
                label="LinkedIn URL"
                required
                placeholder="Enter LinkedIn URL"
                name="linkedin"
                register={register}
                error={errors.linkedin?.message}
              />
            </Box>

            <Box sx={styles.formContainer}>
              <Input
                label="Team Size"
                required
                type="number"
                placeholder="Enter Team Size"
                name="teamSize"
                register={register}
                error={errors.teamSize?.message}
              />

              <Box sx={styles.checkboxContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('isBulkHiring')}
                      disableRipple
                      sx={{
                        color: theme.palette.primary.main,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Do you do bulk hiring?
                    </Typography>
                  }
                  sx={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginY: '0.5rem',
                    marginTop: '23px',
                    '& .MuiCheckbox-root': {
                      padding: 0,
                      marginRight: '0.5rem',
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={styles.locationContainer}>
              <Input
                label="Area"
                placeholder="Enter Area"
                name="location.area"
                register={register}
                error={errors.location?.area?.message}
              />

              <Input
                label="Postal Code"
                placeholder="Enter Postal Code"
                name="location.postalCode"
                register={register}
                error={errors.location?.postalCode?.message}
              />

              <FormControllerSelector<IAgencyDetails>
                name="location.state"
                control={control}
                labelText="Select state"
                options={states}
                errorMessage={errors.location?.state?.message}
                placeholder="Select state"
                onSelect={setSelectedState}
              />

              <FormControllerSelector<IAgencyDetails>
                name="location.city"
                control={control}
                labelText="Select city"
                options={cities}
                errorMessage={errors.location?.city?.message}
                placeholder="Select city"
              />
            </Box>

            <Box sx={styles.formContainer}>
              <FormControllerSelector<IAgencyDetails>
                name="areaOfExpertise"
                control={control}
                required
                labelText="Areas of Expertise"
                options={areaOfExpertises}
                errorMessage={errors.areaOfExpertise?.message}
                multiple
                defaultValue={[]}
              />

              <FormControllerSelector<IAgencyDetails>
                name="targetJobLevel"
                control={control}
                required
                labelText="Target Job Levels"
                options={experienceLevels}
                errorMessage={errors.targetJobLevel?.message}
                multiple
                defaultValue={[]}
              />
            </Box>

            <CustomButton
              type="submit"
              variant="contained"
              style={styles.submitButton}
              disabled={isLoading}
              loading={isLoading}
              btnText="Submit"
            />
          </form>
        </Box>
      ) : (
        <ThankYouPage />
      )}
    </Box>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem ',
  },
  formWrapper: {
    width: '80%',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: '2rem',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  locationContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: '2rem',
    width: '100%',
    height: '48px',
    fontSize: '1rem',
    fontWeight: 500,
  },
};

export default AgencySignupDetailsForm;
