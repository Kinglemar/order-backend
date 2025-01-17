import { Model, Document, Query, Schema } from "mongoose";

export interface User extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  role: "user";
  geolocation: any;
  doneKyc: boolean;
  createdAt: string;
  updatedAt: string;
  isEmailTaken(email: string, _id?: string): Promise<boolean>;
}
export interface TestUser extends Document {
  customerId: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface IOrders extends Document {
  customerId: Schema.Types.ObjectId | null;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Courier extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  role: "courier";
  geolocation: any;
  vehicle: Schema.Types.ObjectId | null;
  organization: Schema.Types.ObjectId | null;
  is_available: boolean;
  is_operational: boolean;
  doneKyc: boolean;
  createdAt: string;
  rating: number;
  updatedAt: string;
  isEmailTaken(email: string, _id?: string): Promise<boolean>;
}

export interface Vehicle extends Document {
  geolocation: any;
  brand: string;
  plate_no: string;
  type: string;
  color: string;
  organization: Schema.Types.ObjectId | null;
  courier: Schema.Types.ObjectId | null;
  createdAt: string;
  updatedAt: string;
}

export interface Parcel extends Document {
  parcelCode: string;
  resolvedAmount: string;
  user: Schema.Types.ObjectId;
  userEmail: string;
  phoneNumber: string;
  reciever: string;
  imagePath: ImagePath;
  imageUpload: EventImage | undefined;
  description: string;
  status: string;
  pickupPoint: any;
  geolocation: any;
  destination: any;
  courier: Schema.Types.ObjectId | null;
  delivered: boolean;
  paidOrder: boolean;
  recievedQuote: boolean;
}

export type Price = {
  name: string;
  value: number;
};

export interface Conversation extends Document {
  user_id: Schema.Types.ObjectId;
  courier_id?: Schema.Types.ObjectId | null;
  parcel_id: Schema.Types.ObjectId;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface VehicleDocs extends Document {
  plate_no: string;
  vehicle_id: Schema.Types.ObjectId;
  courier_id: Schema.Types.ObjectId;
  vehiclePapers: ImagePath[];
  vehiclePapersUpload: EventImage[] | undefined;
  vehicleProfile: ImagePath[];
  vehicleProfileUpload: EventImage[] | undefined;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventImage {
  imageSourceBase64Url: string;
  name: string;
}

export interface ImagePath {
  imagePath: string;
  public_id: string;
  created_at: string;
}

export interface Waitlist extends Document {
  email: string;
  user: Schema.Types.ObjectId;
}

export interface ObjStructure {
  [key: string]: any;
}

export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  page: number;
  limit: number;
}
export interface DocCount<T> {
  totalResults: number;
}
export interface PaginationOptions {
  page?: number;
  limit?: number;
}
export type PaginateModel<T extends Document> = Model<T> & {
  paginate(
    query: Query<Array<T>, T>,
    options: PaginationOptions
  ): Promise<PaginationResult<T>>;
  isEmailTaken(email: string, _id?: string): Promise<boolean>;
  countDocs(query: Query<Array<T>, T>): Promise<DocCount<T>>;
};
export type Paginate<T extends Document> = Model<T> & {
  paginate(
    query: Query<Array<T>, T>,
    options: PaginationOptions
  ): Promise<PaginationResult<T>>;
  countDocs(query: Query<Array<T>, T>): Promise<DocCount<T>>;
};
