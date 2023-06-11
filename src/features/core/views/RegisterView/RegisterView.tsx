import { useMutation } from "@apollo/client";
import { Box, Grid, Typography } from "@mui/material";
import { gql } from "__generated__";
import { PATHS_CORE } from "common/constants/paths";
import yup from "common/yup";
import HelmetDecorator from "components/HelmetDecorator";
import TextFieldFormik from "components/formik/TextFieldFormik";
import { Formik, Form } from "formik";
import CoreViewsLayout from "layouts/CoreViewLayout";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Button from "components/Button";

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
  password: yup
    .string()
    .oneOf([yup.ref("repeatedRassword")], "Różne hasła")
    .required(),
  repeatedRassword: yup
    .string()
    .oneOf([yup.ref("password")], "Różne hasła")
    .required(),
});

interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  city: string;
  postalCode: string;
  street: string;
  streetNumber: string;
  phone: string;
  password: string;
  repeatedRassword: string;
}

const initialValues: RegisterFormValues = {
  name: "",
  surname: "",
  email: "",
  city: "",
  postalCode: "",
  street: "",
  streetNumber: "",
  phone: "",
  password: "",
  repeatedRassword: "",
};

const REGISTER = gql(/* GraphQL */ `
  mutation Register($registerCredentials: RegisterCredentialsInput!) {
    register(registerCredentials: $registerCredentials) {
      message
    }
  }
`);
const RegisterView = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted(data) {
      const { message } = data.register;
      enqueueSnackbar(message, { variant: "success" });
      navigate(PATHS_CORE.LOGIN);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleSubmit = ({
    repeatedRassword,
    password,
    ...values
  }: RegisterFormValues) => {
    register({
      variables: {
        registerCredentials: {
          password,
          data: { ...values, phone: +values.phone },
        },
      },
    });
  };

  return (
    <>
      <HelmetDecorator title={"strona rejestracji"} />

      <CoreViewsLayout title={"Załóż konto"} maxWidth="1000px">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/* below `isSubmitting` will be always true and will never get false because `handleSubmit` is not async (does not return promise to be solved/rejected) */}
          {/* {({ isSubmitting }) => ( */}
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="name"
                  type="text"
                  id="name"
                  label={"Imię"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="surname"
                  type="text"
                  id="surname"
                  label={"Nazwisko"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="email"
                  type="text"
                  id="email"
                  label={"Email"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="city"
                  type="text"
                  id="city"
                  label={"Miasto"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="postalCode"
                  type="text"
                  id="postalCode"
                  label={"kod pocztowy"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="street"
                  type="text"
                  id="street"
                  label={"Ulica"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="streetNumber"
                  type="text"
                  id="streetNumber"
                  label={"Numer mieszkania"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="phone"
                  type="text"
                  id="phone"
                  label={"Telefon"}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="password"
                  type="password"
                  id="password"
                  label={"Hasło"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextFieldFormik
                  name="repeatedRassword"
                  type="password"
                  id="repeatedRassword"
                  label={"powtórz hasło"}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Box mr={2}>
                <Typography
                  component={Link}
                  to={PATHS_CORE.LOGIN}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    textDecoration: "none",
                  }}
                >
                  zaloguj się
                </Typography>
              </Box>
              <Button variant="contained" type="submit" isLoading={loading}>
                {"Załóż konto"}
              </Button>
            </Box>
          </Form>
          {/* )} */}
        </Formik>
      </CoreViewsLayout>
    </>
  );
};

export default RegisterView;
