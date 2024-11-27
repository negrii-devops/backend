import { ConflictException, Controller, Post } from '@nestjs/common'
import axios from 'axios'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { CharactersRepositoryImpl } from '../repositories/characters.repository-impl'
import { ICharacter } from '../@types/character'

@Controller('sync-characters')
export class SyncCharactersController {
    constructor(private readonly charactersRepository: CharactersRepositoryImpl) {}

    @Post('')
    async excute() {
        await this.charactersRepository.delete()

        const URL = 'https://rickandmortyapi.com/api/character'
        let page = 1

        while (page) {
            const response = await axios.get<CharactersResponse>(`${URL}?page=${page}`)

            if (response.status !== 200) {
                throw new ConflictException('Error fetching characters')
            }

            console.log(`Character page ${page} of ${response.data.info.pages}`)

            page = response.data.info.next ? page + 1 : null

            const charactersPromise = response.data.results.map(async (character) => {
                const item: ICharacter = {
                    id: character.id.toString(),
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    type: character.type,
                    gender: character.gender,
                    origin: {
                        id: character.origin.url.split('/').pop(),
                        name: character.origin.name,
                    },
                    location: {
                        id: character.location.url.split('/').pop(),
                        name: character.location.name,
                    },
                    avatar: character.image.split('/').pop(),
                    episode: character.episode.map((episode) => episode.split('/').pop()),
                    createdAt: new Date(character.created),
                    updatedAt: new Date(character.created),
                }

                await this.storeImage(character.image, item.id)

                return item
            })

            const characters = await Promise.all(charactersPromise)

            await this.charactersRepository.create(characters)
        }
    }

    private async storeImage(imageUrl: string, characterId: string) {
        try {
            const response = await axios.get(imageUrl, {
                responseType: 'arraybuffer',
            })

            if (response.status !== 200) {
                throw new Error('Error fetching image')
            }

            const filePath = join(
                __dirname,
                '../../../../uploads/characters/',
                `${characterId}.jpeg`,
            )

            await writeFile(filePath, response.data)
        } catch (error) {
            const msg = error instanceof Error ? error.message : error
            console.log(`Error fetching image for character ${characterId}:\n`, msg)
        }
    }
}

export interface CharactersResponse {
    info: ResponseInfo
    results: CharacterItem[]
}

export interface ResponseInfo {
    count: number
    pages: number
    next: string
    prev: null
}

export interface CharacterItem {
    id: number
    name: string
    status: Status
    species: Species
    type: string
    gender: Gender
    origin: Location
    location: Location
    image: string
    episode: string[]
    url: string
    created: Date
}

export enum Gender {
    Female = 'Female',
    Male = 'Male',
    Unknown = 'unknown',
}

export interface Location {
    name: string
    url: string
}

export enum Species {
    Alien = 'Alien',
    Human = 'Human',
}

export enum Status {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown',
}
