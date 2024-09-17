import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { KomikModule } from './komik/komik.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    AuthModule,
    KomikModule,
    ThrottlerModule.forRoot([{
    ttl: 6000,
    limit: 1000
  }]),
    ChapterModule,
],
})
export class AppModule {}
