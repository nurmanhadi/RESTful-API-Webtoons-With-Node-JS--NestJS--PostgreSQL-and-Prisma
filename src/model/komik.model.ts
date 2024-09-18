
export class KomikResponse {
    id?: number
    title: string
    author: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export class KomikCreateRequest {
    avatar: string
    title: string
    author: string
    description?: string
}
export class KomikUpdateRequest {
    avatar?: string
    title?: string
    author?: string
    description?: string
    updatedAt?: Date
}

