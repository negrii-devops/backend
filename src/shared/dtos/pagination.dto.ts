import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class PaginationDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1

    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly limit: number = 10
}
