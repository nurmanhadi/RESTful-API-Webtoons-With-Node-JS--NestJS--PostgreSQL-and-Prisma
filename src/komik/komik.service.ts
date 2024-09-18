import { HttpException, Inject, Injectable, Next, NotFoundException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ValidationService } from "src/common/validation.service";
import { Logger } from "winston";
import { KomikRepository } from "./komik.repository";
import { KomikCreateRequest, KomikResponse, KomikUpdateRequest } from "src/model/komik.model";
import { KomikValidation } from "./komik.validation";
import { Pagination } from "src/model/web.model";
import { Express } from "express";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class KomikService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private validationService: ValidationService,
        private komikRepository: KomikRepository,
    ){}

    async create(avatar: Express.Multer.File, req: KomikCreateRequest): Promise<KomikResponse>{
        const filename = `${Date.now()}-${avatar.originalname}`
        const destination = path.join('public', 'avatars', filename)

        req.avatar = filename
        const komikRequest: KomikCreateRequest = await this.validationService.validate(KomikValidation.CREATE, req)
        await fs.promises.writeFile(destination, avatar.buffer)
        const komik = await this.komikRepository.create(komikRequest)
        return komik
    }

    async findUnique(id: number): Promise<KomikResponse>{
        const komik = await this.komikRepository.findUnique(id)
        if (!komik){
            throw new NotFoundException()
        }
        return komik
    }

    async update(id: number, req: KomikUpdateRequest, avatar: Express.Multer.File): Promise<KomikResponse> {
        const count = await this.komikRepository.count(id)
        if(count === 0){
            throw new HttpException('komik not found', 404)
        }

        let filename: string | undefined;
        if (avatar) {
            filename = `${Date.now()}-${avatar.originalname}`;
            const destination = path.join('public', 'avatars', filename);

            const getAvatar = await this.komikRepository.findUnique(id);
            const currentFilename = getAvatar.avatar;
            const currentDestination = path.join('public', 'avatars', currentFilename);

            if (fs.existsSync(currentDestination)) {
                try {
                    await fs.promises.unlink(currentDestination);
                } catch (error) {
                    console.error('Gagal menghapus file:', error);
                }
            } else {
                console.log('File tidak ditemukan, lanjutkan operasi.');
            }
            await fs.promises.writeFile(destination, avatar.buffer);
            req.avatar = filename;
        }

        req.updatedAt = new Date()
        const updateRequest: KomikUpdateRequest = this.validationService.validate(KomikValidation.UPDATE, req)
        const komik = await this.komikRepository.update(id, updateRequest)
        return komik
    }

    async delete(id: number): Promise<void> {
        await this.komikRepository.delete(id)
    }

    async findMany(page: number, pageSize: number): Promise<KomikResponse[]> {
        const komiks = await this.komikRepository.findMany(page, pageSize)
        return komiks
    }

    async counts(): Promise<number>{
        return this.komikRepository.counts()
    }

    async pagination(page: number, pageSize: number): Promise<Pagination> {
        const totalkomik = await this.komikRepository.counts()
        const totalPages = Math.ceil(totalkomik / pageSize)

        if(page > totalPages || page < 1){
            throw new NotFoundException()
        }
        
        return {
            totalCount: totalkomik,
            totalPage: totalPages,
            currentPage: page
        }
    }

}