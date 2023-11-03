import { Model, Schema, model } from "mongoose";

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface iAcademic {
  title: "autumn" | "summer" | "fall";
  code: "01" | "02" | "03";
  year: number;
  startMonth: Month;
  endMonth: Month;
}

type academicSemesterModel = Model<iAcademic>;

const academicSemesterSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      enum:["autumn", "summer", "fall"]
    },
    code: {
      type: String,
      require: true,
      unique: true,
      enum:['01', '02', '03']
    },
    year: {
      type: Number,
      require: true,
    },
    startMonth: {
      type: String,
      require: true,
      enum:month
    },
    endMonth: {
      type: String,
      require: true,
      enum:month
    },
  },
  { timestamps: true }
);

export const AcademicSemester = model<iAcademic, academicSemesterModel>(
  "academicSemesters",
  academicSemesterSchema
);
