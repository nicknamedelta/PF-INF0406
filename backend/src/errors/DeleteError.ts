import { HttpStatus } from "@nestjs/common";

export const DeleteError = (error, context) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        error: `Cannot delete the the ${context}. See the details to understand this error.`,
        details: {
            code: error.code,
            version: error.clientVersion,
            fields: error.meta.target,
            context,
        },
    };
};

