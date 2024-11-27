import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Character } from '../character.schema'
import { ICharacter } from '../@types/character'
import { CharacterRepository } from '../@types/character-repository'

@Injectable()
export class CharactersRepositoryImpl implements CharacterRepository {
    constructor(@InjectModel(Character.name) private readonly characterModel: Model<Character>) {}

    async findBy(
        filter: Partial<ICharacter & { page: number; limit: number }>,
    ): Promise<ICharacter[]> {
        const { page, limit, ...rest } = filter

        const query = this.characterModel.find(rest)

        if (page && limit) {
            const skip = (page - 1) * limit

            query.skip(skip)
            query.limit(limit)
        }

        return await query.select('-__v').lean().exec()
    }

    async findOneBy(filter: Partial<ICharacter>): Promise<ICharacter | null> {
        const data = await this.characterModel.findOne(filter).select('-__v').lean().exec()
        if (!data) return null

        return data
    }

    async create(character: ICharacter | ICharacter[]): Promise<void> {
        await this.characterModel.create(character)
    }

    async updateOne(filter: Partial<ICharacter>, character: Partial<ICharacter>): Promise<void> {
        await this.characterModel.updateOne(filter, character)
    }

    async delete(): Promise<void> {
        await this.characterModel.deleteMany({})
    }
}
