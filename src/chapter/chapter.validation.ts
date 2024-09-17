import { Injectable } from "@nestjs/common";
import { z, ZodType } from "zod";

Injectable()
export class ChapterValidation {
    static readonly CREATE: ZodType = z.object({
        comikId: z.number(),
        chapter: z.number()
    })
    static readonly UPDATE: ZodType = z.object({
        id: z.number(),
        chapter: z.number()
    })
}