import { Schema, model } from "mongoose";

export type iStudent = {
  id: string;
  name: {
    firstName: string,
    middleName?: string,
    lastName: string
  };
  dateOfBirth: string;
  gender: "male"|"female",
  bloodGroup?:  "A+"| "B+"| "AB+"| "O+"| "A-"| "B-"| "AB-"| "O-",
  email: string,
  contactNo: string,
  emergencyContactNo: string,
  presentAddress: string,
  permanentAddress: string,
  guardian: {
      fatherName: string,
      fatherOccupation: string,
      fatherContactNo: string,
      motherName: string,
      motherOccupation: string
      motherContactNo: string
      address: string
  },
  localGuardian: {
      name: string,
      occupation: string,
      contactNo: string,
      address: string,
  };
  profileImg?: string,
  semester: Schema.Types.ObjectId,
  department: Schema.Types.ObjectId,
  faculty: Schema.Types.ObjectId,
  [key:string]:any // index signature if i have to use Object.keys or objectName[key] 
};

const studentSchema = new Schema<iStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    dateOfBirth: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    profileImg: {
      type: String,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "academicSemesters",
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "academicDepartments",
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculties",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Students = model<iStudent>("students", studentSchema);
