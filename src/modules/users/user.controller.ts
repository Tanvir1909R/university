import { RequestHandler } from "express";
import envConfig from "../../envConfig";
import Users from "./user.schema";
import { generateFacultyId, generateStudentId } from "../../utils/user.utils";
import { AcademicSemester } from "../academicSemester/academic.schema";
import mongoose, { startSession } from "mongoose";
import { Students } from "../student/student.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import { Faculty } from "../faculty/faculty.schema";

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
      const generateId = await generateStudentId(academicSemester);
      user.id = generateId;
      student.id = generateId;
      const newStudent = await Students.create([student], { session });
      if (!newStudent.length) {
        throw new apiError(
          httpStatus.BAD_REQUEST,
          "failed to create a student"
        );
      }
      user.student = newStudent[0]._id;
      const newUser = await Users.create([user], { session });
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
        path: "student",
        populate: [
          { path: "semester" },
          { path: "department" },
          { path: "faculty" },
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

export const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const {faculty, user} = req.body;
    user.role = 'faculty';
    let userAllData = null;0
    const session = await startSession();
    try {
        session.startTransaction()
        const generateId = generateFacultyId()
        user.id = generateId;
        faculty.id = generateId;
        const newFaculty = await Faculty.create([faculty],{session});
        if(!newFaculty.length){
          throw new apiError(httpStatus.BAD_REQUEST,'fail to create faculty')
        }
        user.faculty = newFaculty[0]._id;
        const newUser = await Users.create([user],{session})
        userAllData = newUser[0];
        if(!newUser.length){
          throw new apiError(httpStatus.BAD_REQUEST,"fail to create user")
        } 

        await session.commitTransaction();
        await session.endSession()
    } catch (error) {
      await session.abortTransaction();
      await session.endSession()
      throw error
    }
    if(userAllData){
      userAllData = await Users.findOne({id: userAllData.id}).populate({
        path:"faculty",
        populate:[
          {path:"department"},
          {path:'faculty'}
        ]
      })
    }
    res.status(200).json({
      success: true,
      message: "created successfully",
      data: userAllData,
    });
  } catch (error) {
    next(error);
  }
};
