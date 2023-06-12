import { Form, Formik, FormikConfig } from "formik";
import { Box } from "@mui/material";
import TextFieldFormik from "components/formik/TextFieldFormik";

import Button from "components/Button";
import yup from "common/yup/yup";
import { GuitarFilterTypeEnum } from "__generated__/graphql";
import filtersMap from "features/admin/data/filtersMap";

import MenuItem from "@mui/material/MenuItem";

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  type: yup.string().required(),
});

export interface FormValues {
  name: string;
  description?: string | null | undefined;
  type: GuitarFilterTypeEnum;
}

export interface GuitarFilterFormProps {
  initialValues: {
    __typename?: "GuitarFilter" | undefined;
    _id: string;
    name: string;
    description?: string | null | undefined;
    type: GuitarFilterTypeEnum;
  };
  onSubmit: FormikConfig<FormValues>["onSubmit"];
  extra?: React.ReactNode;
  loading?: boolean;
}

const GuitarFilterForm = ({
  initialValues,
  onSubmit,
  extra,
  loading,
}: GuitarFilterFormProps) => {
  const { __typename, _id, ...rest } = initialValues;
  return (
    <Formik
      initialValues={rest}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {/* below `isSubmitting` will be always true and will never get false because `handleSubmit` is not async (does not return promise to be solved/rejected) */}
      {/* {({ isSubmitting }) => ( */}
      <Form>
        <TextFieldFormik
          name="name"
          type="text"
          id="name"
          label={"Nazwa"}
          fullWidth
        />
        <Box pt={2}>
          <TextFieldFormik
            name="description"
            type="text"
            id="description"
            label={"Opis"}
            fullWidth
          />
        </Box>

        <Box pt={2}>
          <TextFieldFormik
            select
            label="Select"
            name="type"
            style={{ width: `100%` }}
            // value={params.type}
            // onChange={handleChangeFilterType}
          >
            {filtersMap.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value as unknown as string}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextFieldFormik>
        </Box>

        <Box mt={2}>
          <Button
            variant="contained"
            type="submit"
            isLoading={loading}
            fullWidth
          >
            {"Aktualizuj"}
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

export default GuitarFilterForm;
