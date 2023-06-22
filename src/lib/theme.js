import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#495e57",
            light: "#f4ce14",
        },
        secondary: {
            main: "#ee9972",
            light: "#fbdabb",
        },
    },
    typography: {
        fontFamily: "Karla",
        fontSize: 16,
        h1: {
            fontFamily: "Markazi Text",
        },
        h2: {
            fontFamily: "Markazi Text",
        },
        h3: {
            fontFamily: "Markazi Text",
        },
    },
});
