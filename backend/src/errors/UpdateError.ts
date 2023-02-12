import { HttpStatus } from "@nestjs/common";

export const UpdateError = (error, context) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        error: `Cannot update the ${context}. See the details to understand this error.`,
        details: {
            code: error.code,
            version: error.clientVersion,
            fields: error.meta.target,
            cause: error.meta.cause,
            context,
        },
    };
};

