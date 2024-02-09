import {Model, Schema,Types,model} from 'mongoose'
import { iStudent } from '../student/student.schema';
import { iFaculty } from '../faculty/faculty.schema';
import { iAdmin } from '../admin/admin.schema';
import bcrypt from 'bcrypt'

export interface iUser{
    id:string,
    role:string,
    password:string,
    needPasswordChange:boolean,
    student?:Types.ObjectId | iStudent,
    faculty?:Types.ObjectId | iFaculty,
    admin?:Types.ObjectId   | iAdmin
}

type iUserMethod = {
    isExist(id:string):Promise<Pick<iUser, keyof iUser> | null>,
    isPasswordMatch(givenPass:string,savePass:string):Promise<boolean>
}

type UserModel = Model<iUser, object,iUserMethod>;

const userSchema = new Schema<iUser,object,iUserMethod>({
    id:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
        select: 0 // this line for not return this password after create this document 
    },
    needPasswordChange:{
        type:Boolean,
        default:true
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:'students',
    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:'faculties',
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:'admins',
    }
},{
    timestamps:true,
})

userSchema.methods.isExist = async function (id:string):Promise<Pick<iUser, keyof iUser> | null>{
    const user = await Users.findOne({id},{id:1,role:1,password:1,needPasswordChange:1})
    return user
}
userSchema.methods.isPasswordMatch = async function (givenPass:string, savePass:string ):Promise<boolean>{
    return await bcrypt.compare(givenPass,savePass);
}

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    next()
})

const Users = model<iUser, UserModel>('users',userSchema)

export default Users