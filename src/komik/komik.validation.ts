import { Injectable } from "@nestjs/common";
import { z, ZodType } from "zod";

@Injectable()
export class KomikValidation {
    static readonly CREATE: ZodType = z.object({
        avatar: z.string().min(1).max(255).optional(),
        title: z.string().min(1).max(100),
        author: z.string().min(1).max(100),
        description: z.string().optional()
    }) 
    static readonly UPDATE: ZodType = z.object({
        avatar: z.string().min(1).max(255).optional(),
        title: z.string().min(1).max(100).optional(),
        author: z.string().min(1).max(100).optional(),
        description: z.string().optional().optional(),
        updatedAt: z.date()
    }) 
}