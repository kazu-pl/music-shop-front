import { useMutation } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { gql } from "__generated__";
import { saveTokens } from "common/auth/tokens";
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
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LOGIN = gql(/* GraphQL */ `
  mutation Login($loginCredentials: LoginCredentialsInput!) {
    login(loginCredentials: $loginCredentials) {
      accessToken
      refreshToken
    }
  }
`);
const LoginView = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      const { __typename, ...tokens } = data.login;
      saveTokens(tokens);
      navigate(PATHS_CORE.SHOP);
    },
    errorPolicy: "none",
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    login({ variables: { loginCredentials: values } });
  };

  return (
    <>
      <HelmetDecorator title={"strona logowania"} />

      <CoreViewsLayout title={"Zaloguj się"}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/* below `isSubmitting` will be always true and will never get false because `handleSubmit` is not async (does not return promise to be solved/rejected) */}
          {/* {({ isSubmitting }) => ( */}
          <Form>
            <TextFieldFormik
              name="email"
              type="text"
              id="email"
              label={"Email"}
              fullWidth
            />
            <Box pt={2}>
              <TextFieldFormik
                name="password"
                type="password"
                id="password"
                label={"Hasło"}
                fullWidth
              />
            </Box>

            <Box pt={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                type="submit"
                isLoading={loading}
                fullWidth
              >
                {"Zaloguj się"}
              </Button>
            </Box>
            <Box pt={2} display="flex" justifyContent="flex-end">
              <Typography
                component={Link}
                to={PATHS_CORE.REGISTER}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  textDecoration: "none",
                }}
              >
                Zarejestruj się
              </Typography>
            </Box>
          </Form>
          {/* )} */}
        </Formik>
      </CoreViewsLayout>
    </>
  );
};

export default LoginView;
