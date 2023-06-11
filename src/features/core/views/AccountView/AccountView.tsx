import { useMutation, useQuery } from "@apollo/client";
import { gql } from "__generated__";
import { CircularProgress } from "components/Button/Button.styled";
import HelmetDecorator from "components/HelmetDecorator/HelmetDecorator";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AccountDetailsDisplayer from "./components/AccountDetailsDisplayer";
import AccountForm, {
  AccountFormProps,
} from "./components/AccountForm/AccountForm";
import Button from "components/Button/Button";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import PasswordForm, { PasswordFormProps } from "./components/PasswordForm";
import { StyledPapperWrapper } from "components/StyledPapperWrapper";
import DeleteAccountForm from "./components/DeleteAccountModal/DeleteAccountModal";
import { useNavigate } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";

export const GET_USER_ACCOUNT_DATA = gql(/* GraphQL */ `
  query GetUserDataForWrapper {
    getUserData {
      name
      surname
      email
      street
      streetNumber
      postalCode
      city
      phone
    }
  }
`);

export const UPDATE_USER_DATA = gql(/* GraphQL */ `
  mutation UpdateUserData($data: User!) {
    updateUserData(data: $data) {
      message
    }
  }
`);

export const UPDATE_USER_PASSWORD = gql(/* GraphQL */ `
  mutation UpdateUserPassword($newPasswordInput: newPasswordInput!) {
    updateUserPassword(newPasswordInput: $newPasswordInput) {
      message
    }
  }
`);

export const DELETE_ACCOUNT = gql(/* GraphQL */ `
  mutation RemoveUser {
    removeUser {
      message
    }
  }
`);

const AccountView = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_USER_ACCOUNT_DATA, {
    errorPolicy: "all",
  });
  const { enqueueSnackbar } = useSnackbar();

  const [updateAccount, { loading: updateLoading }] = useMutation(
    UPDATE_USER_DATA,
    {
      onCompleted(data) {
        const { message } = data.updateUserData;
        enqueueSnackbar(message, { variant: "success" });
        setIsEditMode(false);
        refetch();
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );

  const handleUpdate: AccountFormProps["onSubmit"] = (values) => {
    updateAccount({ variables: { data: values } });
  };

  const [updatePassword, { loading: updatePasswordLoading }] = useMutation(
    UPDATE_USER_PASSWORD,
    {
      onCompleted(data) {
        const { message } = data.updateUserPassword;
        enqueueSnackbar(message, { variant: "success" });
        setIsEditMode(false);
        refetch();
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );

  const handleUpdatePassword: PasswordFormProps["onSubmit"] = (values) => {
    updatePassword({
      variables: {
        newPasswordInput: {
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        },
      },
    });
  };

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    onCompleted(data) {
      const { message } = data.removeUser;
      enqueueSnackbar(message, { variant: "info" });
      navigate(PATHS_CORE.LOGOUT);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <ShopLayout title="Konto">
      <HelmetDecorator title="Konto" />
      {loading && <CircularProgress size={24} />}
      {error && (
        <Typography sx={{ color: (theme) => theme.palette.error.main }}>
          {error.message}
        </Typography>
      )}

      <Box maxWidth={800} width={"100%"} borderRadius={1} margin={"0 auto"}>
        <StyledPapperWrapper>
          <Box mb={2}>
            <Typography variant="h6">Podstawowe dane</Typography>
          </Box>

          {data && !isEditMode && (
            <AccountDetailsDisplayer
              data={data.getUserData}
              extra={
                <Button onClick={() => setIsEditMode(true)}>Aktualizuj</Button>
              }
            />
          )}
          {data && isEditMode && (
            <AccountForm
              initialValues={data.getUserData}
              onSubmit={handleUpdate}
              extra={
                <Button onClick={() => setIsEditMode(false)}>Anuluj</Button>
              }
              loading={updateLoading}
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
            <Typography variant="h6">Hasło</Typography>
          </Box>
          <PasswordForm
            onSubmit={handleUpdatePassword}
            loading={updatePasswordLoading}
          />
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
            <Typography variant="h6">Usuwnanie konta</Typography>
          </Box>
          <DeleteAccountForm onActionBtnClick={handleDeleteAccount} />
        </StyledPapperWrapper>
      </Box>
    </ShopLayout>
  );
};

export default AccountView;
