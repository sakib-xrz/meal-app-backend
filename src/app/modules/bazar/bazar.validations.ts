import { z } from 'zod';

const CreateBazarSchema = z.object({
  body: z.object({
    purchased_by: z
      .string({
        required_error: 'Purchased by is required',
        invalid_type_error: 'Purchased by must be a string',
      })
      .uuid('Purchased by must be a valid UUID'),
    date: z
      .string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      })
      .date('Date must be a valid date string'),
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .min(0, 'Amount must be a positive number'),
    description: z.string().optional(),
  }),
});

const EditBazarSchema = z.object({
  body: z.object({
    purchased_by: z
      .string({
        required_error: 'Purchased by is required',
        invalid_type_error: 'Purchased by must be a string',
      })
      .uuid('Purchased by must be a valid UUID')
      .optional(),
    date: z
      .string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      })
      .date('Date must be a valid date string')
      .optional(),
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .min(0, 'Amount must be a positive number')
      .optional(),
    description: z.string().optional(),
  }),
});

const BazarValidations = {
  CreateBazarSchema,
  EditBazarSchema,
};

export default BazarValidations;
