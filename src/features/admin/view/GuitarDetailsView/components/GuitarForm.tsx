import { Form, Formik, FormikConfig } from "formik";
import { Box } from "@mui/material";
import TextFieldFormik from "components/formik/TextFieldFormik";

import Button from "components/Button";
import yup from "common/yup/yup";
import {
  GetGuitarToEditQuery,
  GuitarFilterTypeEnum,
} from "__generated__/graphql";

import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { gql } from "__generated__";
import { useQuery } from "@apollo/client";

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

export interface FormValues {
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
export interface GuitarFormProps {
  initialValues: GetGuitarToEditQuery["getGuitar"];
  onSubmit: FormikConfig<FormValues>["onSubmit"];
  extra?: React.ReactNode;
  loading?: boolean;
}

const GuitarForm = ({
  initialValues,
  onSubmit,
  extra,
  loading,
}: GuitarFormProps) => {
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

  const { __typename, _id, imageId, ...rest } = initialValues;

  const valuesToUse: FormValues = {
    availabilityId: rest.availability._id,
    bridgeId: rest.bridge._id,
    bodyWoodId: rest.bodyWood._id,
    description: rest.description,
    fingerboardWoodId: rest.fingerboardWood._id,
    fretsNumber: rest.fretsNumber,
    guitarTypeId: rest.guitarType._id,
    name: rest.name,
    pickupsSetId: rest.pickupsSet._id,
    price: rest.price,
    producerId: rest.producer._id,
    scaleLength: rest.scaleLength,
    shapeId: rest.shape._id,
    stringsNumber: rest.stringsNumber,
  };
  return (
    <Formik
      initialValues={valuesToUse}
      onSubmit={onSubmit}
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
              {guitarProducersData?.getGuitarFilters.data.map((option) => (
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
              {fingerboardWoodData?.getGuitarFilters.data.map((option) => (
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
            <TextFieldFormik select label="Mostek" name="bridgeId" fullWidth>
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
              {guitarPickupsSetData?.getGuitarFilters.data.map((option) => (
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
            <TextFieldFormik select label="Kształt" name="shapeId" fullWidth>
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

export default GuitarForm;
