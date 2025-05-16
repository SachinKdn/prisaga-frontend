import * as Yup from 'yup';
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@_%^&*#])[A-Za-z\d!@_%^&*#]{8,}$/;

export const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

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

export const AgencySignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is a required field'),
  phoneNumber: Yup.string().required('Phone number is required'),
  agencyName: Yup.string().required('Agency name is required'),
  userBusinessType: Yup.string().required('Agency name is required'),
});

export const UserFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),

  lastName: Yup.string().optional(),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone is required')
    .test(
      'phoneNumber-validation',
      'Phone Number must be 10 digits',
      (value) => {
        if (!value) return true;
        return /^[0-9]{10}$/.test(value);
      }
    ),
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
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
});

export const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),

  location: locationSchema, // Use the separate location schema here

  teamSize: Yup.number()
    .required('TeamSize is required')
    .typeError('TeamSize must be a number')
    .integer('TeamSize must be an integer'),

  linkedin: Yup.string().optional(),

  website_url: Yup.string()
    .optional()
    .url('Website URL must be valid i.e. https://www.xyz.com'),
});

export const ResumeFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),
  lastName: Yup.string().optional(),
  location: locationSchema,

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .test(
      'phoneNumber-validation',
      'Phone Number must be 10 digits',
      (value) => {
        if (!value) return true;
        return /^[0-9]{10}$/.test(value);
      }
    ),
  linkedin: Yup.string().optional(),
  website: Yup.string().optional(),
  resume: Yup.string().required('Resume file is required'),
  experience: Yup.string().required('Experience level is required'),
  areaOfExpertise: Yup.string().required('Area of expertise is required'),
  summary: Yup.string().optional(),
});

export const QuestionnaireFormSchema = Yup.object().shape({
  questionnaire: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required('Question is required'),
      })
    )
    .min(1, 'At least one question is required'),
});
export const vendorDataSchema = Yup.object().shape({
  basicFeePercentage: Yup.number()
    .typeError('Basic subscription fee percentage must be a valid number')
    .required('Basic subscription fee percentage is required'),
  premiumFeePercentage: Yup.number()
    .typeError('Premium subscription fee percentage must be a valid number')
    .required('Premium subscription fee percentage is required'),
  basicBillingAmount: Yup.number()
    .typeError('Basic Billing Amount must be a valid number')
    .required('Basic Billing Amount is required'),
  premiumBillingAmount: Yup.number()
    .typeError('Premium Billing Amount must be a valid number')
    .required('Premium Billing Amount is required'),
});

export const jobBasicSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  location: locationSchema,
  noOfOpenings: Yup.number()
    .typeError('No. of openings must be a valid number')
    .required('No. of openings is required')
    .min(1, 'No. of openings must be at least 1'),
  areaOfExpertise: Yup.string().required('Area of expertise is required'),
  jobType: Yup.string().required('Job type is required'),
  jobInsights: Yup.array()
    .of(Yup.string().required('Job insight cannot be empty'))
    .min(3, 'Add at least three job insights'),
});

export const jobDescriptionSchema = Yup.object().shape({
  minQualification: Yup.string().required('Min. Qualification is required'),
  description: Yup.string().required('Job description is required'),
  experienceFrom: Yup.number()
    .typeError('Min. Experience must be a valid number')
    .required('Min. Experience is required'),
  experienceTo: Yup.number()
    .typeError('Max. Experience must be a valid number')
    .required('Max. Experience is required'),
  salaryFrom: Yup.number()
    .typeError('Min. Salary must be a valid number')
    .required('Min. Salary is required'),
  salaryTo: Yup.number()
    .typeError('Max. Salarye must be a valid number')
    .required('Max. Salary is required'),
  skills: Yup.array()
    .of(Yup.string().required('Skill cannot be empty'))
    .min(3, 'Add at least three skills'),
});

export const CreateJobSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  company: CompanySchema,
  location: locationSchema,
  noOfOpenings: Yup.number()
    .typeError('No. of openings must be a valid number')
    .required('No. of openings is required')
    .min(1, 'No. of openings must be at least 1'),
  areaOfExpertise: Yup.string().required('Area of expertise is required'),
  jobType: Yup.string().required('Job type is required'),
  description: Yup.string().required('Job description is required'),
  experienceFrom: Yup.string().required('Min. Experience is required'),
  experienceTo: Yup.string().required('Max. Experience is required'),
  salaryFrom: Yup.number()
    .typeError('Min. Salary must be a valid number')
    .required('Min. Salary is required'),
  salaryTo: Yup.number()
    .typeError('Max. Salary must be a valid number')
    .required('Max. Salary is required'),
  vendorData: vendorDataSchema,
});

export const AddCandidateFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Candidate name is required')
    .min(2, 'Candidate name must be at least 2 characters')
    .max(50, 'Candidate name must be at most 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .test(
      'phoneNumber-validation',
      'Phone Number must be 10 digits',
      (value) => {
        if (!value) return true;
        return /^[0-9]{10}$/.test(value);
      }
    ),
  resume: Yup.string().test('required', 'Resume is required', function (value) {
    const { isResumeRequired } = this.options.context || {};
    console.log('isResumeRequired', isResumeRequired, value);
    if (isResumeRequired && !value) {
      return false;
    }
    return true;
  }),
});

export const experienceSchema = Yup.object().shape({
  employer: Yup.string().required('Employer name is required'),
  jobProfile: Yup.string().required('Job profile is required'),
  location: locationSchema,
  jobPeriod: Yup.string().required('Job period is required'),
});

export const ApplicationFormSchema = Yup.object().shape({
  job: Yup.string().required('Job is required'),
  resume: Yup.string().required('Resume is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string(),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .test(
      'phoneNumber-validation',
      'Phone Number must be 10 digits',
      (value) => {
        if (!value) return true;
        return /^[0-9]{10}$/.test(value);
      }
    ),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  linkedin: Yup.string().optional(),
  website: Yup.string().optional(),
  location: locationSchema,
  dob: Yup.string().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  areaOfExpertise: Yup.string().required('Area of expertise is required'),
  summary: Yup.string(),
  qualifications: Yup.string().required('Qualifications is required'),
  skills: Yup.array()
    .of(Yup.string().required('Skill cannot be empty'))
    .min(3, 'Add at least three skills'),
  isFresher: Yup.boolean().required('Please specify if candidate is fresher'),
  experiences: Yup.array().when('isFresher', {
    is: false,
    then: () =>
      Yup.array()
        .of(experienceSchema)
        .min(1, 'Please add at least one experience'),
    otherwise: () => Yup.array().optional(),
  }),
  currentSalary: Yup.object().when('isFresher', {
    is: false,
    then: () =>
      Yup.object().shape({
        amount: Yup.number()
          .typeError('Current salary must be a number')
          .required('Current salary amount is required'),
        currency: Yup.string().required('Currency is required'),
        tenure: Yup.string().required('Salary tenure is required'),
      }),
    otherwise: () =>
      Yup.object().shape({
        // Provide empty schemas for the fields to maintain type safety
        amount: Yup.number().transform((value, originalValue) => {
          // Transform empty string to undefined
          return originalValue === '' ? undefined : value;
        }),
        // amount: Yup.number().optional().nullable(),
        currency: Yup.string().optional().nullable(),
        tenure: Yup.string().optional().nullable(),
      }),
  }),
  expectedSalary: Yup.object().shape({
    amount: Yup.number()
      .typeError('Expected salary must be a number')
      .required('Expected salary amount is required'),
    currency: Yup.string().required('Currency is required'),
    tenure: Yup.string().required('Salary tenure is required'),
  }),
  noticePeriod: Yup.string().when('isFresher', {
    is: false,
    then: () => Yup.string().required('Skill cannot be empty'),
    otherwise: () => Yup.string().optional(),
  }),
  diversityParameters: Yup.array().of(
    Yup.string().required('Skill cannot be empty')
  ),
  diversityComments: Yup.string().optional(),
  isActive: Yup.boolean().required(
    'Please specify if candidate is currently looking for job.'
  ),
  experience: Yup.string().required('Experience Level is required'),
});

export const AgencyDetailsSchema = Yup.object().shape({
  agencyName: Yup.string().required('Agency name is required'),
  location: Yup.object().shape({
    area: Yup.string(),
    postalCode: Yup.number().typeError('Postal code must be a number'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  }),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .test(
      'phoneNumber-validation',
      'Phone Number must be 10 digits',
      (value) => {
        if (!value) return true;
        return /^[0-9]{10}$/.test(value);
      }
    ),
  website_url: Yup.string()
    .url('Website URL must be valid i.e. https://www.xyz.com')
    .required('Website URL is required'),
  teamSize: Yup.number()
    .required('Team size is required')
    .typeError('Team size must be a number')
    .min(1, 'Team size must be at least 1'),
  isBulkHiring: Yup.boolean().required('Bulk hiring status is required'),
  linkedin: Yup.string()
    .url('LinkedIn URL must be valid i.e. https://www.xyz.com')
    .required('LinkedIn URL is required'),
  targetJobLevel: Yup.array()
    .of(Yup.string().required('Target job level cannot be empty'))
    .min(1, 'Select at least one target job level'),
  areaOfExpertise: Yup.array()
    .of(Yup.string().required('Area of expertise cannot be empty'))
    .min(1, 'Select at least one area of expertise'),
});

export const QuestionnaireAnswerFormSchema = Yup.object().shape({
  questionnaire: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required('Question is required'),
        answer: Yup.string().required('Answer is required'),
      })
    )
    .min(1, 'At least one question is required'),
});
