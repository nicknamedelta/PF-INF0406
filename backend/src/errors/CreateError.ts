import { HttpStatus } from "@nestjs/common";
import { NON_MAPPED_ERRORS, PRISMA_ERRORS } from "./constants";

export const CreateError = (error, context) => {
    let description;

    const { code, meta } = error || {};
    const { target: fields } = meta || {};

    if (error.code && PRISMA_ERRORS.hasOwnProperty(error.code)) {
        description = `${PRISMA_ERRORS[`${error.code}`]}`;
    }

    return {
        status: HttpStatus.BAD_REQUEST,
        error: `Cannot create the ${context}. See the details below to understand this error.`,
        details: {
            code,
            fields,
            description: description || NON_MAPPED_ERRORS,
            context,
        },
    };
};

