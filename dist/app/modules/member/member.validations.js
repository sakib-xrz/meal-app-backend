"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
            .min(1, 'Name is required'),
        phone: zod_1.z
            .string({
            required_error: 'Phone is required',
            invalid_type_error: 'Phone must be a string',
        })
            .min(1, 'Phone is required')
            .regex(/^[+\d]+$/, 'Phone must be a number')
            .max(15, 'Phone must not exceed 15 digits'),
    }),
});
const EditMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
            .min(1, 'Name is required')
            .optional(),
        phone: zod_1.z
            .string({
            required_error: 'Phone is required',
            invalid_type_error: 'Phone must be a string',
        })
            .min(1, 'Phone is required')
            .regex(/^[+\d]+$/, 'Phone must be a number')
            .max(15, 'Phone must not exceed 15 digits')
            .optional(),
    }),
});
const MemberValidations = {
    CreateMemberSchema,
    EditMemberSchema,
};
exports.default = MemberValidations;
