import { HttpStatus } from "@nestjs/common";
export declare const DeleteError: (error: any, context: any) => {
    status: HttpStatus;
    error: string;
    details: {
        code: any;
        version: any;
        fields: any;
        context: any;
    };
};
