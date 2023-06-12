import { useState } from "react";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import { useNavigate, useParams } from "react-router-dom";
import { StyledPapperWrapper } from "components/StyledPapperWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "__generated__";
import { CircularProgress } from "components/Button/Button.styled";
import Typography from "@mui/material/Typography";
import GuitarDataDisplayer from "./components/GuitarDataDisplayer";
import GuitarForm, { FormValues } from "./components/GuitarForm";
import Button from "components/Button/Button";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import DeleteGuitarModal from "./components/DeleteGuitarModal";
import { PATHS_ADMIN } from "common/constants/paths";
import SERVER_URLs from "common/constants/serverUrls";
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
const UPDATE_IMAGE = gql(/* GraphQL */ `
  mutation UpdateGuitarImage($image: Upload!, $guitarId: ID!) {
    updateGuitarImage(image: $image, guitarId: $guitarId)
  }
`);

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
      enqueueSnackbar("Usunieto gitarę", { variant: "info" });
      navigate(PATHS_ADMIN.GUITARS_LIST);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleDeleteGuitar = () => {
    deleteGuitar();
  };

  const [mutate] = useMutation(UPDATE_IMAGE, {
    onCompleted(data) {
      // const id = data.updateGuitarImage; // id nowo powstałeo zdjęcia
      refetch();
      enqueueSnackbar("Zaktualizowano zdjęcie", { variant: "success" });
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { validity, files },
  }) => {
    if (validity.valid && files) {
      mutate({
        variables: { image: Array.from(files)[0], guitarId: id || "" },
      });
    }
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
            <Typography variant="h6">Edycja zdjęcia</Typography>
          </Box>

          {data?.getGuitar.imageId && (
            <Box maxWidth={300} ml="auto" mr="auto" mb={2}>
              <img
                src={SERVER_URLs.FILES(data?.getGuitar.imageId)}
                alt="zdjęcie"
                style={{ width: "100%" }}
              />
            </Box>
          )}
          <input type="file" required onChange={onChange} />
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
            <Typography variant="h6">Usuwnanie gitary</Typography>
          </Box>
          <DeleteGuitarModal onActionBtnClick={handleDeleteGuitar} />
        </StyledPapperWrapper>
      </Box>
    </ShopLayout>
  );
};

export default GuitarFilterDetailsView;
