export interface ICharacter {
    id: string
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: {
        id: string
        name: string
    }
    location: {
        id: string
        name: string
    }
    avatar: string
    episode: string[]
    createdAt: Date
    updatedAt: Date
}
