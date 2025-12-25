import * as Yup from 'yup';

export const accountSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('This field is required'),
});
