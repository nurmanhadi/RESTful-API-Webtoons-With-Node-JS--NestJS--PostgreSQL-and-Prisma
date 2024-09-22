import { ApiProperty } from "@nestjs/swagger"

export class UserResponse{
    email?: string
    access_token?: string
}
export class RegisterUserRequest {
    @ApiProperty({maximum: 100})
    email: string
    @ApiProperty({maximum: 100})
    password: string
}


export class LoginUserRequest {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}