interface UserLogin {
  email: string;
  password: string;
}

interface Option {
  value: string;
  label: string;
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
  activeUsers: number;
  spentRequest: number;
  location: ILocation;
  createdBy: User;
  phoneNumber: string;
  website_url: string;
  logo: string;
  description: string;
  subscriptionType: SubscriptionType;
  createdAt: string;
  updatedAt: string;
}
interface UserInput {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  username?: string;
}
interface ILocation {
  area?: string;
  postalCode: number;
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
  logo?: string;
  location: ILocation;
  teamSize: number;
  linkedin: string;
  website_url: string;
  createdBy?: string;
}

interface Resume {
  firstName: string;
  lastName?: string;
  location: ILocation;
  email: string;
  phoneNumber: string;
  linkedin: string;
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
}
