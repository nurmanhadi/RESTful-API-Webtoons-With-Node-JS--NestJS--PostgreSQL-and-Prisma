import { Body, Controller, HttpCode, Post, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { RegisterUserRequest, UserResponse } from "src/model/user.model";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller("api/users")
export class UserController{
    constructor(
        private userService: UserService
    ){}

    @Post("/register")
    @HttpCode(201)
    async register(@Body() req: RegisterUserRequest): Promise<WebResponse<UserResponse>>{
        const result = await this.userService.register(req)
        return {
            statusCode: 201,
            message: "create user succes",
            data: result
        }
    }
    @Post("/login")
    @HttpCode(200)
    async login(@Body() req: RegisterUserRequest): Promise<WebResponse<UserResponse>>{
        const result = await this.userService.login(req)
        return {
            statusCode: 200,
            message: "login user succes",
            data: result
        }
    }
    
    @Post("/logout")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async logout(): Promise<WebResponse<boolean>>{
        const result = await this.userService.logout()
        return {
            statusCode: 200,
            message: 'logout user success',
            data: result
        }
    }
}