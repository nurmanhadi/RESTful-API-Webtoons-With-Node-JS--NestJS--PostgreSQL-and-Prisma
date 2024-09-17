import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ValidationService } from "src/common/validation.service";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from "bcrypt"
import { AuthService } from "src/auth/auth.service";
import { UserRepository } from "./user.repository";

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

    async logout(): Promise<boolean> {
        return true
    }
}