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

function Sidebar({ navItems, handleSidebarToggle }) {
    return (
        <>
            <Box
                onClick={handleSidebarToggle}
                sx={{ textAlign: "center", overflow: "auto" }}
            >
                <List>
                    {navItems.map((item) => (
                        <ListItem
                            key={`${item.text}Sidebar`}
                            disablePadding
                            divider
                        >
                            <ListItemButton component={Link} to={item.link}>
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
