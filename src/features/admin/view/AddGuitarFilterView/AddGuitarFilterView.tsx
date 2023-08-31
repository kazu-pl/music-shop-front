import { Box } from "@mui/material";
import yup from "common/yup/yup";
import Button from "components/Button/Button";
import HelmetDecorator from "components/HelmetDecorator/HelmetDecorator";
import { StyledPapperWrapper } from "components/StyledPapperWrapper";
import TextFieldFormik from "components/formik/TextFieldFormik";
import { Form, Formik } from "formik";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import MenuItem from "@mui/material/MenuItem";
import filtersMap from "features/admin/data/filtersMap";
import { GuitarFilterTypeEnum } from "__generated__/graphql";
import { gql } from "__generated__";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { PATHS_ADMIN } from "common/constants/paths";

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  type: yup.string().required(),
});

interface FormValues {
  name: string;
  description?: string;
  type: GuitarFilterTypeEnum;
}

const initialValues: FormValues = {
  name: "",
  description: "",
  type: GuitarFilterTypeEnum.Availability,
};

const ADD_GUITAR_FILTER = gql(/* GraphQL */ `
  mutation AddGuitarFilter($newGuitarFilter: AddGuitarFilterInput!) {
    addGuitarFilter(newGuitarFilter: $newGuitarFilter) {
      message
    }
  }
`);

const AddGuitarFilterView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [addGuitarFilter, { loading }] = useMutation(ADD_GUITAR_FILTER, {
    onCompleted(data) {
      const { message } = data.addGuitarFilter;
      enqueueSnackbar(message, { variant: "success" });
      navigate(PATHS_ADMIN.FILTERS_LIST);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleSubmit = (values: FormValues) => {
    addGuitarFilter({ variables: { newGuitarFilter: values } });
  };

  return (
    <ShopLayout title="Panel admina - dodaj filtr">
      <HelmetDecorator title="dodaj filtr" />
      <Box maxWidth={500} ml="auto" mr="auto">
        <StyledPapperWrapper>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
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
                  {"Dodaj"}
                </Button>
              </Box>
            </Form>
          </Formik>
        </StyledPapperWrapper>
      </Box>
    </ShopLayout>
  );
};

export default AddGuitarFilterView;
