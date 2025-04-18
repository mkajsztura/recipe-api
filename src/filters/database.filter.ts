import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';
import {PostgresError} from 'pg-error-enum'

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode = HttpStatus.BAD_REQUEST;
        let message = 'Database Error';

        if (exception instanceof QueryFailedError) {
            if (exception.driverError?.code === PostgresError.UNIQUE_VIOLATION) {
                statusCode = HttpStatus.CONFLICT;
                message = 'Duplicate entry';
            }
        }

        response.status(statusCode).json({
            statusCode,
            message,
        });
    }

}
