import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const YellowButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    borderRadius: "16px",
    textTransform: "none",
    fontFamily: "Karla",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default YellowButton;
