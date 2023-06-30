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

export const navLinks = [
    { text: "Home", link: "/" },
    { text: "Book", link: "/booking" },
];
function Nav({ window }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const sidebarWidth = 240;
    const container =
        window !== undefined ? () => window().document.body : undefined;

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
                            flex: "1",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ display: { sm: "none" } }}>
                            <IconButton
                                aria-label="Open Sidebar"
                                edge="start"
                                onClick={handleSidebarToggle}
                                sx={{ ml: 0 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flex: "1", display: { sm: "none" } }} />
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
                                    aria-label="On Click"
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
                        <Box sx={{ flex: "1" }} />
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
            <Box component="nav" sx={{ display: { xs: "block", sm: "none" } }}>
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
                    <Sidebar handleSidebarToggle={handleSidebarToggle} />
                </Drawer>
            </Box>
        </>
    );
}

export default Nav;
