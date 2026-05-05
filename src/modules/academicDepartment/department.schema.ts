import { Schema, model } from "mongoose"

interface iAcademicDepartment{
    title:string,
    academicFaculty:Schema.Types.ObjectId,
    syncId:string
}

const AcademicDepartmentSchema = new Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:"academicFaculties",
        require:true
    },
    syncId:{
        type:String,
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