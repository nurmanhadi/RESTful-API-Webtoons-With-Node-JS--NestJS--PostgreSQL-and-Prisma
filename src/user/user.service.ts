import { HttpException, Inject, Injectable, Req, Res } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ValidationService } from "src/common/validation.service";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from "bcrypt"
import { AuthService } from "src/auth/auth.service";
import { UserRepository } from "./user.repository";
import { v4 } from "uuid";
import { Request, Response } from "express";

@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private authService: AuthService,
        private readonly userRepository: UserRepository
    ){}

    async register(req: RegisterUserRequest): Promise<UserResponse> {
        this.logger.info(`register user ${JSON.stringify(req)}`)
        const registerRequest: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, req)
        const totalUserWithSameEmail = await this.userRepository.count(registerRequest)

        if(totalUserWithSameEmail != 0){
            throw new HttpException("user already register", 400)
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)
        const user = await this.userRepository.create(registerRequest)
        return {
            email: user.email,
        }
    }

    async login(req: LoginUserRequest): Promise<UserResponse>{
        this.logger.info(`login user ${JSON.stringify(req)}`)

        const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, req)
        const user = await this.userRepository.findUnique(loginRequest)
        if(!user){
            throw new HttpException("email or password is invalid", 401)
        }
        
        const isPassword = await bcrypt.compare(loginRequest.password, user.password)
        if(!isPassword){
            throw new HttpException("email or password is invalid", 401)
        }

        const payload = {email: user.email}
        const token = await this.authService.generateAccessToken(payload)

        return {
            email: user.email,
            access_token: token
        }
    }

    async logout(userEmail: string): Promise<boolean> {
        await this.userRepository.deleteRefreshToken(userEmail)
        return true
    }

    async refreshAccessToken(@Req() req: Request): Promise<UserResponse> {
        const refreshToken = req.cookies['refreshToken']
        if(!refreshToken){
            throw new HttpException('no refresh token provided', 401)
        }

        const tokenRecord = await this.userRepository.findRefreshToken(refreshToken)
        if(!tokenRecord || tokenRecord.revoked || tokenRecord.expiresAt < new Date()) {
            throw new HttpException('invalid or expired refresh token', 401)
        }

        const payload = {email: tokenRecord.userEmail}
        const newAccessToken = await this.authService.generateAccessToken(payload)
        return {
            access_token: newAccessToken
        }
    }
    async createRefreshToken(email: string): Promise<string> {

        const refreshToken = v4()
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const token = await this.userRepository.refreshToken(email, refreshToken, expiresAt)

        return token.token
    }
}