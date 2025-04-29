import { z } from 'zod';

const CreateMemberSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required'),
    phone: z
      .string({
        required_error: 'Phone is required',
        invalid_type_error: 'Phone must be a string',
      })
      .min(1, 'Phone is required')
      .regex(/^[+\d]+$/, 'Phone must be a number')
      .max(15, 'Phone must not exceed 15 digits'),
  }),
});

const EditMemberSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required')
      .optional(),
    phone: z
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

export default MemberValidations;
