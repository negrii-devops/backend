import { Controller, Get, NotFoundException, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { PaginationDto } from 'src/shared/dtos/pagination.dto'
import { ICharacter } from '../@types/character'
import { CharactersRepositoryImpl } from '../repositories/characters.repository-impl'

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersRepository: CharactersRepositoryImpl) {}

    @Get('avatar/:filename')
    async avatar(@Param('filename') filename: string, @Res() res: Response) {
        const avatarPath = path.join(__dirname, '../../../../uploads/characters', filename)

        const exists = fs.existsSync(avatarPath)
        if (!exists) {
            throw new NotFoundException('Avatar not found')
        }

        res.sendFile(avatarPath)
    }

    @Get('')
    async find(@Query() pagination: PaginationDto): Promise<ICharacter[]> {
        console.log(pagination)
        return await this.charactersRepository.findBy({ ...pagination })
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ICharacter> {
        const character = await this.charactersRepository.findOneBy({ id })
        if (!character) {
            throw new NotFoundException('Character not found')
        }

        return character
    }
}
