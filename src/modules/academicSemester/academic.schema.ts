import { Model, Schema, model } from "mongoose";
import apiError from "../../errors/apiError";
import status from 'http-status'

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

// handle same year and academic semester
academicSemesterSchema.pre('save', async function(next){
  const isExist = await AcademicSemester.findOne({title: this.title, year:this.year});
  if(isExist){
    throw new apiError(status.CONFLICT,"Academic semester is already exist!")
  }
  next();
})


export const AcademicSemester = model<iAcademic, academicSemesterModel>(
  "academicSemesters",
  academicSemesterSchema
);

