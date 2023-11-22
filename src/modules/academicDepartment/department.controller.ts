import { RequestHandler } from "express";
import { OK } from "http-status";
import pick from "../../pick";
import { filterFields } from "../../utils/common";
import calculatePagination from "../../helper/pagination.helper";
import { SortOrder } from "mongoose";
import AcademicDepartment from "./department.schema";

export const createDepartment: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await AcademicDepartment.create(data);
    res.status(OK).json({
      success: true,
      message: "Academic department cerated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const findDepartment: RequestHandler = async (req, res, next) => {
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
    const result = await AcademicDepartment.find(findCondition).populate('faculty').sort(sortOrderFaculty).skip(skip).limit(limit);
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


export const deleteDepartment:RequestHandler = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const result = await AcademicDepartment.findOneAndDelete({_id:id},req.body);
    res.status(OK).json({
      success: true,
      message: "Academic faculty deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}
export const updateDepartment:RequestHandler = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const result = await AcademicDepartment.findOneAndUpdate({_id:id},req.body,{new:true});
    res.status(OK).json({
      success: true,
      message: "Academic faculty updated successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
}