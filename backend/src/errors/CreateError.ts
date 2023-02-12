import { HttpStatus } from "@nestjs/common";

export const CreateError = (error, context) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        error: `Cannot create the ${context}. See the details to understand this error.`,
        details: {
            code: error.code,
            version: error.clientVersion,
            fields: error.meta.target,
            context,
        },
    };
};

