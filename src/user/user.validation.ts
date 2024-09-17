import { Injectable } from "@nestjs/common";
import { z, ZodType } from "zod";

@Injectable()
export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(100)
    })
    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(100)
    })
}