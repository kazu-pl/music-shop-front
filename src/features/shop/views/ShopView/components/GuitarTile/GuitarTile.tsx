import { Guitar } from "__generated__/graphql";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SERVER_URLs from "common/constants/serverUrls";
import renderMaxLengthText from "utils/renderMaxLengthText";
import Button from "components/Button/Button";
import { PATHS_ADMIN } from "common/constants/paths";

export interface GuitarTileProps {
  data: Guitar;
  noMarginBottom?: boolean;
}

const GuitarTile = ({ data, noMarginBottom }: GuitarTileProps) => {
  console.log({ data });
  return (
    <Box
      display={"flex"}
      height={200}
      mb={noMarginBottom ? 0 : 2}
      boxShadow={1}
      p={1}
    >
      <Box height={"100%"} width={200}>
        <img
          src={
            data.imageId
              ? SERVER_URLs.FILES(data.imageId)
              : "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"
          }
          alt="gitara"
          style={{
            height: "100%",
            width: "100%",
            display: "block",
            objectFit: "fill",
          }}
        />
      </Box>
      <Box display={"flex"} flexDirection={"column"} ml={1} flexGrow={1}>
        <Box mb={2}>
          <Typography variant="h6">{`${data.producer.name} ${data.name}`}</Typography>
        </Box>
        <Box mb={2}>
          <Typography>{`${renderMaxLengthText(
            data.description,
            100
          )}`}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} ml={1}>
        <Box mb={2}>
          <Typography variant="h6">{`Cena:`}</Typography>
          <Typography variant="h6">{`${data.price} zł`}</Typography>
        </Box>
        <Box mb={2}>
          <Typography>{`Dostępność: `}</Typography>
          <Typography>{`${data.availability.name}`}</Typography>
        </Box>
        <Box mb={2}>
          <Button to={PATHS_ADMIN.SINGLE_GUITAR(data._id)}>
            Zobacz więcej
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GuitarTile;
