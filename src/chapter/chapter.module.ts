import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from './chapter.repository';
import { KomikModule } from 'src/komik/komik.module';

@Module({
    imports: [KomikModule],
    controllers: [ChapterController],
    providers: [ChapterService, ChapterRepository],
    exports: [ChapterRepository],
})
export class ChapterModule {}
