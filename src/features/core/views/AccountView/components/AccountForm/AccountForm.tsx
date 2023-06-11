import { Form, Formik, FormikConfig } from "formik";
import { Box, Grid } from "@mui/material";
import TextFieldFormik from "components/formik/TextFieldFormik";

import Button from "components/Button";
import yup from "common/yup/yup";

const validationSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  city: yup.string().required(),
  postalCode: yup.string().required(),
  street: yup.string().required(),
  streetNumber: yup.string().required(),
  phone: yup
    .string()
    .test({
      name: "is-digit",
      skipAbsent: true,
      test: (value, ctx) => {
        if (!value) return true;
        const regexp = new RegExp("^[0-9]*$"); // only digits

        return regexp.test(value);
      },
      message: "Niepoprawny telefon",
    })
    .min(9)
    .max(9)
    .required(),
});

export interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  city: string;
  postalCode: string;
  street: string;
  streetNumber: string;
  phone: number;
}

const initial: RegisterFormValues = {
  name: "",
  surname: "",
  email: "",
  city: "",
  postalCode: "",
  street: "",
  streetNumber: "",
  phone: 0,
};

export interface AccountFormProps {
  initialValues?: RegisterFormValues & { __typename?: "UserType" | undefined };
  onSubmit: FormikConfig<RegisterFormValues>["onSubmit"];
  extra?: React.ReactNode;
  loading?: boolean;
}

const AccountForm = ({
  initialValues = initial,
  onSubmit,
  extra,
  loading,
}: AccountFormProps) => {
  const { __typename, ...rest } = { ...initialValues };

  return (
    <Formik
      initialValues={rest}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="name"
              type="text"
              id="name"
              label={"Imię"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="surname"
              type="text"
              id="surname"
              label={"Nazwisko"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="email"
              type="text"
              id="email"
              label={"Email"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="city"
              type="text"
              id="city"
              label={"Miasto"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="postalCode"
              type="text"
              id="postalCode"
              label={"kod pocztowy"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="street"
              type="text"
              id="street"
              label={"Ulica"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="streetNumber"
              type="text"
              id="streetNumber"
              label={"Numer mieszkania"}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextFieldFormik
              name="phone"
              type="text"
              id="phone"
              label={"Telefon"}
              fullWidth
              disabled={loading}
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" type="submit" isLoading={loading}>
            {"aktualizuj konto"}
          </Button>
        </Box>
        {extra && (
          <Box mt={2} display="flex" justifyContent="center">
            {extra}
          </Box>
        )}
      </Form>
    </Formik>
  );
};

export default AccountForm;
