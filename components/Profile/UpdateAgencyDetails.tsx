'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import theme from '@/app/theme';
import { Input } from '@/components/common/Input';
import { CustomButton } from '@/components/common/Button';
import { AgencyDetailsSchema } from '@utils/yup';
import FormControllerSelector from '../common/FormControllerSelector';
import { areaOfExpertises, experienceLevels } from '@constant/resume-data';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { updateAgency } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { MultilineTextField } from '@components/common/MultilineTextField';
import UploadAgencyLogo from './UploadAgencyLogo';

const UpdateAgencyDetails = ({ agency }: { agency: IAgencyDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState<string>(
    agency?.location?.state || ''
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IAgencyDetails>({
    resolver: yupResolver(AgencyDetailsSchema),
    defaultValues: {
      ...agency,
      isBulkHiring: agency?.isBulkHiring || false,
      isChargeToCandidate: agency?.isChargeToCandidate || false,
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
      setValue('location.city', agency?.location?.city || '');
    }
  }, [selectedState, setValue, agency]);

  const onSubmit = async (formData: IAgencyDetails) => {
    setIsLoading(true);
    try {
      const result = await updateAgency(agency._id!, formData);
      if (result) {
        handleSuccess('Agency details updated successfully');
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error updating agency:', error);
    }
    setIsLoading(false);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.formWrapper}>
        <Typography sx={styles.heading}>Update Agency Details</Typography>
        <UploadAgencyLogo defaultSrc={agency.logo} agencyId={agency._id!} />
        <form
          style={{ width: '100%', marginTop: '2rem' }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <MultilineTextField
              name="description"
              label="Job description"
              placeholder="Enter Agency Description"
              rows={3}
              register={register}
              error={errors.description?.message}
            />
          </Box>

          <Box sx={styles.formContainer}>
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

            <Box sx={styles.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('isChargeToCandidate')}
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
                    Charge to Candidate?
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
              defaultValue={agency?.areaOfExpertise || []}
            />

            <FormControllerSelector<IAgencyDetails>
              name="targetJobLevel"
              control={control}
              required
              labelText="Target Job Levels"
              options={experienceLevels}
              errorMessage={errors.targetJobLevel?.message}
              multiple
              defaultValue={agency?.targetJobLevel || []}
            />
          </Box>
          <Box sx={styles.buttonWrapper}>
            <Button
              onClick={() => {
                router.push('/profile');
              }}
              color="secondary"
              variant="outlined"
              sx={styles.cancel}
            >
              Cancel
            </Button>
            <CustomButton
              type="submit"
              variant="contained"
              style={styles.submitButton}
              disabled={isLoading}
              loading={isLoading}
              btnText="Update"
            />
          </Box>
        </form>
      </Box>
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
    width: '100%',
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
    width: '90px',
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
  cancel: {
    width: '90px',
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
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
};

export default UpdateAgencyDetails;
