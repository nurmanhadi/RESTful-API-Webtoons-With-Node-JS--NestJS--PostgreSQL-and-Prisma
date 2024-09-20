import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ValidationService } from "src/common/validation.service";
import { Logger } from "winston";
import { ImageRepository } from "./image.repository";
import { ImageCreateRequest, ImageResponse } from "src/model/image.model";
import { ImageValidation } from "./image.validation";
import { KomikRepository } from "src/komik/komik.repository";
import { ChapterRepository } from "src/chapter/chapter.repository";
import { Express } from "express";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private readonly imageRepository: ImageRepository,
        private readonly komikRepository: KomikRepository,
        private readonly chapterRepository: ChapterRepository
    ){}

    async create(komikId: number, chap: number, req: ImageCreateRequest, img: Express.Multer.File): Promise<ImageResponse> {
        const komik = await this.komikRepository.findUnique(komikId)
        if(!komik) {
            throw new HttpException('komik not found', 404)
        }
        const komikFolderPath = path.join('public','komiks', komik.title)
        fs.mkdirSync(komikFolderPath, {recursive: true})

        const chapter = await this.chapterRepository.findFirst(komikId, chap)
        if(!chapter){
            throw new HttpException('chapter not found', 404)
        }
        const chapterFolderPath = path.join(komikFolderPath, chapter.chapter.toString())
        fs.mkdirSync(chapterFolderPath, {recursive: true})

        const fileName = `${Date.now()}-${img.originalname}`
        const destination = path.join(chapterFolderPath, fileName)
        await fs.promises.writeFile(destination, img.buffer)

        req.chapterId = chapter.id
        req.url = fileName
        const imageRequest: ImageCreateRequest = await this.validationService.validate(ImageValidation.CREATE, req)

        const image = await this.imageRepository.createImage(imageRequest)
        return image
    }
}