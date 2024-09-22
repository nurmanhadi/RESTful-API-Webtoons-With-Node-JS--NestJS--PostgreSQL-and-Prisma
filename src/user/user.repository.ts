import { Injectable } from "@nestjs/common";
import { RefreshToken, User } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { LoginUserRequest } from "src/model/user.model";

@Injectable()

export class UserRepository {
    constructor(private prismaService: PrismaService){}

    async findUnique(req: LoginUserRequest):Promise<User>{
        return this.prismaService.user.findUnique({
            where:{
                email: req.email
            }
        })
    }

    async count(req: LoginUserRequest):Promise<number>{
        return this.prismaService.user.count({
            where:{
                email: req.email
            }
        })
    }

    async create(req: LoginUserRequest): Promise<User>{
        return this.prismaService.user.create({
            data: req
        })
    }

    async refreshToken(userEmail: string, token: string, expiresAt: Date): Promise<RefreshToken> {
        return this.prismaService.refreshToken.create({
            data:{
                userEmail: userEmail,
                token: token,
                expiresAt: expiresAt
            }
        })
    }

    async findRefreshToken(token: string): Promise<RefreshToken> {
        return this.prismaService.refreshToken.findUnique({
            where:{
                token: token
            }
        })
    }
    async deleteRefreshToken(userEmail: string){
        return this.prismaService.refreshToken.deleteMany({
            where:{
                userEmail: userEmail
            }
        })
    }
}