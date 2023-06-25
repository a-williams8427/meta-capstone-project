import React, { useState } from "react";
import BookingForm from "./BookingForm";
import Chicago from "../../components/Chicago";
import { Box, Typography } from "@mui/material";
import PersonalInfoForm from "./PersonalInfoForm";

function BookingPage() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    //Placeholder for when I use the form data
    //`${seating}table for ${diners} diners on ${bookDate} at ${bookTime} `
    const subTitles = [
        "Find a table for any occasion",
        "Who is the reservation for?",
    ];

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "primary.main",
                }}
            >
                <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                    <Chicago />
                    <Typography
                        variant="h6"
                        color="primary.contrastText"
                        component="h3"
                        paddingTop="5rem"
                        paddingBottom="1rem"
                    >
                        {subTitles[currentStep]}
                    </Typography>
                </div>
            </Box>
            <div style={{ marginLeft: "25px", marginRight: "25px" }}>
                {currentStep === 0 && (
                    <>
                        <BookingForm handleStep={handleStep} />
                    </>
                )}
                {currentStep === 1 && (
                    <>
                        <PersonalInfoForm />
                    </>
                )}
            </div>
        </>
    );
}

export default BookingPage;
