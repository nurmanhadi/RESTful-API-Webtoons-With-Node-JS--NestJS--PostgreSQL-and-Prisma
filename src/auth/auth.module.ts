import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

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
