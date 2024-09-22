import { Body, Controller, Header, HttpCode, HttpException, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { RegisterUserRequest, UserResponse } from "src/model/user.model";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

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
    async login(@Body() req: RegisterUserRequest, @Res() res: Response) {
        const result = await this.userService.login(req)
        const refreshToken = await this.userService.createRefreshToken(result.email)
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
        })

        return res.json(
            {
                statusCode: 200,
                message: "login user succes",
                data: result
            }
        )
    }
    
    @Post("/logout")
    @ApiHeader({
        name: 'Authorization',
        description: 'accessToken'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async logout(
        @Req() req: Request,
        @Res() res: Response,
    ){
        const userEmail = req['user'].email
        const result = await this.userService.logout(userEmail)

        res.cookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        return res.json (
            {
                statusCode: 200,
                message: 'logout user success',
                data: result
            }
        )
    }

    @Post('/refresh-token')
    @HttpCode(200)
    async refreshAccessToken(@Req() req: Request): Promise<WebResponse<UserResponse>>{
        const token = await this.userService.refreshAccessToken(req)
        return {
            statusCode: 200,
            message: 'generate new access token success',
            data: token

        }
    }

}