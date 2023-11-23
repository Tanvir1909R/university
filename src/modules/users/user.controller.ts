import { RequestHandler } from "express";
import envConfig from "../../envConfig";
import Users from "./user.schema";
import { generateStudentId } from "../../utils/user.utils";

export const createUser: RequestHandler = async (req, res,next) => {
  try {
    const semester = {
      code:"01",
      year:"2023"
    }
    const user = req.body;
    const newId = await generateStudentId(semester);
    user.id = newId;
    if (!user.password) {
      user.password = envConfig.default_pass as string;
    }
    const result = await Users.create(user)
    res.status(200).json({
        success:true,
        message:"created successfully",
        data:result
    })
  } catch (error) {
    next(error)
  }
};
