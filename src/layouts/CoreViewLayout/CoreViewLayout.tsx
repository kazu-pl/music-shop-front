import Box from "@mui/material/Box";
import { StyledLoginPageWrapper } from "./CoreViewsLayout.styled";
import Typography from "@mui/material/Typography";
import { PATHS_CORE } from "common/constants/paths";
import Button from "components/Button/Button";

export interface CoreViewsLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  maxWidth?: string;
}

const CoreViewsLayout = ({
  children,
  title,
  description,
  maxWidth,
}: CoreViewsLayoutProps) => {
  return (
    <StyledLoginPageWrapper>
      <Box
        maxWidth={maxWidth || 330}
        width="100%"
        p={4}
        borderRadius={4}
        bgcolor="white"
        textAlign="center"
      >
        <Box pb={2}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
        </Box>
        {description && (
          <Box pb={2}>
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          </Box>
        )}
        {children}
        <Box mt={2}>
          <Button to={PATHS_CORE.SHOP}>Wróć do sklepu</Button>
        </Box>
      </Box>
    </StyledLoginPageWrapper>
  );
};

export default CoreViewsLayout;
