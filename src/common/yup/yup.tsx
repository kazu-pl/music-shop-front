import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "To pole jest wymagane",
  },

  number: {
    min: (props) => `Minimalna ilość znaków: ${props.min}`,
    max: (props) => `Maksymalna ilość znaków: ${props.max}`,
  },
  string: {
    email: "Nieprawidłowy format emaila",
    min: (props) => `Minimalna ilość znaków: ${props.min}`,
    max: (props) => `Maksymalna ilość znaków: ${props.max}`,
  },
});
export default yup;
export type Yup = typeof yup;
