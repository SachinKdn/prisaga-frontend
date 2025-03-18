import * as Yup from 'yup';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@_%^&*#])[A-Za-z\d!@_%^&*#]{8,}$/;

const passwordValidation = Yup.string()
  .required('This field is required')
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must be at most 32 characters')
  .matches(
    passwordRegex,
    'Enter at least one uppercase letter, one number, and one special symbol from !@_%^&*# only.'
  );

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
  });

export const UserFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name must be at most 50 characters'),

  lastName: Yup.string().optional(),

  email: Yup.string().required('Email is required').email('Invalid email format'),
  phoneNumber: Yup.string()
    .optional()
    .test('phoneNumber-validation', 'Phone Number must be 10 digits', (value) => {
      if (!value) return true;
      return /^[0-9]{10}$/.test(value);
    }),
  username: Yup.string()
    .trim()
    .test('required', 'Username is required', function (value) {
      const { isEdit } = this.options.context || {};
      if (!isEdit && !value) {
        return false;
      }
      return true;
    }),
});

const locationSchema = Yup.object().shape({
  city: Yup.string()
    .required('City is required'),
  state: Yup.string()
    .required('State is required'),
  postalCode: Yup.number()
    .typeError('Postal Code must be a number')
    .required('Postal Code is required')
    .integer('Postal Code must be an integer'),
});

export const CompanySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),

  location: locationSchema,  // Use the separate location schema here

  teamSize: Yup.number()
    .required('TeamSize is required')
    .typeError('TeamSize must be a number')
    .integer('TeamSize must be an integer'),

  linkedin: Yup.string()
    .required('Linkedin is required'),

  website_url: Yup.string()
    .required('Website_url is required')
    .url('Website URL must be valid'),
});


export const ResumeFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name must be at most 50 characters'),
  lastName: Yup.string().optional(),
  location: locationSchema,

  email: Yup.string().required('Email is required').email('Invalid email format'),
  phoneNumber: Yup.string().required('Phone number is required')
    .test('phoneNumber-validation', 'Phone Number must be 10 digits', (value) => {
      if (!value) return true;
      return /^[0-9]{10}$/.test(value);
    }),
    linkedin: Yup.string().required('LinkedIn profile is required'),
    website: Yup.string().optional(),
    resume: Yup.string().required('Resume file is required'),
    experience: Yup.string().required('Experience level is required'),
    areaOfExpertise: Yup.string().required('Area of expertise is required'),
    summary: Yup.string().optional(),
});