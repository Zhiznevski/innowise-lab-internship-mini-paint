import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const schema = yup.object().shape({
  email: yup.string().email().required('Enter an email'),
  password: yup
    .string()
    .password()
    .minNumbers(1, 'Password must have at least 1 digit')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .required('Enter a password'),
});

export const registerValidationSchema = schema.shape({
  username: yup
    .string()
    .min(4, 'Username must have at least 4 symbols')
    .required('Enter an username'),
});

export const loginValidationSchema = schema;

export type RegisterValidationSchemaType = yup.InferType<typeof registerValidationSchema>;
export type LoginValidationSchemaType = yup.InferType<typeof loginValidationSchema>;
