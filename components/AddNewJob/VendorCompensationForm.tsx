import theme from '@app/theme';
import { Input } from '@components/common/Input';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { vendorDataSchema } from '@utils/yup';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  formData: Partial<IJob> | null;
  setFormData: (data: Partial<IJob>) => void;
  setActiveSectionIndex: (index: number) => void;
}
const VendorCompensationForm = (props: Props) => {
  const { formData, setFormData, setActiveSectionIndex } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IVendorData>({
    resolver: yupResolver(vendorDataSchema),
    defaultValues: formData?.vendorData || {},
  });
  useEffect(() => {
    if (watch('basicFeePercentage')) {
      const salary = formData?.salaryTo || 0;
      const vendorPercentage = formData?.vendorData?.basicFeePercentage || 0;
      setValue('basicBillingAmount', (salary * vendorPercentage) / 100);
    }
    if (watch('premiumFeePercentage')) {
      const salary = formData?.salaryTo || 0;
      const vendorPercentage = formData?.vendorData?.premiumFeePercentage || 0;
      setValue('premiumBillingAmount', (salary * vendorPercentage) / 100);
    }
  }, [watch('basicFeePercentage'), watch('premiumFeePercentage')]);

  const onSubmit: SubmitHandler<IVendorData> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, vendorData: data };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(4);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.wrapper}>
        <Input
          wrapperSx={{ flex: 1 }}
          name="basicFeePercentage"
          type="number"
          endAdornment="%"
          label="Basic Subscription"
          placeholder="7 %"
          register={register}
          error={errors.basicFeePercentage?.message}
        />
        <Input
          wrapperSx={{ flex: 1 }}
          name="premiumFeePercentage"
          type="number"
          endAdornment="%"
          label="Premium Subscription"
          placeholder="10 %"
          register={register}
          error={errors.premiumFeePercentage?.message}
        />
        <Box sx={styles.buttonsWrapper}>
          <Button
            onClick={() => setActiveSectionIndex(2)}
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

export default VendorCompensationForm;

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
  labelText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    marginBottom: '4px',
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
