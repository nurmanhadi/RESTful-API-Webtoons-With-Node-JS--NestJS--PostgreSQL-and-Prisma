import { Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { WebResponse } from "src/model/web.model";
import { ChapterCreateRequest, ChapterResponse, ChapterUpdateRequest } from "src/model/chapter.model";
import { AuthGuard } from "src/auth/auth.guard";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Controller('api/komiks')
export class ChapterController {
    constructor(
        private chapterService: ChapterService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ){}

    @Get("/:komikId/chapters")
    @HttpCode(200)
    async findMany(
        @Param('komikId', ParseIntPipe) komikId: number,
    ): Promise<WebResponse<ChapterResponse[]>>{
        const chapter = await this.chapterService.findMany(komikId)
        return {
            statusCode: 200,
            message: 'get chapter success',
            data: chapter
        }
    }

    @Get("/:komikId/chapters/:chapter")
    @HttpCode(200)
    async findFirst(
        @Param('chapter', ParseIntPipe) chap: number,
    ): Promise<WebResponse<ChapterResponse>>{
        const chapter = await this.chapterService.findFirst(chap)
        return {
            statusCode: 200,
            message: 'get chapter success',
            data: chapter
        }
    }

    @Post('/:komikId/chapters')
    @HttpCode(201)
    @UseGuards(AuthGuard)
    async create(
        @Param('komikId', ParseIntPipe) komikId: number,
        @Body() req: ChapterCreateRequest
    ): Promise<WebResponse<ChapterResponse>> {
        this.logger.info(`chapter create controller ${JSON.stringify(req)}`)
        const chapter = await this.chapterService.create(komikId, req)
        return {
            statusCode: 201,
            message: 'create chapter success',
            data: chapter
        }
    }

    @Patch("/:komikId/chapters/:chapterId")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async update(
        @Param('komikId',ParseIntPipe) komikId: number,
        @Param('chapterId',ParseIntPipe) chapterId: number,
        @Body() req: ChapterUpdateRequest,
    ): Promise<WebResponse<ChapterResponse>>{
        this.logger.info(`chapter create controller ${JSON.stringify(req)}`)
        req.comikId = komikId
        req.id = chapterId
        const chapter = await this.chapterService.update(req)
        return {
            statusCode: 200,
            message: 'chapter update success',
            data: chapter
        }
    }
    
    @Delete("/:komikId/chapters/:chapterId")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async delete(@Param('chapterId', ParseIntPipe) chapterId: number): Promise<WebResponse<boolean>>{
        const chapter = await this.chapterService.delete(chapterId)
        return {
            statusCode: 200,
            message: 'delete chapter success',
            data: chapter
        }
    }
}