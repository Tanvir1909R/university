import { RequestHandler } from "express";
import envConfig from "../../envConfig";
import Users from "./user.schema";
import { generateStudentId } from "../../utils/user.utils";
import { AcademicSemester } from "../academicSemester/academic.schema";
import mongoose from "mongoose";
import { Students } from "../student/student.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";

export const createsStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...user } = req.body;
    if (!user.password) {
      user.password = envConfig.default_pass as string;
    }
    user.role = "student";
    const academicSemester = await AcademicSemester.findById(student.semester);
    const session = await mongoose.startSession();
    let newUserAllData = null;
    try {
      session.startTransaction();
      const generateId = generateStudentId(academicSemester);
      user.id = generateId;
      student.id = generateId;
      const newStudent = await Students.create([student], { session });
      if (!newStudent.length) {
        throw new apiError(
          httpStatus.BAD_REQUEST,
          "failed to create a student"
        );
      }
      const newUser = await Users.create([user], { session });
      user.student = newStudent[0]._id;
      newUserAllData = newUser[0];
      if (!newUser.length) {
        throw new apiError(httpStatus.BAD_REQUEST, "failed to create user");
      }
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }

    if (newUserAllData) {
      newUserAllData = await Users.findOne({ id: newUserAllData.id }).populate({
        path: "students",
        populate: [
          { path: "academicSemesters" },
          { path: "academicDepartments" },
          { path: "academicFaculties" },
        ],
      });
    }

    res.status(200).json({
      success: true,
      message: "created successfully",
      data: newUserAllData,
    });
  } catch (error) {
    next(error);
  }
};
