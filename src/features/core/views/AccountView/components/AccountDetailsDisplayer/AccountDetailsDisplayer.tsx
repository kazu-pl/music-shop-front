import { User } from "__generated__/graphql";
import { Box, Grid, Typography } from "@mui/material";

export interface AccountDetailsDisplayerProps {
  data: User;
  extra?: React.ReactNode;
}

const AccountDetailsDisplayer = ({
  data,
  extra,
}: AccountDetailsDisplayerProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Imię</Typography>
          <Typography>{data.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Nazwisko</Typography>
          <Typography>{data.surname}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Email</Typography>
          <Typography>{data.email}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Miasto</Typography>
          <Typography>{data.city}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Kod pocztowy</Typography>
          <Typography>{data.postalCode}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Ulica</Typography>
          <Typography>{data.street}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Numer mieszkania</Typography>
          <Typography>{data.streetNumber}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Telefon</Typography>
          <Typography>{data.phone}</Typography>
        </Grid>
      </Grid>
      {extra && <Box mt={2}>{extra}</Box>}
    </>
  );
};

export default AccountDetailsDisplayer;
