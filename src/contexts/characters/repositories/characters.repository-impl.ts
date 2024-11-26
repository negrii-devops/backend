import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Character } from '../character.schema'
import { ICharacter } from '../@types/character'
import { CharacterRepository } from '../@types/character-repository'

@Injectable()
export class CharactersRepositoryImpl implements CharacterRepository {
    constructor(@InjectModel(Character.name) private readonly characterModel: Model<Character>) {}

    async findBy(filter: Partial<ICharacter>): Promise<ICharacter[]> {
        return await this.characterModel.find(filter)
    }

    async findOneBy(filter: Partial<ICharacter>): Promise<ICharacter | null> {
        return await this.characterModel.findOne(filter).lean().exec()
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
