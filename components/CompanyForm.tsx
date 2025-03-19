'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import defaultPic from '@assets/png/profile-pic.png';
import { CustomButton } from './common/Button';
import handleError from '@hooks/handleError';
import { Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CompanySchema } from '@utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './common/Input';
import DynamicAutocomplete from './common/InputSelector';
import { getUsersList } from '@api/user';

interface Props {
  data?: Company;
  isEdit?: boolean;
}
const CompanyForm = (props: Props) => {
  const {} = props;
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<Company>({
    resolver: yupResolver(CompanySchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // disable-no-any
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setIsLoading(true);
      if (event.target.files && event.target.files[0]) {
        setIsLoadingProfile(true);
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
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
      setIsLoadingProfile(false);
      setIsLoading(false);
    }
  };

  const handleChangePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDeletePicture = () => {
    setImagePreview(undefined);
    setValue('logo', '');
  };
  const fetchCompanies = async (i: string) => {
    const result = await getUsersList();
    console.log('result-->', i, result);
    return [
      {
        id: 123,
        label: 'sachin',
      },
    ];
  };
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.uploadWrapper}>
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
              {/* <Trash color="#FF0000" strokeWidth={1.75} height={20} /> */}
            </CustomButton>
          )}
        </div>
      </Box>
      <Box>
        <form>
          <Input
            name="name"
            type="text"
            label="First Name"
            placeholder="First Name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            name="location.city"
            type="text"
            label="City"
            placeholder="City"
            register={register}
            error={errors.location?.city?.message}
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
          <DynamicAutocomplete
            label="Company"
            value={selectedCompany}
            onChange={(newValue) => setSelectedCompany(newValue)}
            loadOptions={fetchCompanies}
            isRequired
            error={!!errors.name}
            // helperText={errors.name }
            // renderOption={renderCompanyOption}
          />
        </form>
      </Box>
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
};
