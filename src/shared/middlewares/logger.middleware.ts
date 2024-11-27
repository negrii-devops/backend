import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP', {
        timestamp: false,
    })

    use(req: Request, res: Response, next: NextFunction): void {
        const now = Date.now()

        res.on('finish', () => {
            const { method, url, hostname } = req
            const { statusCode } = res
            const time = `${Date.now() - now}ms`

            const msg = `${method} - ${statusCode} - ${url} - ${hostname} - ${time}`

            if (statusCode < 400) {
                this.logger.log(msg)
            } else if (statusCode < 500) {
                this.logger.warn(msg)
            } else {
                this.logger.error(msg)
            }
        })

        next()
    }
}
