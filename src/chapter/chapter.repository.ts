import { Injectable } from "@nestjs/common";
import { Chapter } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { ChapterCreateRequest, ChapterUpdateRequest } from "src/model/chapter.model";

@Injectable()
export class ChapterRepository {
    constructor(private readonly prismaService: PrismaService){}

    async findMany(komikId: number): Promise<Chapter[]> {
        return this.prismaService.chapter.findMany({
            where:{
                comikId: komikId
            }
        })
    }

    async findFirst(chap: number): Promise<Chapter> {
        return this.prismaService.chapter.findFirst({
            where:{
                chapter: chap
            }
        })
    }

    async count(chapter: number): Promise<number> {
        return this.prismaService.chapter.count({
            where:{
                chapter: chapter
            }
        })
    }

    async create(req: ChapterCreateRequest): Promise<Chapter> {
        return this.prismaService.chapter.create({
            data: req
        })
    }

    async update(req: ChapterUpdateRequest): Promise<Chapter>{
        return this.prismaService.chapter.update({
            where:{
                id: req.id
            },
            data: req
        })
    }

    async delete(chapterId: number): Promise<Chapter>{
        await this.prismaService.image.deleteMany({
            where:{
                chapterId: chapterId
            }
        })
        return this.prismaService.chapter.delete({
            where:{
                id: chapterId
            },
            include:{
                Image: true
            }
        })
    } 
}