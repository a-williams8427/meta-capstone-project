import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function Specials() {
    return (
        <div>
            <Box
                sx={{
                    display: "block",
                    height: "10vw",
                }}
            />
            {/*TODO: Finish either mocking specials for using an actual API  */}
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h3" color="text">
                        Specials
                    </Typography>
                </Grid>
                {Array.from(Array(12)).map((_, index) => (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        Special here
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Specials;
