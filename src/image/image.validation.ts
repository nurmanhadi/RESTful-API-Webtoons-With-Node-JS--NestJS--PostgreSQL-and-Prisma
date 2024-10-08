import { z, ZodType } from "zod";

export class ImageValidation {
    static readonly CREATE: ZodType = z.object({
        chapterId: z.number(),
        currentChapter: z.number().optional(),
        url: z.string().min(1).max(100)
    })
}