import Paper from "@mui/material/Paper";
import { styled as muiStyled } from "@mui/material";

export const StyledPapperWrapper = muiStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: `100%`,
}));
