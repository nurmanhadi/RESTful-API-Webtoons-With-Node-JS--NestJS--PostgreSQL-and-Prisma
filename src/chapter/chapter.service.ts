import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ChapterRepository } from "./chapter.repository";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { ChapterCreateRequest, ChapterResponse, ChapterUpdateRequest } from "src/model/chapter.model";
import { ValidationService } from "src/common/validation.service";
import { ChapterValidation } from "./chapter.validation";
import { KomikRepository } from "src/komik/komik.repository";

@Injectable()
export class ChapterService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private readonly chapterRepository: ChapterRepository,
        private readonly komikRepository: KomikRepository,
        private validationService: ValidationService
    ){}

    async findMany(komikId: number): Promise<ChapterResponse[]> {
        const chapter = await this.chapterRepository.findMany(komikId)
        return chapter
    }

    async findFirst(komikId: number, chap: number): Promise<ChapterResponse>{
        const chapter = await this.chapterRepository.findFirst(komikId, chap)
        if(!chapter){
            throw new HttpException('chapter not found', 404)
        }
        return chapter
    }

    async create(comikId: number, req: ChapterCreateRequest): Promise<ChapterResponse> {
        req.comikId = comikId

        const createRequest: ChapterCreateRequest = await this.validationService.validate(ChapterValidation.CREATE, req)

        const checkChapter = await this.chapterRepository.checkChapter(createRequest.chapter)
        if(checkChapter != 0){
            throw new HttpException('chapter already exist', 400)
        }

        const chapter = await this.chapterRepository.create(createRequest)
        return chapter
    }

    async update(req: ChapterUpdateRequest): Promise<ChapterResponse>{
        const updateRequest: ChapterUpdateRequest = await this.validationService.validate(ChapterValidation.UPDATE, req)

        const checkKomik = await this.komikRepository.count(req.comikId)
        if(checkKomik === 0){
            throw new HttpException('komik not found', 404)
        }

        const checkChapterId = await this.chapterRepository.checkChapterId(updateRequest.id)
        if(checkChapterId === 0){
            throw new HttpException('chapter not found', 404)
        }
        const checkChapter = await this.chapterRepository.checkChapter(updateRequest.chapter)
        if(checkChapter != 0){
            throw new HttpException('chapter already exist', 400)
        }

        const chapter = await this.chapterRepository.update(updateRequest)
        return chapter
    }

    async delete(chapterId: number): Promise<boolean> {
        await this.chapterRepository.delete(chapterId)
        return true
    }
}