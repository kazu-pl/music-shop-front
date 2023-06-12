import { GetGuitarFilterQuery } from "__generated__/graphql";
import { Box, Grid, Typography } from "@mui/material";

export interface GuitarFilterDataDisplayerProps {
  data: GetGuitarFilterQuery["getGuitarFilter"];
  extra?: React.ReactNode;
}

const GuitarFilterDataDisplayer = ({
  data,
  extra,
}: GuitarFilterDataDisplayerProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Nazwa</Typography>
          <Typography>{data.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Opis</Typography>
          <Typography>{data.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Typ</Typography>
          <Typography>{data.type}</Typography>
        </Grid>
      </Grid>
      {extra && <Box mt={2}>{extra}</Box>}
    </>
  );
};

export default GuitarFilterDataDisplayer;
