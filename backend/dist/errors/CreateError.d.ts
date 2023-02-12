import { HttpStatus } from "@nestjs/common";
export declare const CreateError: (error: any, context: any) => {
    status: HttpStatus;
    error: string;
    details: {
        code: any;
        version: any;
        fields: any;
        context: any;
    };
};
