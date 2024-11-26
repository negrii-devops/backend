import { ConflictException, Controller, Post } from '@nestjs/common'
import axios from 'axios'

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

            const characters = response.data.results.map((character) => {
                const item: ICharacter = {
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    type: character.type,
                    gender: character.gender,
                    origin: character.origin,
                    location: character.location,
                    image: character.image,
                    episode: character.episode,
                    url: character.url,
                    createdAt: new Date(character.created),
                    updatedAt: new Date(character.created),
                }

                return item
            })

            await this.charactersRepository.create(characters)
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
