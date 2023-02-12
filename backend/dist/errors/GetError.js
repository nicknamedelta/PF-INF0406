"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetError = void 0;
const common_1 = require("@nestjs/common");
const GetError = (error, context) => {
    return {
        status: common_1.HttpStatus.BAD_REQUEST,
        error: `Cannot get the ${context}. See the details to understand this error.`,
        details: {
            code: error.code,
            version: error.clientVersion,
            fields: error.meta.target,
            context,
        },
    };
};
exports.GetError = GetError;
//# sourceMappingURL=GetError.js.map