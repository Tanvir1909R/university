export interface iErrorResponse{
    statusCode:number,
    message:string,
    errorMessages:{
        path:string,
        message:string
    }[]
}

export interface iPagination{
    page?:number,
    limit?:number,
    sortBy?:string,
    sortOrder?:"asc" | "desc"
}