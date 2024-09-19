import { ApiProperty } from "@nestjs/swagger"

export class ChapterResponse {
    id: number
    comikId: number
    chapter: number
    createdAt: Date
    updatedAt: Date
}

export class ChapterCreateRequest {
    @ApiProperty()
    comikId: number
    @ApiProperty()
    chapter: number
}
export class ChapterUpdateRequest {
    @ApiProperty()
    id: number
    @ApiProperty()
    comikId: number
    @ApiProperty()
    chapter: number
    @ApiProperty()
    updateAt: Date
}
