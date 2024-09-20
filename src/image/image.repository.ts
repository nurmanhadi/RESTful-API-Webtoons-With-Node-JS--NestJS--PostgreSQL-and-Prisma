import { Injectable } from "@nestjs/common";
import { Image } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { ImageCreateRequest } from "src/model/image.model";

@Injectable()
export class ImageRepository {
    constructor(
        private prismaService: PrismaService,
    ){}

    async createImage(req: ImageCreateRequest): Promise<Image> {
        return this.prismaService.image.create({
            data: req
        })
    }

    async deleteImage(chapterId: number, currentChapter: number): Promise<void> {
        await this.prismaService.image.deleteMany({
            where:{
                chapterId: chapterId,
                currentChapter: currentChapter
            }
        })
    }
}