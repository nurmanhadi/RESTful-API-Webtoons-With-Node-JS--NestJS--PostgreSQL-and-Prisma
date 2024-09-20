import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageRepository } from './image.repository';
import { ChapterModule } from 'src/chapter/chapter.module';
import { KomikModule } from 'src/komik/komik.module';

@Module({
    imports: [ChapterModule, KomikModule],
    controllers: [ImageController],
    providers: [ImageService, ImageRepository]
})
export class ImageModule {}
