import React from "react";
import { Stack, Typography } from "@mui/material";
import "./Footer.css";
import logo from "../assets/icons/logo small.png";

function Footer() {
    return (
        <footer>
            <div>
                <Stack
                    direction={"row"}
                    alignItems="center"
                    justifyContent="space-around"
                    spacing={2}
                >
                    <img src={logo} alt="Little Lemon Logo" />
                    <Typography>&copy; Copyright Little Lemon</Typography>
                </Stack>
            </div>
        </footer>
    );
}

export default Footer;
