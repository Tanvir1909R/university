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
    // searching
    const { search,...filterData } = pick(req.query, ["search","title","code"]);
    const searchAbleField = ["title","code"]
    const andCondition = [];
    if(search){
      andCondition.push({
        $or: searchAbleField.map((field)=>({
          [field]:{
            $regex:search,
            $options:'i'
          }
        }))
      })
    }
    if(Object.keys(filterData).length){
      andCondition.push({
        $and:Object.entries(filterData).map(([field, value])=>({
          [field]:value
        }))
      })
    }
    const findCondition = andCondition.length > 0 ? { $and: andCondition } : {}
    // pagination
    const paginationOption = pick(req.query, filterFields);
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOption);
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }

    const result = await AcademicSemester.find(findCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total = await AcademicSemester.countDocuments();

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


export const getSingleSemester: RequestHandler = async(req,res,next)=>{
  try {
      const id = req.params.id;
      const result = await AcademicSemester.findById(id);
      res.status(200).json({
        success: true,
        message: "Academic semester get successfully",
        data: result,
      });
  } catch (error) {
    next(error)
  }
}

export const updateAcademicSemester:RequestHandler = async(req,res,next)=>{
  try {
      const id = req.params.id;
      const payload = req.body;
      if (academicTitleCode[payload.title] !== payload.code) {
        throw new apiError(httpStatus.BAD_REQUEST, "Invalid semester code");
      }
      const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true})
      res.status(200).json({
        success: true,
        message: "Academic semester update successfully",
        data: result,
      });
  } catch (error) {
    next(error)
  }
}
export const deleteAcademicSemester:RequestHandler = async(req,res,next)=>{
  try {
      const id = req.params.id;
      const result = await AcademicSemester.findOneAndDelete({_id:id})
      res.status(200).json({
        success: true,
        message: "Academic semester deleted successfully",
        data: result,
      });
  } catch (error) {
    next(error)
  }
}