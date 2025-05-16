interface UserLogin {
  email: string;
  password: string;
}

interface Option {
  value: string;
  label: string;
  image?: ReactElement<SVGSVGElement>;
}
interface IResponse<T = any> {
  success: boolean;
  message?: string;
  status?: number;
  data: T;
}

interface ITableResponse<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  data: T;
}

interface UploadResponse {
  resume: { fileUrl: string; _id: string; fileName: string; fileType: string };
}

interface BaseSchema {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
interface User extends BaseSchema {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  username?: string;
  image?: string;
  location?: ILocation;
  role: UserRole;
  linkedin?: string;
  createdBy?: string;
  isDeleted: boolean;
  isApproved?: boolean;
  agency?: Agency;
}
interface Agency {
  _id: string;
  agencyName: string;
  location: ILocation;
  phoneNumber: string;
  website_url: string;
  logo?: string;
  description: string;
  subscriptionType: SubscriptionType;
  createdAt: string;
  updatedAt: string;
  teamSize: number;
  isBulkHiring: boolean;
  linkedin: string;
  areaOfExpertise?: string[];
  targetJobLevel?: string[];
  isChargeToCandidate?: boolean;

  createdBy: User;
  activeUsers: number;
  totalRequest: number;
  spentRequest: number;
  maxUserCounts: number;
  allocatedJobIds: string[];
  deallocatedJobIds: string[];
  engagedJobIds: string[];
}
interface UserInput {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  username?: string;
}
interface INewPassword {
  password: string;
  confirmPassword: string;
}
interface ILocation {
  area?: string;
  postalCode?: number;
  city: string;
  state: string;
}
interface LoginUserResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
interface Column<T = any> {
  field: keyof T | 'actions' | 'goto';
  label: string;
  render?: (row: T) => React.ReactNode;
}
interface TableUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  username: string;
  image?: string;
  location?: ILocation;
  password: string;
  role: UserRole;
  linkedin?: string;
  createdBy?: string;
  isDeleted: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface AgencyDetails {
  members: User[];
  agency: Agency;
}

interface Company {
  _id?: string;
  name: string;
  location: ILocation;
  logo?: string;
  teamSize: number;
  linkedin?: string;
  website_url?: string;
  createdBy?: string;
  createdAt?: string;
}

interface Resume {
  firstName: string;
  lastName?: string;
  location: ILocation;
  email: string;
  phoneNumber: string;
  linkedin?: string;
  website?: string;
  resume: string;
  experience: string;
  areaOfExpertise: string;
  summary?: string;
}

interface UploadedResume {
  firstName: string;
  lastName?: string;
  location: ILocation;
  email: string;
  phoneNumber: string;
  linkedin: string;
  website?: string;
  resume: UploadedFile;
  experience: string;
  areaOfExpertise: string;
  summary?: string;
}

interface UploadedFile {
  fileName: string;
  fileUrl: string;
  _id: string;
}

interface Questionnaire {
  question: string;
}
interface IQuestionnaireForm {
  questionnaire?: Questionnaire[];
}
interface QuestionnaireWithAnswer {
  question: string;
  answer: string;
}
interface IQuestionnaireAnswerForm {
  questionnaire?: QuestionnaireWithAnswer[];
}
interface IVendorData {
  basicFeePercentage: number;
  premiumFeePercentage: number;
  basicBillingAmount: number;
  premiumBillingAmount: number;
}

interface IJobBasic {
  title: string;
  location: ILocation;
  noOfOpenings: number;
  areaOfExpertise: string;
  jobType: string;
  jobInsights?: string[];
}
interface IJobDescription {
  minQualification: string;
  skills?: string[];
  description: string;
  experienceFrom: number;
  experienceTo: number;
  salaryFrom: number;
  salaryTo: number;
}
interface IJob {
  _id: string;
  title: string;
  company: Company;
  location: ILocation;
  noOfOpenings: number;
  areaOfExpertise: string;
  jobType: string;
  minQualification: string;
  description: string;
  experienceFrom: number;
  experienceTo: number;
  salaryFrom: number;
  salaryTo: number;
  skills?: string[];
  jobInsights?: string[];
  vendorData: IVendorData;
  questionnaire: Questionnaire[];
  createdAt: string;
  referenceId: string;
  createdBy: User;
  status: string;
}

interface IAddCandidate {
  firstName: string;
  phoneNumber: string;
  email: string;
  resume?: string;
}
interface CheckCandidateResumeResponse {
  applications: IApplication[];
  isAlreadyApplied: boolean;
}

interface IExperience {
  employer: string;
  jobProfile: string;
  location: ILocation;
  jobPeriod: string;
}
interface ISalary {
  amount: number;
  currency: string;
  tenure: string;
}

interface IApplicationForm {
  job: string;
  resume: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  linkedin?: string;
  website?: string;
  location: ILocation;
  dob: string;
  gender: string;
  areaOfExpertise: string;
  summary?: string;
  qualifications: string;
  skills?: string[];
  currentSalary: ISalary | Record<string | number, never>;
  expectedSalary: ISalary;
  noticePeriod?: string;
  isFresher: boolean;
  isActive: boolean;
  experiences?: IExperience[];
  diversityParameters?: string[];
  diversityComments?: string;
  questionnaire?: QuestionnaireWithAnswer[];
  experience: string;
}

interface IApplication {
  _id?: string;
  firstName: string;
  lastName: string;
  summary: string;
  areaOfExpertise: string;
  email: string;
  phoneNumber: string;
  location: Location;
  createdBy: mongoose.Types.ObjectId;
  isCreatedByAdmin: boolean;
  createdByAgency: mongoose.Types.ObjectId;
  image: string;
  linkedin: string;
  job: mongoose.Types.ObjectId;
  resume: UploadedFile;
  status: JobApplicationStatus;
  skills: string[];
  experience: string;
}
interface SubscriptionData {
  subscriptionType: string;
}

interface AgencySignup {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber: string;
  agencyName: string;
  userBusinessType: string;
}
interface IAgencyDetails {
  _id?: string;
  logo?: string;
  agencyName: string;
  location: ILocation;
  phoneNumber: string;
  website_url: string;
  teamSize: number;
  isBulkHiring: boolean;
  linkedin: string;
  description?: string;
  areaOfExpertise?: string[];
  targetJobLevel?: string[];
  isChargeToCandidate?: boolean;
}

interface SubscriptionFormData {
  subscriptionType: SubscriptionType;
}

interface SubscriptionPopup {
  heading: string;
  subheading: string;
  accessPoints: string[];
}
