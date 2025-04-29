"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        member_id: zod_1.z
            .string({
            required_error: 'Member ID is required',
            invalid_type_error: 'Member ID must be a string',
        })
            .uuid('Member ID must be a valid UUID'),
        date: zod_1.z
            .string({
            required_error: 'Date is required',
            invalid_type_error: 'Date must be a string',
        })
            .date('Date must be a valid date string'),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
            invalid_type_error: 'Quantity must be a number',
        })
            .min(1, 'Quantity must be at least 1'),
    }),
});
const EditMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        member_id: zod_1.z
            .string({
            required_error: 'Member ID is required',
            invalid_type_error: 'Member ID must be a string',
        })
            .uuid('Member ID must be a valid UUID')
            .optional(),
        date: zod_1.z
            .string({
            required_error: 'Date is required',
            invalid_type_error: 'Date must be a string',
        })
            .date('Date must be a valid date string')
            .optional(),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
            invalid_type_error: 'Quantity must be a number',
        })
            .min(1, 'Quantity must be at least 1')
            .optional(),
    }),
});
const MealValidations = {
    CreateMealSchema,
    EditMealSchema,
};
exports.default = MealValidations;
