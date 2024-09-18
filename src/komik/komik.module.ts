import { Module } from '@nestjs/common';
import { KomikController } from './komik.controller';
import { KomikRepository } from './komik.repository';
import { KomikService } from './komik.service';

@Module({
    controllers:[KomikController],
    providers: [KomikRepository, KomikService],
    exports: [KomikRepository]
})
export class KomikModule {}
