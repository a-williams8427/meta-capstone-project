import { Box, Typography } from "@mui/material";
import React from "react";
import checkMark from "../../assets/icons/check mark.svg";
import "./ConfirmationPage.css";
import YellowButton from "../../components/YellowButton";
import { Link } from "react-router-dom";

function ConfirmedBooking({ formData }) {
    const { seating, firstName, lastName, diners, bookDate, bookTime } =
        formData;
    const confirmationDescription = `${seating} table reserved for ${firstName} ${lastName} and ${diners} other ${
        diners > 1 ? "guests" : "guest"
    } on ${bookDate.format("MM/DD/YYYY")} at ${bookTime}`;
    return (
        <>
            <Box
                paddingTop={"2rem"}
                maxWidth={"450px"}
                width={"100%"}
                marginLeft={"auto"}
                marginRight={"auto"}
            >
                <Typography variant="h6" paddingBottom={"2rem"}>
                    {confirmationDescription}
                </Typography>
                <Typography>
                    We look forward to seeing you here! Please check your email
                    for your confirmation and reminder for when your reservation
                    is set for.
                </Typography>
                <img className="check-mark" src={checkMark} alt="check mark" />
                <YellowButton
                    fullWidth
                    name="Home"
                    aria-label="On Click"
                    component={Link}
                    to={"/"}
                >
                    Back to Home
                </YellowButton>
            </Box>
        </>
    );
}

export default ConfirmedBooking;
