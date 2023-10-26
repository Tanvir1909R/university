import { RequestHandler } from "express";
import envConfig from "../../envConfig";
import { generateUserId } from "../../utils/user.utils";
import Users from "./user.schema";

export const createUser: RequestHandler = async (req, res,next) => {
  try {
    const user = req.body;
    const newId = await generateUserId();
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
