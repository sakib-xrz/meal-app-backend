"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateBazarSchema = zod_1.z.object({
    body: zod_1.z.object({
        purchased_by: zod_1.z
            .string({
            required_error: 'Purchased by is required',
            invalid_type_error: 'Purchased by must be a string',
        })
            .uuid('Purchased by must be a valid UUID'),
        date: zod_1.z
            .string({
            required_error: 'Date is required',
            invalid_type_error: 'Date must be a string',
        })
            .date('Date must be a valid date string'),
        amount: zod_1.z
            .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
            .min(0, 'Amount must be a positive number'),
        description: zod_1.z.string().optional(),
    }),
});
const EditBazarSchema = zod_1.z.object({
    body: zod_1.z.object({
        purchased_by: zod_1.z
            .string({
            required_error: 'Purchased by is required',
            invalid_type_error: 'Purchased by must be a string',
        })
            .uuid('Purchased by must be a valid UUID')
            .optional(),
        date: zod_1.z
            .string({
            required_error: 'Date is required',
            invalid_type_error: 'Date must be a string',
        })
            .date('Date must be a valid date string')
            .optional(),
        amount: zod_1.z
            .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
            .min(0, 'Amount must be a positive number')
            .optional(),
        description: zod_1.z.string().optional(),
    }),
});
const BazarValidations = {
    CreateBazarSchema,
    EditBazarSchema,
};
exports.default = BazarValidations;
