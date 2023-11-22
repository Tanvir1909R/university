import { Schema, model } from "mongoose"

interface iAcademicDepartment{
    title:string,
    faculty:Schema.Types.ObjectId
}

const AcademicDepartmentSchema = new Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:"academicFaculties",
        require:true
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
})

const AcademicDepartment = model<iAcademicDepartment>("academicDepartments", AcademicDepartmentSchema)

export default AcademicDepartment