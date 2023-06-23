import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

import picture from "../assets/pictures/restauranfood.jpg";
import YellowButton from "./YellowButton";

function Hero() {
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "primary.main",
                }}
            >
                <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sx={{ lineHeight: "0.9" }}>
                            <Typography
                                paddingTop={"1rem"}
                                variant="h3"
                                color="primary.light"
                                lineHeight="inherit"
                                fontWeight="inherit"
                            >
                                Little Lemon
                            </Typography>
                            <Typography
                                variant="h4"
                                color="primary.contrastText"
                                fontFamily="Markazi Text"
                                lineHeight="inherit"
                                fontWeight="inherit"
                            >
                                Chicago
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={6} lg={3}>
                            <Typography
                                variant="subtitle1"
                                color="primary.contrastText"
                                fontSize="18px"
                            >
                                We are a family owned Mediterranean restaurant,
                                focused on traditional recipes served with a
                                modern twist.
                            </Typography>
                            <YellowButton
                                variant="contained"
                                sx={{ marginTop: "1rem" }}
                            >
                                Reserve a Table
                            </YellowButton>
                        </Grid>
                        <Grid item xs={5} md={6} lg={9}>
                            <img
                                src={picture}
                                alt="Food from Little Lemon"
                                style={{
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    width: "100%",
                                    maxWidth: "560px",
                                    height: "56.25%",
                                    objectFit: "cover",
                                    borderRadius: "16px",
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    );
}

export default Hero;
