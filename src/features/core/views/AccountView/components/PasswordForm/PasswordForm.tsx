import { Form, Formik, FormikConfig } from "formik";
import { Box, Grid } from "@mui/material";
import TextFieldFormik from "components/formik/TextFieldFormik";

import Button from "components/Button";
import yup from "common/yup/yup";

const validationSchema = yup.object({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
  repeatedNewRassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Różne hasła")
    .required(),
});

export interface PaswordFormValues {
  oldPassword: string;
  newPassword: string;
  repeatedNewRassword: string;
}

const initial: PaswordFormValues = {
  oldPassword: "",
  newPassword: "",
  repeatedNewRassword: "",
};

export interface PasswordFormProps {
  onSubmit: FormikConfig<PaswordFormValues>["onSubmit"];
  loading?: boolean;
}

const PasswordForm = ({ onSubmit, loading }: PasswordFormProps) => {
  return (
    <Formik
      initialValues={initial}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldFormik
              name="oldPassword"
              type="password"
              id="password"
              label={"Obecne hasło"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldFormik
              name="newPassword"
              type="password"
              id="newPassword"
              label={"Nowe hasło"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldFormik
              name="repeatedNewRassword"
              type="password"
              id="repeatedNewRassword"
              label={"powtórz nowe hasło"}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" type="submit" isLoading={loading}>
            {"aktualizuj hasło"}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default PasswordForm;
