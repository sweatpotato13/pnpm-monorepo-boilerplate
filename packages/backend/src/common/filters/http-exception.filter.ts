import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from "@nestjs/common";
import { logger } from "@src/config/modules/winston";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = exception.getStatus();

        logger.error(`Error: ${JSON.stringify(exception.getResponse())}`);
        response.status(statusCode).json({
            statusCode,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
}
