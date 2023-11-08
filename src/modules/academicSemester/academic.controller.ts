import { RequestHandler } from "express";
import { AcademicSemester } from "./academic.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import { iPagination } from "../../interface/common";
import pick from "../../pick";
import { filterFields } from "../../utils/common";
import { SortOrder } from "mongoose";
import calculatePagination from "../../helper/pagination.helper";

const academicTitleCode: {
  [key: string]: string;
} = {
  autumn: "01",
  summer: "02",
  fall: "03",
};

export const createAcademicSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    if (academicTitleCode[data.title] !== data.code) {
      throw new apiError(httpStatus.BAD_REQUEST, "Invalid semester code");
    }
    const result = await AcademicSemester.create(data);
    res.status(200).json({
      success: true,
      message: "Academic semester is created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const paginationOption = pick(req.query, filterFields)
    const {page,limit,skip,sortBy,sortOrder} = calculatePagination(paginationOption);
    const sortCondition:{[key:string]:SortOrder} = {};

    if(sortBy && sortOrder){
      sortCondition[sortBy] = sortOrder
    }

    const result  = await AcademicSemester.find({}).sort(sortCondition).skip(skip).limit(limit)
    const total = await AcademicSemester.countDocuments()
    
    res.status(httpStatus.OK).json({
      success:true,
      message:'data get successfully',
      data:result,
      meta:{
        page:page,
        limit:limit,
        total:total
      }
    })
    
  } catch (error) {
    next(error);
  }
};
