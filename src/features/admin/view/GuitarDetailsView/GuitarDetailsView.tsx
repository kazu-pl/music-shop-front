import { useState } from "react";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import { useNavigate, useParams } from "react-router-dom";
import { StyledPapperWrapper } from "components/StyledPapperWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "__generated__";
import { CircularProgress } from "components/Button/Button.styled";
import Typography from "@mui/material/Typography";
import GuitarDataDisplayer from "./components/GuitarDataDisplayer";
import GuitarForm from "./components/GuitarForm";
import Button from "components/Button/Button";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import DeleteGuitarModal from "./components/DeleteGuitarModal";
import { PATHS_ADMIN } from "common/constants/paths";
import yup from "common/yup/yup";

const GET_GUITAR_TO_EDIT = gql(/* GraphQL */ `
  query GetGuitarToEdit($getGuitarId: ID!) {
    getGuitar(id: $getGuitarId) {
      _id
      name
      description
      fretsNumber
      imageId
      price
      scaleLength
      stringsNumber
      availability {
        _id
        name
        description
        type
      }
      bodyWood {
        _id
        description
        name
        type
      }
      bridge {
        _id
        description
        name
        type
      }
      fingerboardWood {
        _id
        description
        name
        type
      }
      guitarType {
        _id
        description
        name
        type
      }
      pickupsSet {
        _id
        description
        name
        type
      }
      producer {
        _id
        description
        name
        type
      }
      shape {
        _id
        description
        name
        type
      }
    }
  }
`);

const UPDATE_GUITAR_DATA = gql(/* GraphQL */ `
  mutation UpdateGuitarData($guitar: UpdateGuitarInput!) {
    updateGuitar(guitar: $guitar) {
      message
    }
  }
`);

const DELETE_GUITAR = gql(/* GraphQL */ `
  mutation RemoveGuitar($removeGuitarId: ID!) {
    removeGuitar(id: $removeGuitarId) {
      __typename
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

const GuitarFilterDetailsView = () => {
  const id = useParams().id;
  const [isEditMode, setIsEditMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_GUITAR_TO_EDIT, {
    variables: {
      getGuitarId: id || "",
    },
    errorPolicy: "all",
  });

  const [updatefilter, { loading: updateLoading }] = useMutation(
    UPDATE_GUITAR_DATA,
    {
      onCompleted(data) {
        const { message } = data.updateGuitar;
        enqueueSnackbar(message, { variant: "success" });
        refetch();
        setIsEditMode(false);
      },
      onError(error) {
        const { message } = error;
        enqueueSnackbar(message, { variant: "error" });
      },
    }
  );

  const handleSubmit = ({ description, ...rest }: FormValues) => {
    updatefilter({
      variables: {
        guitar: {
          id: data!.getGuitar._id || "",
          description: description || "",
          ...rest,
        },
      },
    });
  };

  const [deleteGuitar] = useMutation(DELETE_GUITAR, {
    variables: {
      removeGuitarId: id || "",
    },
    onCompleted(data) {
      const message = data.removeGuitar;
      console.log({ deleteGuitar_onCompleted_message: message });
      enqueueSnackbar("sukces", { variant: "info" });
      navigate(PATHS_ADMIN.FILTERS_LIST);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleDeleteGuitar = () => {
    deleteGuitar();
  };

  return (
    <ShopLayout title="Gitara">
      <Box maxWidth={800} width={"100%"} borderRadius={1} margin={"0 auto"}>
        <StyledPapperWrapper>
          {loading && <CircularProgress size={24} />}
          {error && (
            <Typography sx={{ color: (theme) => theme.palette.error.main }}>
              {error.message}
            </Typography>
          )}

          {data && !isEditMode && (
            <GuitarDataDisplayer
              data={data.getGuitar}
              extra={
                <Button onClick={() => setIsEditMode(true)}>Edytuj</Button>
              }
            />
          )}

          {data && isEditMode && (
            <GuitarForm
              initialValues={data.getGuitar}
              loading={updateLoading}
              onSubmit={handleSubmit}
              extra={
                <Button onClick={() => setIsEditMode(false)}>Anuluj</Button>
              }
            />
          )}
        </StyledPapperWrapper>
      </Box>
      <Box
        maxWidth={800}
        width={"100%"}
        borderRadius={1}
        mt={2}
        ml={"auto"}
        mr={"auto"}
      >
        <StyledPapperWrapper>
          <Box mb={2}>
            <Typography variant="h6">Usuwnanie filtru</Typography>
          </Box>
          <DeleteGuitarModal onActionBtnClick={handleDeleteGuitar} />
        </StyledPapperWrapper>
      </Box>
    </ShopLayout>
  );
};

export default GuitarFilterDetailsView;
