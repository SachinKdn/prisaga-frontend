'use client';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import handleError from '@hooks/handleError';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CompanySchema } from '@utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './common/Input';
import theme from '@app/theme';
import FormControllerSelector from './common/FormControllerSelector';
import { getCitiesByState, getIndianStates } from '@services/loadOptions';
import { createCompany } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { useRouter } from 'next/navigation';

// interface Props {
//   data?: Company;
//   isEdit?: boolean;
// }
const CompanyForm = () => {
  const router = useRouter();
  const {
    register,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Company>({
    resolver: yupResolver(CompanySchema),
  });

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
  // disable-no-any
  // const [selectedCompany, setSelectedCompany] = useState<any>();
  // const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  // const [imagePreview, setImagePreview] = useState<string | undefined>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setLoading(true);
      if (event.target.files && event.target.files[0]) {
        // setIsLoadingProfile(true);
        setUploading(true);
        const file = event.target.files[0];
        // const imageUrl = URL.createObjectURL(file);
        // setImagePreview(imageUrl);
        const payload = { file };
        console.log(payload);
        // if (user) user.setProfileImage({ file });
        // const result = await uploadFile(payload);
        // if (result && result.data) {
        // handleSuccess('Profile Picture Updated Successfully');
        // setValue('profile.image', result.data?.file);
        // setUser({ ...contextUser, image: result.data?.file });
        // setUserInStore({ ...userInStore, image: result.data?.file });
        // }
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      handleError(error);
    } finally {
      // setIsLoadingProfile(false);
      setLoading(false);
    }
  };

  // const handleChangePicture = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };
  // const handleDeletePicture = () => {
  //   setImagePreview(undefined);
  //   setValue('logo', '');
  // };
  const onSubmit: SubmitHandler<Company> = async (data) => {
    console.log('submitted---', data);
    setLoading(true);
    const result = await createCompany(data);
    console.log(result);
    if (result) {
      handleSuccess('Company created successfully');
      router.push('/company');
    }
    setLoading(false);
  };
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h2" sx={styles.heading}>
        Let&apos;s Get Started: Add New Company Details
      </Typography>
      {/* <Box sx={styles.uploadWrapper}>
        <Box sx={styles.imgWrapper}>
          {isLoadingProfile && (
            <div className="inset-0 flex items-center justify-center bg-gray-100 absolute">
              <Oval
                ariaLabel="loading"
                height={30}
                width={30}
                color="#000"
                secondaryColor="#ccc"
                strokeWidth={5}
              />
            </div>
          )}
          <Image
            src={imagePreview || defaultPic}
            alt="Header Img"
            priority={true}
            width={75}
            height={75}
            className="object-cover w-full h-full"
          />
        </Box>
        <div className="flex flex-col gap-[0.35rem]">
          <CustomButton
            style={styles.uploadBtn}
            btnText={`${false ? 'Change Photo' : 'Upload Photo'}`}
            className="!p-0 !text-[#5B617A] !justify-start !items-center font-semibold text-[0.7rem] xl:text-[0.75rem] text-start h-[26px] xl:h-[34px] max-w-[167px] bg-transparent"
            onClick={handleChangePicture}
          >
            {true && <Pencil color="#5B617A" strokeWidth={3} height={18} />}
          </CustomButton>
          {getValues('logo') && (
            <CustomButton
              btnText="Delete"
              loading={isLoading}
              className="!p-0  !justify-start text-[0.65rem] !text-[#FF0000] min-h-[15px] text-start max-w-[167px] bg-white"
              onClick={handleDeletePicture}
            >
              <Trash2 color="#FF0000" strokeWidth={1.75} height={20} />
            </CustomButton>
          )}
        </div>
      </Box> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.formContainer}>
          <Input
            name="name"
            type="text"
            label="Company name"
            placeholder="Enter company name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            name="teamSize"
            type="number"
            label="Team Size"
            placeholder="10"
            register={register}
            error={errors.teamSize?.message}
          />
          <Input
            name="website_url"
            type="text"
            label="Website"
            placeholder="Comapany Website URL"
            register={register}
            error={errors.website_url?.message}
          />
          <Input
            name="linkedin"
            type="text"
            label="Linkedin URL"
            placeholder="Linkedin Profile URL"
            register={register}
            error={errors.linkedin?.message}
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
          <FormControllerSelector<Company>
            name="location.state"
            control={control}
            labelText="Select state"
            options={states}
            errorMessage={errors.location?.state?.message}
            placeholder="Select state"
            onSelect={setSelectedState}
          />
          <FormControllerSelector<Company>
            name="location.city"
            control={control}
            labelText="Select city"
            options={cities}
            errorMessage={errors.location?.city?.message}
            placeholder="Select city"
          />
        </Box>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={styles.btn}
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
      </form>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default CompanyForm;

const styles = {
  wrapper: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    color: theme.palette.primary.main,
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  uploadWrapper: {
    display: 'flex',
    gap: '6rem',
    alignItems: 'center',
  },
  imgWrapper: {
    height: '80px',
    width: '80px',
    position: 'relative',
  },
  uploadBtn: {
    padding: 0,
    color: '#5B617A',
    fontWeight: '600',
    justifyContent: 'start !important',
    alignItems: 'center !important',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '8px',
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
};
