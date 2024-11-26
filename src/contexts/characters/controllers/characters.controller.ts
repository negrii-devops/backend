import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common'
import { CharactersRepositoryImpl } from '../repositories/characters.repository-impl'
import { ICharacter } from '../@types/character'

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersRepository: CharactersRepositoryImpl) {}

    @Get('')
    async find(): Promise<ICharacter[]> {
        return await this.charactersRepository.findBy({})
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ICharacter> {
        const character = await this.charactersRepository.findOneBy({ id })
        if (!character) {
            throw new NotFoundException('Character not found')
        }

        return character
    }
}
