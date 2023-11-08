import { SortOrder } from "mongoose";

interface iOption{
    page?:number,
    limit?:number,
    sortBy?:string,
    sortOrder?:SortOrder
}

interface iOptionResult{
    page:number,
    limit:number,
    skip:number,
    sortBy:string,
    sortOrder:SortOrder
}

const calculatePagination = (option:iOption):iOptionResult=>{
    const page = Number(option.page) || 1;
    const limit = Number(option.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = option.sortBy || "createAt";
    const sortOrder = option.sortOrder || "desc"
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export default calculatePagination