'use client';
import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { Input } from '@components/common/Input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormControllerSelector from '@components/common/FormControllerSelector';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import theme from '@app/theme';
import { DetailsHeading } from '@components/DetailsHeading';

const ExperienceForm = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  const isFresher = watch('isFresher');
  const states = getIndianStates();

  const handleStateChange = (index: number) => {
    setValue(`experiences.${index}.location.city`, '');
  };

  const handleAddExperience = () => {
    append({
      employer: '',
      jobProfile: '',
      location: {
        city: '',
        state: '',
      },
      jobPeriod: '',
    });
  };

  return (
    <>
      <DetailsHeading title="Experience Details" />
      <FormControlLabel
        control={
          <Checkbox
            checked={isFresher}
            onChange={(e) => {
              setValue('isFresher', e.target.checked);
              if (e.target.checked) {
                setValue('experiences', []);
              }
            }}
          />
        }
        label="Candidate is a fresher"
        sx={styles.checkboxLabel}
      />
      {!isFresher && (
        <Box sx={styles.experienceWrapper}>
          {fields.map((field, index) => (
            <Box key={field.id} sx={styles.experienceItem}>
              <Box sx={styles.experienceHeader}>
                <Typography sx={styles.experienceTitle}>
                  Experience {index + 1}
                </Typography>
                <IconButton
                  onClick={() => remove(index)}
                  size="small"
                  sx={styles.deleteButton}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={styles.formContainer}>
                <Input
                  wrapperSx={{ flex: 1 }}
                  name={`experiences.${index}.employer`}
                  type="text"
                  required
                  label="Employer"
                  placeholder="Company name"
                  register={register}
                  error={errors.experiences?.[index]?.employer?.message}
                />
                <Input
                  wrapperSx={{ flex: 1 }}
                  name={`experiences.${index}.jobProfile`}
                  type="text"
                  required
                  label="Job Profile"
                  placeholder="Your role"
                  register={register}
                  error={errors.experiences?.[index]?.jobProfile?.message}
                />
                <Input
                  wrapperSx={{ flex: 1 }}
                  name={`experiences.${index}.jobPeriod`}
                  type="text"
                  required
                  label="Job Period"
                  placeholder="e.g. Jan 2022 - Present"
                  register={register}
                  error={errors.experiences?.[index]?.jobPeriod?.message}
                />
              </Box>
              <Box sx={styles.formContainer}>
                <FormControllerSelector
                  name={`experiences.${index}.location.state`}
                  control={control}
                  required
                  labelText="Select state"
                  options={states}
                  errorMessage={
                    errors.experiences?.[index]?.location?.state?.message
                  }
                  placeholder="Select state"
                  onSelect={() => handleStateChange(index)}
                />
                <FormControllerSelector
                  name={`experiences.${index}.location.city`}
                  control={control}
                  required
                  labelText="Select city"
                  options={getCitiesByState(
                    watch(`experiences.${index}.location.state`)
                  )}
                  errorMessage={
                    errors.experiences?.[index]?.location?.city?.message
                  }
                  placeholder="Select city"
                />
              </Box>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddExperience}
            sx={styles.addButton}
          >
            Add Experience
          </Button>
        </Box>
      )}
    </>
  );
};

export default ExperienceForm;

const styles = {
  experienceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  experienceItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experienceTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: theme.palette.text.primary,
  },
  deleteButton: {
    color: theme.palette.error.main,
    padding: '4px',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    width: '100%',
  },
  addButton: {
    alignSelf: 'flex-start',
    color: theme.palette.primary.main,
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
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
