import { z } from 'zod';

const CreateMealSchema = z.object({
  body: z.object({
    member_id: z
      .string({
        required_error: 'Member ID is required',
        invalid_type_error: 'Member ID must be a string',
      })
      .uuid('Member ID must be a valid UUID'),
    date: z
      .string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      })
      .date('Date must be a valid date string'),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .min(1, 'Quantity must be at least 1'),
  }),
});

const EditMealSchema = z.object({
  body: z.object({
    member_id: z
      .string({
        required_error: 'Member ID is required',
        invalid_type_error: 'Member ID must be a string',
      })
      .uuid('Member ID must be a valid UUID')
      .optional(),
    date: z
      .string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      })
      .date('Date must be a valid date string')
      .optional(),
    quantity: z
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

export default MealValidations;
