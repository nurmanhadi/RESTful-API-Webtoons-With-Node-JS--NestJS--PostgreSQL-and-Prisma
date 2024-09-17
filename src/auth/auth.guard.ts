import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        this.logger.info(`auth token ${JSON.stringify(token)}`)
        if(!token){
            throw new UnauthorizedException()
        }
        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: 'kuwioncuqwoiue823920189nwiehahei'
                }
            )
            request['user'] = payload
        }catch{
            throw new UnauthorizedException()
        }
        return true
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}