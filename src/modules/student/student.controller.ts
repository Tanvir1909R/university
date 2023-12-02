import { RequestHandler } from "express";
import pick from "../../pick";
import { filterFields } from "../../utils/common";
import calculatePagination from "../../helper/pagination.helper";
import { SortOrder } from "mongoose";
import { Students, iStudent } from "./student.schema";
import httpStatus from "http-status";
import apiError from "../../errors/apiError";

export const getStudent: RequestHandler = async (req, res, next) => {
  try {
    // searching
    const { search, ...filterData } = pick(req.query, [
      "search",
      "id",
      "email",
      "contactNo",
    ]);
    const searchAbleField = ["id", "email", "name.firstName", "name.lastName"];
    const andCondition = [];
    if (search) {
      andCondition.push({
        $or: searchAbleField.map((field) => ({
          [field]: {
            $regex: search,
            $options: "i",
          },
        })),
      });
    }
    if (Object.keys(filterData).length) {
      andCondition.push({
        $and: Object.entries(filterData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const findCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    // pagination
    const paginationOption = pick(req.query, filterFields);
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOption);
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }

    const result = await Students.find(findCondition)
      .populate("semester")
      .populate("department")
      .populate("faculty")
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total = await Students.countDocuments(findCondition);

    res.status(httpStatus.OK).json({
      success: true,
      message: "data get successfully",
      data: result,
      meta: {
        page: page,
        limit: limit,
        total: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Students.findById(id)
      .populate("semester")
      .populate("department")
      .populate("faculty");
    res.status(200).json({
      success: true,
      message: "student get successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {name,guardian, localGuardian, ...studentObj} = req.body;
    const isExist = await Students.findOne({ _id: id });
    if(!isExist){
      throw new apiError(httpStatus.NOT_FOUND,"student not found");
    }
    const newStudent:Partial<iStudent> = {...studentObj};

    // dynamic handle
    if(name && Object.keys(name).length > 0){
      Object.keys(name).forEach((key)=>{
        const keyName = `name.${key}`;
        newStudent[keyName] = name[key]
      })
    }
    if(guardian && Object.keys(guardian).length > 0){
      Object.keys(guardian).forEach((key)=>{
        const keyGuardian = `guardian.${key}`;
        newStudent[keyGuardian] = guardian[key]
      })
    }
    if(localGuardian && Object.keys(localGuardian).length > 0){
      Object.keys(localGuardian).forEach((key)=>{
        const keyLocalGuardian = `localGuardian.${key}`;
        newStudent[keyLocalGuardian] = localGuardian[key]
      })
    }
    const result = await Students.findOneAndUpdate({ _id: id },newStudent,{new:true});

    res.status(200).json({
      success: true,
      message: "Student update successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Students.findOneAndDelete({ _id: id })
      .populate("semester")
      .populate("department")
      .populate("faculty");
    res.status(200).json({
      success: true,
      message: "Academic semester deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
