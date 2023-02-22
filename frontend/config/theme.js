import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { ptBR } from "@mui/x-data-grid";
import { ptBR as pickersptBR } from "@mui/x-date-pickers";
import { ptBR as coreptBR } from "@mui/material/locale";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
    },
    ptBR, // x-data-grid translations
    pickersptBR, // x-date-pickers translations
    coreptBR, // core translations
});

export default theme;

