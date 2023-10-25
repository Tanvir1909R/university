import { Request, Response } from "express";
import envConfig from "../../envConfig";
import { generateUserId } from "../../utils/user.utils";
import Users from "./user.schema";

export const createUser = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: "Failed to create user",
    });
  }
};
