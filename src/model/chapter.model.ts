export class ChapterResponse {
    id: number
    comikId: number
    chapter: number
    createdAt: Date
    updatedAt: Date
}

export class ChapterCreateRequest {
    comikId: number
    chapter: number
}
export class ChapterUpdateRequest {
    id: number
    comikId: number
    chapter: number
    updateAt: Date
}
