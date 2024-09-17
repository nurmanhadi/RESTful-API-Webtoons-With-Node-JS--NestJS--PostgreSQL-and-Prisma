import { Injectable } from "@nestjs/common";
import { Comic } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { KomikCreateRequest, KomikUpdateRequest } from "src/model/komik.model";

@Injectable()
export class KomikRepository {
    constructor(private readonly prismaService: PrismaService){}

    async count(id: number): Promise<number>{
        return this.prismaService.comic.count({
            where:{
                id: id
            }
        })
    }

    async create(req: KomikCreateRequest): Promise<Comic>{
        return this.prismaService.comic.create({
            data: req
        })
    }

    async findUnique(id: number): Promise<Comic>{
        return this.prismaService.comic.findUnique({
            where:{
                id: id
            }
        })
    }

    async update(id: number, req: KomikUpdateRequest): Promise<Comic> {
        return this.prismaService.comic.update({
            where:{
                id: id
            },
            data: req
        })
    }

    async delete(id: number): Promise<Comic> {
        return this.prismaService.comic.delete({
            where:{
                id: id
            }
        })
    }

    async findMany(page: number, pageSize: number): Promise<Comic[]>{
        return this.prismaService.comic.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
    }

    async counts(): Promise<number> {
        return this.prismaService.comic.count()
    }

}