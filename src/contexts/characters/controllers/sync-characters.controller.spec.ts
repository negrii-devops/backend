import { Test, TestingModule } from '@nestjs/testing'
import { SyncCharactersController } from './sync-characters.controller'

describe('SyncCharactersController', () => {
    let controller: SyncCharactersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SyncCharactersController],
        }).compile()

        controller = module.get<SyncCharactersController>(SyncCharactersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
