import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ImageService } from "./image.service";
import { AuthGuard } from "src/auth/auth.guard";
import { WebResponse } from "src/model/web.model";
import { ImageCreateRequest, ImageResponse } from "src/model/image.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('images')
@Controller('api/komiks/:komikId/chapters/:chapterId/images')
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
        @Param('chapterId', ParseIntPipe) chapterId: number,
        @Body() req: ImageCreateRequest,
        @UploadedFile() img: Express.Multer.File
    ): Promise<WebResponse<ImageResponse>>{

        const image = await this.imageService.create(komikId, chapterId, req, img)
        return {
            statusCode: 201,
            message: 'create image success',
            data: image
        }
    }

}