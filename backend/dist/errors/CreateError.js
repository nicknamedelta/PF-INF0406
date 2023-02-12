"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = void 0;
const common_1 = require("@nestjs/common");
const CreateError = (error, context) => {
    return {
        status: common_1.HttpStatus.BAD_REQUEST,
        error: `Cannot create the ${context}. See the details to understand this error.`,
        details: {
            code: error.code,
            version: error.clientVersion,
            fields: error.meta.target,
            context,
        },
    };
};
exports.CreateError = CreateError;
//# sourceMappingURL=CreateError.js.map