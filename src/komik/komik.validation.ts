import { Injectable } from "@nestjs/common";
import { z, ZodType } from "zod";

@Injectable()
export class KomikValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        author: z.string().min(1).max(100),
        description: z.string().optional()
    }) 
    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        author: z.string().min(1).max(100),
        description: z.string().optional(),
        updatedAt: z.date().optional()
    }) 
}