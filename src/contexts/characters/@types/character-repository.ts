import { ICharacter } from './character'

export interface CharacterRepository<T = ICharacter> {
    findBy(filter: Partial<T & { page: number; limit: number }>): Promise<T[]>
    findOneBy(filter: Partial<T>): Promise<T | null>
    create(characters: T | T[]): Promise<void>
    updateOne(filter: Partial<T>, character: Partial<T>): Promise<void>
    delete(): Promise<void>
}
