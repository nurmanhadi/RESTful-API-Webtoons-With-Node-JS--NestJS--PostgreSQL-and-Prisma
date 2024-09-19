import { ApiProperty } from "@nestjs/swagger"

export class ImageResponse{
    id: number
    chapterId: number
    url: string
    pageNumber: number
    createdAt: Date
    updatedAt: Date
}

export class ImageCreateRequest{
    @ApiProperty()
    chapterId: number
    @ApiProperty()
    url: string
    @ApiProperty()
    pageNumber: number
}