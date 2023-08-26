import Box from "@mui/material/Box";
import Button from "components/Button/Button";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import TextFieldFormik from "components/formik/TextFieldFormik";
import MenuItem from "@mui/material/MenuItem";
import { gql } from "__generated__";
import yup from "common/yup/yup";
import {
  GetGuitarsFilters,
  GuitarFilterTypeEnum,
  SortByKeys,
  SortOrder,
} from "__generated__/graphql";
import { useQuery } from "@apollo/client";
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

const validationSchema = yup.object({
  producer: yup.string(),
  availability: yup.string(),
  bodyWood: yup.string(),
  bridge: yup.string(),
  // description: yup.string(), // to w sumie nei potrzebne rzeciez
  fingerboardWood: yup.string(),
  fretsNumber: yup.number(), // tego nie ma na typie GetGuitarsFilters więc pasuje dodać na serwerze taki filter
  guitarType: yup.string(),
  name: yup.string(),
  pickupsSet: yup.string(),
  price: yup.number(),

  scaleLength: yup.number(), // tego nie ma na typie GetGuitarsFilters więc pasuje dodać na serwerze taki filter
  shape: yup.string(),
  stringsNumber: yup.number(),
  // --------------
  sortBy: yup.string(),
  sortOrder: yup.string(),
});

export const sortOptions: {
  label: string;
  sortBy: SortByKeys;
  sortOrder: SortOrder;
}[] = [
  {
    label: "Domyślnie",
    sortBy: SortByKeys.Default,
    sortOrder: SortOrder.Asc,
  },
  {
    label: "Najnowsze",
    sortBy: SortByKeys.Latest,
    sortOrder: SortOrder.Asc,
  },
  {
    label: "Nazwa - rosnąco",
    sortBy: SortByKeys.Name,
    sortOrder: SortOrder.Asc,
  },
  {
    label: "Nazwa - malejąco",
    sortBy: SortByKeys.Name,
    sortOrder: SortOrder.Desc,
  },
  {
    label: "Cena - rosnąco",
    sortBy: SortByKeys.Price,
    sortOrder: SortOrder.Asc,
  },
  {
    label: "Cena - malejąco",
    sortBy: SortByKeys.Price,
    sortOrder: SortOrder.Desc,
  },
];

interface FormValues extends GetGuitarsFilters {
  sort?: string;
  // availability: string;
  // bodyWood: string;
  // bridge: string;
  // description: string;
  // fingerboardWood: string;
  // fretsNumber: number;
  // guitarType: string;
  // name: string;
  // pickupsSet: string;
  // price: number;
  // producer: string;
  // scaleLength: number;
  // shape: string;
  // stringsNumber: number;
}

const initialValues: FormValues = {};

export interface FiltersListProps {
  handleSubmit: (e: FormValues) => void;
}

const FiltersList = ({ handleSubmit }: FiltersListProps) => {
  const { data: producersData } = useQuery(GET_GUITAR_PRODUCERS, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Producer,
    },
  });
  const { data: guitarTypesData } = useQuery(GET_GUITAR_TYPES, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.GuitarType,
    },
  });
  const { data: bodyWoodData } = useQuery(GET_BODY_WOOD, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.BodyWood,
    },
  });
  const { data: fingerboardWoodData } = useQuery(GET_FINGERBOARD_WOOD, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.FingerboardWood,
    },
  });
  const { data: guitarBridgesData } = useQuery(GET_GUITAR_BRIDGES, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Bridge,
    },
  });
  const { data: guitarShapeData } = useQuery(GET_GUITAR_SHAPE, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Shape,
    },
  });
  const { data: availabilitiesData } = useQuery(GET_AVAILABILITIES, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.Availability,
    },
  });
  const { data: pickupsSetData } = useQuery(GET_GUITAR_PICKUPS_SET, {
    variables: {
      limit: 1000,
      offset: 0,
      type: GuitarFilterTypeEnum.PickupsSet,
    },
  });

  return (
    <Box boxShadow={1} height={"100%"} p={1}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* below `isSubmitting` will be always true and will never get false because `handleSubmit` is not async (does not return promise to be solved/rejected) */}
        {/* {({ isSubmitting }) => ( */}
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {!producersData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Producent"
                  name="producer"
                  valueWhenSelect={""}
                  style={{ width: `100%` }}
                >
                  {producersData.getGuitarFilters.data.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextFieldFormik>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextFieldFormik
                name="name"
                type="text"
                id="name"
                label={"Nazwa"}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextFieldFormik
                name="description"
                type="text"
                id="description"
                label={"Opis"}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12}>
              {!guitarTypesData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Typ gitary"
                  name="guitarType"
                  valueWhenSelect={""}
                  fullWidth
                >
                  {guitarTypesData.getGuitarFilters.data.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id as unknown as string}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextFieldFormik>
              )}
            </Grid>
            <Grid item xs={12}>
              {!bodyWoodData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Drewo korpusu"
                  name="bodyWood"
                  valueWhenSelect={""}
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
              )}
            </Grid>
            <Grid item xs={12}>
              {!fingerboardWoodData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Podstrunnica"
                  name="fingerboardWood"
                  valueWhenSelect={""}
                  fullWidth
                >
                  {fingerboardWoodData.getGuitarFilters.data.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id as unknown as string}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextFieldFormik>
              )}
            </Grid>
            <Grid item xs={12}>
              {!guitarBridgesData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Mostek"
                  name="bridge"
                  valueWhenSelect={""}
                  fullWidth
                >
                  {guitarBridgesData.getGuitarFilters.data.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id as unknown as string}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextFieldFormik>
              )}
            </Grid>
            <Grid item xs={12}>
              {!pickupsSetData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Przystawki"
                  name="pickupsSet"
                  valueWhenSelect={""}
                  fullWidth
                >
                  {pickupsSetData.getGuitarFilters.data.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id as unknown as string}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextFieldFormik>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextFieldFormik
                name="scaleLength"
                type="number"
                id="name"
                label={"Długość skali"}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldFormik
                name="stringsNumber"
                type="number"
                id="name"
                label={"Ilośc strun"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldFormik
                name="fretsNumber"
                type="number"
                id="name"
                label={"Ilość progów"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldFormik
                name="price"
                type="number"
                id="name"
                label={"Cena"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              {!guitarShapeData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Kształt"
                  name="shape"
                  valueWhenSelect={""}
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
              )}
            </Grid>
            <Grid item xs={12}>
              {!availabilitiesData ? (
                <CircularProgress />
              ) : (
                <TextFieldFormik
                  select
                  label="Dostępność"
                  name="availability"
                  valueWhenSelect={""}
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
              )}
            </Grid>
            <Grid item xs={12}>
              <TextFieldFormik
                select
                label="Sortowanie"
                name="sort"
                valueWhenSelect={"Domyślnie"}
                fullWidth
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextFieldFormik>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              variant="contained"
              type="submit"
              // isLoading={loading}
              fullWidth
            >
              {"Zastosuj"}
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default FiltersList;
