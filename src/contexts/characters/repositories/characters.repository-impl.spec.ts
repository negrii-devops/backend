import { Test, TestingModule } from '@nestjs/testing'

import { CharactersRepositoryImpl } from './characters.repository-impl'

describe('CharactersRepositoryImpl', () => {
    let service: CharactersRepositoryImpl

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CharactersRepositoryImpl],
        }).compile()

        service = module.get<CharactersRepositoryImpl>(CharactersRepositoryImpl)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
