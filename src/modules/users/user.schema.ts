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

type UserModel = Model<iUser, object>;

const userSchema = new Schema<iUser>({
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

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    next()
})

const Users = model<iUser, UserModel>('users',userSchema)

export default Users