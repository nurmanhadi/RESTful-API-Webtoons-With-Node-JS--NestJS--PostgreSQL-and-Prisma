export class UserResponse{
    email: string
    access_token?: string
}
export class RegisterUserRequest {
    email: string
    password: string
}


export class LoginUserRequest {
    email: string
    password: string
}