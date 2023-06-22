import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import basket from "../../assets/icons/Basket.svg";
import { AppBar, Box, Button, IconButton, List, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";

function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navLinks = [
        { text: "Home", link: "/" },
        { text: "Book", link: "/booking" },
    ];

    const handleSidebarToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <>
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                }}
            >
                <img
                    src={logo}
                    alt="Little Lemon Logo"
                    style={{
                        width: "100%",
                        maxWidth: "560px",
                        padding: "1rem",
                        height: "auto",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                    }}
                />
            </Box>
            <AppBar
                component="nav"
                position="sticky"
                sx={{ backgroundColor: "white" }}
            >
                <Toolbar>
                    <div
                        style={{
                            flexGrow: "1",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ display: { sm: "none" } }}>
                            <IconButton
                                aria-label="open sidebar"
                                edge="start"
                                onClick={handleSidebarToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: "1" }} />
                        <Box sx={{ display: { sm: "none" } }}>
                            <img src={logo} alt="Little Lemon Logo" />
                        </Box>
                        <Box
                            sx={{
                                display: { xs: "none", sm: "block" },
                                alignItems: "center",
                            }}
                        >
                            {navLinks.map((item) => (
                                <Button
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                    key={item.text}
                                    component={Link}
                                    to={item.link}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: "1" }} />
                        <IconButton size="small">
                            <img
                                src={basket}
                                alt="Add to basket"
                                style={{ height: "44px" }}
                            />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Nav;
