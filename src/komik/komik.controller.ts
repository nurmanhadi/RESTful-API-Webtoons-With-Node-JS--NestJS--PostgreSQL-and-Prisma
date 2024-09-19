import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { KomikService } from "./komik.service";
import { KomikCreateRequest, KomikResponse, KomikUpdateRequest } from "src/model/komik.model";
import { WebResponse } from "src/model/web.model";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

@ApiTags('komiks')
@Controller('api/komiks')
export class KomikController{
    constructor(private readonly komikService: KomikService){}

    @Get()
    @HttpCode(200)
    async findMany(
        @Query("page", ParseIntPipe) page: number = 1,
        @Query("size", ParseIntPipe) size: number = 1,
    ): Promise<WebResponse<KomikResponse[]>>{
        const pagination = await this.komikService.pagination(page, size)
        const komiks = await this.komikService.findMany(page, size)
        return {
            statusCode: 200,
            message: "get komiks succes",
            data: komiks,
            metadata: pagination
        }
    }

    @Get('/:komikId')
    @HttpCode(200)
    async findFirst(@Param('komikId', ParseIntPipe) id: number): Promise<WebResponse<KomikResponse>>{
        const komik = await this.komikService.findUnique(id)
        return {
            statusCode: 200,
            message: "get komik success",
            data: komik
        }
    }

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard)
    @ApiHeader({name: 'Authorization', description: 'accessToken'})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar'))
    async create(
        @UploadedFile() avatar: Express.Multer.File,
        @Body() req: KomikCreateRequest
    ): Promise<WebResponse<KomikResponse>>{
        const komik = await this.komikService.create(avatar, req)
        return {
            statusCode: 201,
            message: "create komik success",
            data: komik
        }
    }

    @Patch('/:komikId')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiHeader({name: 'Authorization', description: 'accessToken'})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar'))
    async update(
        @UploadedFile() avatar: Express.Multer.File,
        @Param('komikId', ParseIntPipe) id: number,
        @Body() req: KomikUpdateRequest
    ): Promise<WebResponse<KomikResponse>>{
        const komik = await this.komikService.update(id, req, avatar)
        return {
            statusCode: 200,
            message: "update komik success",
            data: komik
        }
    }

    @Delete('/:komikId')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiHeader({name: 'Authorization', description: 'accessToken'})
    async delete(@Param('komikId', ParseIntPipe) id: number): Promise<WebResponse<KomikResponse>>{
        await this.komikService.delete(id)
        return {
            statusCode: 200,
            message: "delete komik success"
        }
    }
}