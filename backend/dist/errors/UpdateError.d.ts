import { HttpStatus } from "@nestjs/common";
export declare const UpdateError: (error: any, context: any) => {
    status: HttpStatus;
    error: string;
    details: {
        code: any;
        version: any;
        fields: any;
        context: any;
    };
};
