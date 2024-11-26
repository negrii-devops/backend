import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Character, CharacterSchema } from './character.schema'
import { CharactersController } from './controllers/characters.controller'
import { SyncCharactersController } from './controllers/sync-characters.controller'
import { CharactersRepositoryImpl } from './repositories/characters.repository-impl'

@Module({
    imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])],
    providers: [CharactersRepositoryImpl],
    controllers: [SyncCharactersController, CharactersController],
})
export class CharactersModule {}
