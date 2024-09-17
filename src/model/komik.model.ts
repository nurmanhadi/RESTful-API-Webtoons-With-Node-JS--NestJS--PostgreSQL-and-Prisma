
export class KomikResponse {
    id?: number
    title: string
    author: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export class KomikCreateRequest {
    title: string
    author: string
    description?: string
}
export class KomikUpdateRequest {
    title: string
    author: string
    description?: string
    updatedAt?: Date
}

