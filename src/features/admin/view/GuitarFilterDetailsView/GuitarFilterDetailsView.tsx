import { useState } from "react";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import { useNavigate, useParams } from "react-router-dom";
import { StyledPapperWrapper } from "components/StyledPapperWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "__generated__";
import { CircularProgress } from "components/Button/Button.styled";
import Typography from "@mui/material/Typography";
import GuitarFilterDataDisplayer from "./components/GuitarFilterDataDisplayer";
import GuitarFilterForm, { FormValues } from "./components/GuitarFilterForm";
import Button from "components/Button/Button";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import DeleteGuitarFilterModal from "./components/DeleteGuitarFilterModal";
import { PATHS_ADMIN } from "common/constants/paths";

const GET_FILTER = gql(/* GraphQL */ `
  query GetGuitarFilter($getGuitarFilterId: ID!) {
    getGuitarFilter(id: $getGuitarFilterId) {
      _id
      name
      description
      type
    }
  }
`);

const UPDATE_FILTER = gql(/* GraphQL */ `
  mutation UpdateGuitarFilter($guitarFilter: UpdateGuitarFilterInput!) {
    updateGuitarFilter(guitarFilter: $guitarFilter) {
      message
    }
  }
`);

const DELETE_FILTER = gql(/* GraphQL */ `
  mutation RemoveGuitarFilter($removeGuitarFilterId: ID!) {
    removeGuitarFilter(id: $removeGuitarFilterId) {
      message
    }
  }
`);

const GuitarFilterDetailsView = () => {
  const id = useParams().id;
  const [isEditMode, setIsEditMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_FILTER, {
    variables: {
      getGuitarFilterId: id || "",
    },
    errorPolicy: "all",
  });

  const [updatefilter, { loading: updateLoading }] = useMutation(
    UPDATE_FILTER,
    {
      onCompleted(data) {
        const { message } = data.updateGuitarFilter;
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
        guitarFilter: {
          id: data!.getGuitarFilter._id || "",
          description: description || "",
          ...rest,
        },
      },
    });
  };

  const [deleteFilter] = useMutation(DELETE_FILTER, {
    variables: {
      removeGuitarFilterId: id || "",
    },
    onCompleted(data) {
      const { message } = data.removeGuitarFilter;
      enqueueSnackbar(message, { variant: "info" });
      navigate(PATHS_ADMIN.FILTERS_LIST);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleDeleteFilter = () => {
    deleteFilter();
  };

  return (
    <ShopLayout title="Filter">
      <Box maxWidth={800} width={"100%"} borderRadius={1} margin={"0 auto"}>
        <StyledPapperWrapper>
          {loading && <CircularProgress size={24} />}
          {error && (
            <Typography sx={{ color: (theme) => theme.palette.error.main }}>
              {error.message}
            </Typography>
          )}

          {data && !isEditMode && (
            <GuitarFilterDataDisplayer
              data={data.getGuitarFilter}
              extra={
                <Button onClick={() => setIsEditMode(true)}>Edytuj</Button>
              }
            />
          )}

          {data && isEditMode && (
            <GuitarFilterForm
              initialValues={data.getGuitarFilter}
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
          <DeleteGuitarFilterModal onActionBtnClick={handleDeleteFilter} />
        </StyledPapperWrapper>
      </Box>
    </ShopLayout>
  );
};

export default GuitarFilterDetailsView;
