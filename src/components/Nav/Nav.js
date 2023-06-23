import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import basket from "../../assets/icons/Basket.svg";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";

function Nav({ window }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const sidebarWidth = 240;
    const container =
        window !== undefined ? () => window().document.body : undefined;

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
                sx={{
                    backgroundColor: "white",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <div
                        style={{
                            flexGrow: "1",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "10px",
                            marginRight: "10px",
                        }}
                    >
                        <Box sx={{ display: { sm: "none" } }}>
                            <IconButton
                                aria-label="open sidebar"
                                edge="start"
                                onClick={handleSidebarToggle}
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
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleSidebarToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: sidebarWidth,
                        },
                    }}
                >
                    <Toolbar />
                    <Sidebar
                        navItems={navLinks}
                        handleSidebarToggle={handleSidebarToggle}
                    />
                </Drawer>
            </Box>
        </>
    );
}

export default Nav;
