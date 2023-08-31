import HelmetDecorator from "components/HelmetDecorator";
import Typography from "@mui/material/Typography";
import Button from "components/Button";
import { PATHS_CORE } from "common/constants/paths";
import Box from "@mui/material/Box";

const NotFound = () => {
  return (
    <Box
      width={"100%"}
      minHeight={"100vh"}
      p={0}
      m={0}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <HelmetDecorator title="404" />
      <Box>
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">Nie znaleziono strony</Typography>
        <Box
          maxWidth="600px"
          width="100%"
          mt={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button to={PATHS_CORE.SHOP} variant="contained">
            Wróć do sklepu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
