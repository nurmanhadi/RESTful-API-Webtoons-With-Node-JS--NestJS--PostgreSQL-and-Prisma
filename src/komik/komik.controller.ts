import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { KomikService } from "./komik.service";
import { KomikCreateRequest, KomikResponse, KomikUpdateRequest } from "src/model/komik.model";
import { WebResponse } from "src/model/web.model";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('api/komiks')
export class KomikController{
    constructor(private readonly komikService: KomikService){}

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard)
    async create(@Body() req: KomikCreateRequest): Promise<WebResponse<KomikResponse>>{
        const komik = await this.komikService.create(req)
        return {
            statusCode: 201,
            message: "create komik success",
            data: komik
        }
    }

    @Get('/:id')
    @HttpCode(200)
    async findFirst(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<KomikResponse>>{
        const komik = await this.komikService.findUnique(id)
        return {
            statusCode: 200,
            message: "get komik success",
            data: komik
        }
    }

    @Patch('/:id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: KomikUpdateRequest
    ): Promise<WebResponse<KomikResponse>>{
        const komik = await this.komikService.update(id, req)
        return {
            statusCode: 200,
            message: "update komik success",
            data: komik
        }
    }

    @Delete('/:id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<KomikResponse>>{
        await this.komikService.delete(id)
        return {
            statusCode: 200,
            message: "delete komik success"
        }
    }

    @Get()
    @HttpCode(200)
    async findMany(@Query("page", ParseIntPipe) page: number = 1): Promise<WebResponse<KomikResponse[]>>{
        const pageSize = 2
        const pagination = await this.komikService.pagination(page, pageSize)
        const komiks = await this.komikService.findMany(page, pageSize)
        return {
            statusCode: 200,
            message: "get komiks succes",
            data: komiks,
            metadata: pagination
        }
    }
}