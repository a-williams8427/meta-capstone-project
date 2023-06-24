import React from "react";
import BookingForm from "./BookingForm";
import Chicago from "../../components/Chicago";
import { Box, Grid, Typography } from "@mui/material";

function BookingPage() {
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "primary.main",
                }}
            >
                <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                    <Chicago />
                    <Typography
                        variant="h5"
                        color="primary.contrastText"
                        component="h3"
                        paddingTop="5rem"
                        paddingBottom="1rem"
                    >
                        Find a table for any occasion
                    </Typography>
                </div>
            </Box>
            <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                <BookingForm />
            </div>
        </>
    );
}

export default BookingPage;
