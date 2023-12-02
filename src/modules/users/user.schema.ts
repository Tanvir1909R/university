import {Model, Schema,Types,model} from 'mongoose'
import { iStudent } from '../student/student.schema';

export interface iUser{
    id:string,
    role:string,
    password:string,
    student?:Types.ObjectId | iStudent,
    faculty?:Types.ObjectId,
    admin?:Types.ObjectId
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
        required:true
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:'students',
    },
    // faculty:{
    //     type:Schema.Types.ObjectId,
    //     ref:'faculties',
    // },
    // admin:{
    //     type:Schema.Types.ObjectId,
    //     ref:'admins',
    // }
},{
    timestamps:true,
})

const Users = model<iUser, UserModel>('users',userSchema)

export default Users