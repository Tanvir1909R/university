import { Schema, model } from "mongoose";

export interface iAdmin {
  id: string,
  name: {
    firstName: string;
    lastName: string;
  },
  dateOfBirth: string,
  email: string,
  contactNo: string,
  emergencyContactNo: string,
  gender: "male" | "female",
  permanentAddress: string,
  presentAddress: string,
  bloodGroup?: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-" | "O-",
  designation: string,
  managingDepartment: Schema.Types.ObjectId,
  profileImage?: string,
  [key:string]:any // index
}

const adminSchema = new Schema<iAdmin>({
  id: {
    type: String,
    required: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
  },
  designation: {
    type: String,
    required: true,
  },
  managingDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicDepartments",
  },
  profileImage: {
    type: String,
  },
});

export const Admin = model<iAdmin>("admins", adminSchema);
