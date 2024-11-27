import { MiddlewareConsumer, Module } from '@nestjs/common'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'node:path'
import { CharactersModule } from './contexts/characters/characters.module'
import configuration, { EnvVar } from './shared/config/configuration'
import { MongoModule } from './shared/config/mongo.module'
import { LoggingMiddleware } from './shared/middlewares/logger.middleware'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../uploads'),
            serveRoot: '/api/v1/assets',
        }),
        MongoModule,
        CharactersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    static port: number

    constructor(private readonly configService: ConfigService<EnvVar>) {
        AppModule.port = this.configService.get<number>('PORT')
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*')
    }
}
