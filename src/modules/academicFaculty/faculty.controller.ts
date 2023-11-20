import { RequestHandler } from "express";
import AcademicFaculty from "./faculty.schema";
import { OK } from "http-status";
import pick from "../../pick";
import { filterFields } from "../../utils/common";
import calculatePagination from "../../helper/pagination.helper";
import { SortOrder } from "mongoose";

export const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await AcademicFaculty.create(data);
    res.status(OK).json({
      success: true,
      message: "Academic faculty get successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const findFaculty: RequestHandler = async (req, res, next) => {
  try {
    //search
    const {search, ...filterData} = pick(req.query,["search","title"])
    const searchAbleField = ["title"]
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
    
    //pagination
    const paginationOption = pick(req.query, filterFields);
    const { limit,page, skip, sortBy, sortOrder } =
      calculatePagination(paginationOption);
    const sortOrderFaculty:{[key:string]:SortOrder} = {}
    if(sortOrder && sortBy){
      sortOrderFaculty[sortBy] = sortOrder
    }
    const result = await AcademicFaculty.find(findCondition).sort(sortOrderFaculty).skip(skip).limit(limit);
    res.status(OK).json({
      success: true,
      message: "data get successfully",
      data: result,
      meta: {
        page: page,
        limit: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const deleteFaculty:RequestHandler = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const result = await AcademicFaculty.findOneAndDelete({_id:id},req.body);
    res.status(OK).json({
      success: true,
      message: "Academic faculty deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}
export const updateFaculty:RequestHandler = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const result = await AcademicFaculty.findOneAndUpdate({_id:id},req.body,{new:true});
    res.status(OK).json({
      success: true,
      message: "Academic faculty updated successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}