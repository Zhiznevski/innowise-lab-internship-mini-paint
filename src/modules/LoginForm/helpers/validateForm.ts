import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required('Enter an email'),
  password: yup
    .string()
    .password()
    .minNumbers(1, 'Password must have at least 1 digit')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .minSymbols(1, 'Password must have at least 1 special symbol(%,&,@ etc)')
    .required('Enter a password'),
});

export type LoginValidationSchemaType = yup.InferType<typeof loginValidationSchema>;
