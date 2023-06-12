import { GetGuitarToEditQuery } from "__generated__/graphql";
import { Box, Grid, Typography } from "@mui/material";

export interface GuitarDataDisplayerProps {
  data: GetGuitarToEditQuery["getGuitar"];
  extra?: React.ReactNode;
}

const GuitarDataDisplayer = ({ data, extra }: GuitarDataDisplayerProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Producent</Typography>
          <Typography>{data.producer.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Nazwa</Typography>
          <Typography>{data.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Opis</Typography>
          <Typography>{data.description}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Typ gitary</Typography>
          <Typography>{data.guitarType.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Drewno korpusu</Typography>
          <Typography>{data.bodyWood.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Podstrunnica</Typography>
          <Typography>{data.fingerboardWood.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Mostek</Typography>
          <Typography>{data.bridge.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Przystawki</Typography>
          <Typography>{data.pickupsSet.name}</Typography>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Długość skali</Typography>
          <Typography>{data.scaleLength}</Typography>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Ilośc strun</Typography>
          <Typography>{data.stringsNumber}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Ilość progów</Typography>
          <Typography>{data.fretsNumber}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Cena</Typography>
          <Typography>{data.price}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Kształt</Typography>
          <Typography>{data.shape.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Dostępność</Typography>
          <Typography>{data.availability.name}</Typography>
        </Grid>
      </Grid>
      {extra && <Box mt={2}>{extra}</Box>}
    </>
  );
};

export default GuitarDataDisplayer;
