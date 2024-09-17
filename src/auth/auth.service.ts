import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService){}

    async generateAccessToken(payload: any){
        return this.jwtService.signAsync(payload, {expiresIn:'15m'})
    }
    async generateRefreshToken(payload: any){
        return this.jwtService.signAsync(payload, {expiresIn:'7d'})
    }
}