import React from "react";
import { Box, Typography } from "@mui/material";
const header = (
    <>
        <Typography
            component="h1"
            paddingTop={"1rem"}
            variant="h3"
            color="primary.light"
            lineHeight="inherit"
            fontWeight="inherit"
        >
            Little Lemon
        </Typography>
        <Typography
            component="h2"
            paddingBottom={"1rem"}
            variant="h4"
            color="primary.contrastText"
            fontFamily="Markazi Text"
            lineHeight="inherit"
            fontWeight="inherit"
        >
            Chicago
        </Typography>
    </>
);
function Chicago({ isHeader = false }) {
    return (
        <Box
            component={isHeader ? "header" : "div"}
            sx={{
                display: "block",
                width: "100%",
                lineHeight: "0.9",
                backgroundColor: "primary.main",
            }}
        >
            {header}
        </Box>
    );
}

export default Chicago;
