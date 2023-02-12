"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteError = void 0;
const common_1 = require("@nestjs/common");
const DeleteError = (error, context) => {
    return {
        status: common_1.HttpStatus.BAD_REQUEST,
        error: `Cannot delete the the ${context}. See the details to understand this error.`,
        details: {
            code: error.code,
            version: error.clientVersion,
            fields: error.meta.target,
            context,
        },
    };
};
exports.DeleteError = DeleteError;
//# sourceMappingURL=DeleteError.js.map