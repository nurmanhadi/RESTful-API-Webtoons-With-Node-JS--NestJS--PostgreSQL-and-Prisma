export class WebResponse<T>{
    statusCode: number
    message: string
    data?: T
    errors?: string
    metadata?: object
}

export class Pagination{
    totalCount?: number
    totalPage?: number
    currentPage?: number
}