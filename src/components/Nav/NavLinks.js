import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function NavLinks({ id, text, link }) {
    return (
        <ListItem key={id} disablePadding>
            <ListItemButton
                component={Link}
                to={link}
                sx={{ textAlign: "center" }}
            >
                <ListItemText>{text}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
}

export default NavLinks;
