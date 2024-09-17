import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
    imports:[
        JwtModule.register({
            global: true,
            secret: 'kuwioncuqwoiue823920189nwiehahei',
            signOptions: {expiresIn: '15m'}
        })
    ],
    providers:[AuthService],
    exports:[AuthService],
})
export class AuthModule {}
