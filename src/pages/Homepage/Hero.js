import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./Hero.css";
import picture from "../../assets/pictures/restauranfood.jpg";
import YellowButton from "../../components/YellowButton";
import Chicago from "../../components/Chicago";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "primary.main",
                    mb: "4rem",
                }}
            >
                <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sx={{}}>
                            <Chicago />
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
                                component={Link}
                                to={"/booking"}
                                name="Reserve a table"
                                aria-label="On Click"
                            >
                                Reserve a table
                            </YellowButton>
                        </Grid>
                        <Grid item xs={5} md={6} lg={9}>
                            <img
                                className="main-image"
                                src={picture}
                                alt="Food from Little Lemon"
                            />
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    );
}

export default Hero;
