import SingleSearchSelect from '@components/common/SingleSearchSelect';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { getCompanies } from '@api/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompanySchema } from '@utils/yup';
import theme from '@app/theme';

interface Props {
  formData: Partial<IJob> | null;
  setFormData: (data: Partial<IJob>) => void;
  setActiveSectionIndex: (index: number) => void;
}
const SelectCompanyForm = (props: Props) => {
  const { formData, setFormData, setActiveSectionIndex } = props;
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Company>({
    resolver: yupResolver(CompanySchema),
    defaultValues: formData?.company || {},
  });
  const [companiesOption, setCompaniesOption] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await getCompanies();
      if (companies) {
        setCompanies(companies.data);
        const data: Option[] = companies.data.map((company) => ({
          value: company._id || '',
          label: company.name,
        }));
        setCompaniesOption(data);
      }
      return;
    };
    fetchCompanies();
    if (formData?.company && formData.company._id) {
      setSelectedCompany({
        label: formData.company.name,
        value: formData.company._id,
      });
    }
  }, []);

  const onSelect = (value: string | null) => {
    const selectedCompany = companies.find((company) => company._id === value);
    console.log('selectedCompany-', selectedCompany);
    if (selectedCompany) {
      reset(selectedCompany);
      console.log('Selected Company--', selectedCompany);
    }
  };
  const onSubmit: SubmitHandler<Company> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, company: data };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.wrapper}>
        <SingleSearchSelect
          options={companiesOption}
          onSelect={onSelect}
          setValue={setSelectedCompany}
          value={selectedCompany}
          label="Select Company*"
          wrapperSx={styles.formWrapper}
          error={errors.name?.message}
        />
        <Typography sx={styles.or}>or</Typography>
        <Button
          variant="text"
          onClick={() => router.push('/company/new')}
          sx={styles.createButton}
          startIcon={<AddIcon fontSize="small" />}
        >
          Create New Company
        </Button>

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
  );
};

export default SelectCompanyForm;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    height: '100%',
    width: '420px',
    margin: 'auto',
  },
  formWrapper: {
    width: '100%',
  },
  or: {
    fontWeight: 600,
    fontSize: '0.75rem',
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
};
