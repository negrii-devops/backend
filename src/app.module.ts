import { Module } from '@nestjs/common'

import { CharactersModule } from './contexts/characters/characters.module'
import { MongooseModule } from '@nestjs/mongoose'

const MONGO_URL = 'mongodb://root:example@localhost:27017/rick-and-morty?authSource=admin'

@Module({
    imports: [MongooseModule.forRoot(MONGO_URL), CharactersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
