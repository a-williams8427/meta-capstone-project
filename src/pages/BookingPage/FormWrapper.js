import { Box, Stack } from "@mui/material";
import React from "react";

function FormWrapper({ onSubmit, children }) {
    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
                paddingTop={"2rem"}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 1, sm: 2 }}
                    maxWidth={"450px"}
                    width={"100%"}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                >
                    {children}
                </Stack>
            </Box>
        </>
    );
}

export default FormWrapper;
