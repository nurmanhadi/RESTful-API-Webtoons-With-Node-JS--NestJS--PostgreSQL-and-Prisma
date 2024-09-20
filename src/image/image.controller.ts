import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ImageService } from "./image.service";
import { AuthGuard } from "src/auth/auth.guard";
import { WebResponse } from "src/model/web.model";
import { ImageCreateRequest, ImageResponse } from "src/model/image.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('images')
@Controller('api/komiks/:komikId/chapters/:chapter/images')
export class ImageController {
    constructor(private imageService: ImageService){}

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard)
    @ApiHeader({name: 'Authorization', description: 'accessToken'})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Param('komikId', ParseIntPipe) komikId: number,
        @Param('chapter', ParseIntPipe) chapter: number,
        @Body() req: ImageCreateRequest,
        @UploadedFile() img: Express.Multer.File
    ): Promise<WebResponse<ImageResponse>>{

        const image = await this.imageService.create(komikId, chapter, req, img)
        return {
            statusCode: 201,
            message: 'create image success',
            data: image
        }
    }

    @Delete()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiHeader({name: 'Authorization', description: 'accessToken'})
    async delete(
        @Param('komikId', ParseIntPipe) komikId: number,
        @Param('chapter', ParseIntPipe) chapter: number,
    ): Promise<WebResponse<boolean>> {
        await this.imageService.delete(komikId, chapter)
        return {
            statusCode: 200,
            message: 'delete image success',
            data: true
        }
    }

}