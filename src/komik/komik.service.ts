import { HttpException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ValidationService } from "src/common/validation.service";
import { Logger } from "winston";
import { KomikRepository } from "./komik.repository";
import { KomikCreateRequest, KomikResponse, KomikUpdateRequest } from "src/model/komik.model";
import { KomikValidation } from "./komik.validation";
import { Pagination } from "src/model/web.model";

@Injectable()
export class KomikService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private validationService: ValidationService,
        private komikRepository: KomikRepository,
    ){}

    async create(req: KomikCreateRequest): Promise<KomikResponse>{
        this.logger.info(`create comic ${JSON.stringify(req)}`)
        await this.validationService.validate(KomikValidation.CREATE, req)
        const komik = await this.komikRepository.create(req)
        return {
            id: komik.id,
            title: komik.title,
            author: komik.author,
            description: komik.description,
            createdAt: komik.createdAt,
            updatedAt: komik.updatedAt
        }
    }

    async findUnique(id: number): Promise<KomikResponse>{
        this.logger.info(`get comic by id ${JSON.stringify(id)}`)

        const komik = await this.komikRepository.findUnique(id)
        if (!komik){
            throw new NotFoundException()
        }
        return {
            id: komik.id,
            title: komik.title,
            author: komik.author,
            description: komik.description,
            createdAt: komik.createdAt,
            updatedAt: komik.updatedAt
        }
    }

    async update(id: number, req: KomikUpdateRequest): Promise<KomikResponse> {
        this.logger.info(`update komik ${JSON.stringify(req)}`)
        const count = await this.komikRepository.count(id)
        if(count === 0){
            throw new HttpException('komik not found', 404)
        }
        const updateRequest: KomikUpdateRequest = this.validationService.validate(KomikValidation.UPDATE, req)
        const komik = await this.komikRepository.update(count, updateRequest)

        return {
            id: komik.id,
            title: komik.title,
            author: komik.author,
            description: komik.description,
            createdAt: komik.createdAt,
            updatedAt: komik.updatedAt
        }
    }

    async delete(id: number): Promise<void> {
        await this.komikRepository.delete(id)
    }

    async findMany(page: number, pageSize: number): Promise<KomikResponse[]> {
        this.logger.info(`get komik ${JSON.stringify(page)} ${JSON.stringify(pageSize)}`)
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