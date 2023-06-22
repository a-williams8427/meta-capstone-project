import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function Sidebar({ navItems, handleSidebarToggle }) {
    return (
        <>
            <Box onClick={handleSidebarToggle} sx={{ textAlign: "center" }}>
                <List>
                    {navItems.map((item) => (
                        <NavLinks text={item.text} link={item.link} />
                    ))}
                </List>
            </Box>
        </>
    );
}

export default Sidebar;
