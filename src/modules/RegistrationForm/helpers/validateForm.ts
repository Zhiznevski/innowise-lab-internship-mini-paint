import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must have at least 4 symbols')
    .required('Enter an username'),
  email: yup.string().email().required('Enter an email'),
  password: yup
    .string()
    .password()
    .minNumbers(1, 'Password must have at least 1 digit')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .required('Enter a password'),
});

export type RegisterValidationSchemaType = yup.InferType<typeof registerValidationSchema>;
