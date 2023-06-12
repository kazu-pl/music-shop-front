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
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { PATHS_ADMIN } from "common/constants/paths";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const GET_AVAILABILITIES = gql(/* GraphQL */ `
  query GetGuitarAvailabilities(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);
const GET_GUITAR_TYPES = gql(/* GraphQL */ `
  query GetGuitarTypes(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);
const GET_GUITAR_BRIDGES = gql(/* GraphQL */ `
  query GetGuitarBridges(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);
const GET_FINGERBOARD_WOOD = gql(/* GraphQL */ `
  query GetFingerboardWood(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);
const GET_BODY_WOOD = gql(/* GraphQL */ `
  query GetguitarBodyWood(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);
const GET_GUITAR_PICKUPS_SET = gql(/* GraphQL */ `
  query GetPuckupsSet(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);

const GET_GUITAR_SHAPE = gql(/* GraphQL */ `
  query GetGuitarShape(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);
const GET_GUITAR_PRODUCERS = gql(/* GraphQL */ `
  query GetGuitarProducers(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        type
      }
      totalItems
    }
  }
`);

const ADD_GUITAR = gql(/* GraphQL */ `
  mutation AddGuitar($newGuitar: AddGuitarInput!) {
    addGuitar(newGuitar: $newGuitar) {
      message
    }
  }
`);

const validationSchema = yup.object({
  availabilityId: yup.string().required(),
  bodyWoodId: yup.string().required(),
  bridgeId: yup.string().required(),
  description: yup.string(),
  fingerboardWoodId: yup.string().required(),
  fretsNumber: yup.number().required(),
  guitarTypeId: yup.string().required(),
  name: yup.string().required(),
  pickupsSetId: yup.string().required(),
  price: yup.number().required(),
  producerId: yup.string().required(),
  scaleLength: yup.number().required(),
  shapeId: yup.string().required(),
  stringsNumber: yup.number().required(),
});

interface FormValues {
  availabilityId: string;
  bodyWoodId: string;
  bridgeId: string;
  description: string;
  fingerboardWoodId: string;
  fretsNumber: number;
  guitarTypeId: string;
  name: string;
  pickupsSetId: string;
  price: number;
  producerId: string;
  scaleLength: number;
  shapeId: string;
  stringsNumber: number;
}

const initialValues: FormValues = {
  producerId: "",
  name: "",

  description: "",
  guitarTypeId: "",

  bodyWoodId: "",
  fingerboardWoodId: "",

  bridgeId: "",
  pickupsSetId: "",

  scaleLength: 24.75,
  stringsNumber: 6,

  fretsNumber: 24,
  price: 0,

  shapeId: "",
  availabilityId: "",
};

const AddGuitarView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: availabilitiesData } = useQuery(GET_AVAILABILITIES, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Availability,
    },
  });
  const { data: guitarTypesData } = useQuery(GET_GUITAR_TYPES, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.GuitarType,
    },
  });
  const { data: guitarBridgesData } = useQuery(GET_GUITAR_BRIDGES, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Bridge,
    },
  });
  const { data: fingerboardWoodData } = useQuery(GET_FINGERBOARD_WOOD, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.FingerboardWood,
    },
  });
  const { data: bodyWoodData } = useQuery(GET_BODY_WOOD, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.BodyWood,
    },
  });
  const { data: guitarPickupsSetData } = useQuery(GET_GUITAR_PICKUPS_SET, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.PickupsSet,
    },
  });
  const { data: guitarShapeData } = useQuery(GET_GUITAR_SHAPE, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Shape,
    },
  });
  const { data: guitarProducersData } = useQuery(GET_GUITAR_PRODUCERS, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Producer,
    },
  });

  const [addGuitar, { loading }] = useMutation(ADD_GUITAR, {
    onCompleted(data) {
      const { message } = data.addGuitar;
      enqueueSnackbar(message, { variant: "success" });
      navigate(PATHS_ADMIN.GUITARS_LIST);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log({ values });
    addGuitar({ variables: { newGuitar: values } });
    // addGuitarFilter({ variables: { newGuitarFilter: values } });
  };

  return (
    <ShopLayout title="Panel admina - dodaj filtr">
      <HelmetDecorator title="dodaj filtr" />
      <Box maxWidth={800} ml="auto" mr="auto">
        <StyledPapperWrapper>
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
                    select
                    label="Producent"
                    name="producerId"
                    style={{ width: `100%` }}
                  >
                    {guitarProducersData?.getGuitarFilters.data.map(
                      (option) => (
                        <MenuItem
                          key={option._id}
                          value={option._id as unknown as string}
                        >
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextFieldFormik>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    name="name"
                    type="text"
                    id="name"
                    label={"Nazwa"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    name="description"
                    type="text"
                    id="description"
                    label={"Opis"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Typ gitary"
                    name="guitarTypeId"
                    fullWidth
                  >
                    {guitarTypesData?.getGuitarFilters.data.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={option._id as unknown as string}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextFieldFormik>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Drewo korpusu"
                    name="bodyWoodId"
                    fullWidth
                  >
                    {bodyWoodData?.getGuitarFilters.data.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={option._id as unknown as string}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextFieldFormik>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Podstrunnica"
                    name="fingerboardWoodId"
                    fullWidth
                  >
                    {fingerboardWoodData?.getGuitarFilters.data.map(
                      (option) => (
                        <MenuItem
                          key={option._id}
                          value={option._id as unknown as string}
                        >
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextFieldFormik>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Mostek"
                    name="bridgeId"
                    fullWidth
                  >
                    {guitarBridgesData?.getGuitarFilters.data.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={option._id as unknown as string}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextFieldFormik>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Pickupy"
                    name="pickupsSetId"
                    fullWidth
                  >
                    {guitarPickupsSetData?.getGuitarFilters.data.map(
                      (option) => (
                        <MenuItem
                          key={option._id}
                          value={option._id as unknown as string}
                        >
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextFieldFormik>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    name="scaleLength"
                    type="number"
                    id="name"
                    label={"Długość skali"}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    name="stringsNumber"
                    type="number"
                    id="name"
                    label={"Ilośc strun"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    name="fretsNumber"
                    type="number"
                    id="name"
                    label={"Ilość progów"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    name="price"
                    type="number"
                    id="name"
                    label={"Cena"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Kształt"
                    name="shapeId"
                    fullWidth
                  >
                    {guitarShapeData?.getGuitarFilters.data.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={option._id as unknown as string}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextFieldFormik>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextFieldFormik
                    select
                    label="Dostępność"
                    name="availabilityId"
                    fullWidth
                  >
                    {availabilitiesData?.getGuitarFilters.data.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={option._id as unknown as string}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextFieldFormik>
                </Grid>
              </Grid>
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

export default AddGuitarView;
