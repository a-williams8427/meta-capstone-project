import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./Nav";

function Sidebar({ handleSidebarToggle }) {
    return (
        <>
            <Box
                onClick={handleSidebarToggle}
                sx={{ textAlign: "center", overflow: "auto" }}
            >
                <List>
                    {navLinks.map((item) => (
                        <ListItem
                            key={`${item.text}Sidebar`}
                            disablePadding
                            divider
                        >
                            <ListItemButton
                                aria-label="On Click"
                                component={Link}
                                to={item.link}
                            >
                                <ListItemText>
                                    <Typography
                                        fontSize="16px"
                                        fontWeight="bold"
                                        textAlign="center"
                                        color="primary"
                                    >
                                        {item.text}
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
}

export default Sidebar;
