import { useQuery } from "@apollo/client";
import { gql } from "__generated__";
import SERVER_URLs from "common/constants/serverUrls";
import { CircularProgress } from "components/Button/Button.styled";
import { StyledPapperWrapper } from "components/StyledPapperWrapper";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import gnc_productcard from "images/gnc_productcard.png";
import darmowa_dostawa_productcard from "images/darmowa_dostawa_productcard.png";
import supercena_productcard from "images/supercena_productcard.png";
import ratyzeroprocent_ca_productcard from "images/ratyzeroprocent_ca_productcard.jpg";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "components/Button";

const GET_GUITAR = gql(/* GraphQL */ `
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

const SingleGuitarDetailsView = () => {
  const id = useParams().id;

  const { data, loading, error } = useQuery(GET_GUITAR, {
    variables: {
      getGuitarId: id || "",
    },
    errorPolicy: "all",
  });

  return (
    <ShopLayout
      title={
        !loading && !error && data
          ? `${data.getGuitar.producer.name} ${data.getGuitar.name}`
          : " "
      }
    >
      <StyledPapperWrapper>
        {loading && <CircularProgress size={24} />}
        {error && (
          <Typography sx={{ color: (theme) => theme.palette.error.main }}>
            {error.message}
          </Typography>
        )}
        <Box display={"flex"}>
          <Box p={2} borderRight={"1px solid grey"} width={"50%"}>
            {data?.getGuitar.imageId && (
              <Box maxWidth={200} ml="auto" mr="auto" mb={2}>
                <img
                  src={SERVER_URLs.FILES(data?.getGuitar.imageId)}
                  alt="zdjęcie"
                  style={{ width: "100%" }}
                />
              </Box>
            )}
          </Box>
          <Box p={2} width={"50%"} display={"flex"} flexDirection={"column"}>
            <Box
              display={"flex"}
              mb={4}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Box>
                <img src={gnc_productcard} alt="zdjęcie" width={"60px"} />
                <img
                  src={darmowa_dostawa_productcard}
                  alt="zdjęcie"
                  width={"60px"}
                />
                <img src={supercena_productcard} alt="zdjęcie" width={"60px"} />
                <img
                  src={ratyzeroprocent_ca_productcard}
                  alt="zdjęcie"
                  width={"60px"}
                />
              </Box>
              <Typography component="p" variant="h6">
                Cena:{" "}
                <Typography component={"span"} color={"brown"} variant="h6">
                  {data?.getGuitar.price},00zł
                </Typography>
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6">Opis:</Typography>
              {data?.getGuitar.description}
            </Box>
            <Box mt={4}>
              <Typography variant="h6">Specyfikacja:</Typography>
              <ul style={{ marginLeft: "16px" }}>
                <li style={{ textAlign: "left" }}>
                  Producent: {data?.getGuitar.producer.name}
                </li>
                <li style={{ textAlign: "left" }}>
                  Nazwa modelu: {data?.getGuitar.name}
                </li>
                <li style={{ textAlign: "left" }}>
                  Rodzaj gitary: {data?.getGuitar.guitarType.name}
                </li>
                <li style={{ textAlign: "left" }}>
                  Drewno: {data?.getGuitar.bodyWood.name}
                </li>

                <li style={{ textAlign: "left" }}>
                  Podstrunnica: {data?.getGuitar.fingerboardWood.name}
                </li>
                <li style={{ textAlign: "left" }}>
                  Układ przystawek: {data?.getGuitar.pickupsSet.name}
                </li>
                <li style={{ textAlign: "left" }}>
                  Mostek: {data?.getGuitar.bridge.name}
                </li>
                <li style={{ textAlign: "left" }}>
                  Ilość progów: {data?.getGuitar.fretsNumber}
                </li>

                <li style={{ textAlign: "left" }}>
                  Długość menzury: {data?.getGuitar.scaleLength}
                </li>

                <li style={{ textAlign: "left" }}>
                  Ilość strun: {data?.getGuitar.stringsNumber}
                </li>

                <li style={{ textAlign: "left" }}>
                  Dostępność: {data?.getGuitar.availability.name}
                </li>
              </ul>
            </Box>

            <Box mt={4}>
              <Button variant="contained" startIcon={<ShoppingCartIcon />}>
                Dodaj do koszyka
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledPapperWrapper>
    </ShopLayout>
  );
};

export default SingleGuitarDetailsView;
