import { Schema, model } from "mongoose";

export interface iFaculty {
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
  department: Schema.Types.ObjectId,
  faculty: Schema.Types.ObjectId,
  profileImage?: string,
  [key:string]:any // index
}

const facultySchema = new Schema<iFaculty>({
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
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicDepartments",
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicFaculties",
  },
  profileImage: {
    type: String,
  },
});

export const Faculty = model<iFaculty>("faculties", facultySchema);
