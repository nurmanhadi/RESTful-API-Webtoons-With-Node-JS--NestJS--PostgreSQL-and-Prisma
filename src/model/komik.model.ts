import { ApiProperty } from "@nestjs/swagger"

export class KomikResponse {
    id?: number
    title: string
    author: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export class KomikCreateRequest {
    @ApiProperty()
    avatar: string
    @ApiProperty()
    title: string
    @ApiProperty()
    author: string
    @ApiProperty()
    description?: string
}
export class KomikUpdateRequest {
    @ApiProperty()
    avatar?: string
    @ApiProperty()
    title?: string
    @ApiProperty()
    author?: string
    @ApiProperty()
    description?: string
    @ApiProperty()
    updatedAt?: Date
}

