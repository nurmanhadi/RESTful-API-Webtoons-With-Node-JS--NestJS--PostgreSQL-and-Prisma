import { z, ZodType } from "zod";

export class ImageValidation {
    static readonly CREATE: ZodType = z.object({
        url: z.string().min(1).max(100),
        pageNumber: z.number().min(1)
    })
}