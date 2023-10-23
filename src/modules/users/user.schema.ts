import {Model, Schema,model} from 'mongoose'

export interface iUser{
    id:string,
    role:string,
    password:string
}

type UserModel = Model<iUser, object>;

const userSchema = new Schema<iUser>({
    id:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const Users = model<iUser, UserModel>('users',userSchema)

export default Users