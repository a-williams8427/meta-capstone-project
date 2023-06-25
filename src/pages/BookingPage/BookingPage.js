import React, { useState } from "react";
import BookingForm from "./BookingForm";
import Chicago from "../../components/Chicago";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { BookingContext } from "../../Contexts/BookingContext";
import PersonalInfoForm from "./PersonalInfoForm";

function BookingPage() {
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({});

    const handleFormData = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handleStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const subTitles = [
        "Find a table for any occasion",
        `${formData.seating} table for ${formData.diners} diners on ${dayjs(
            formData.bookDate
        ).format("MM/DD/YYYY")} at ${dayjs(formData.bookTime).format(
            "hh:mm A"
        )}`,
    ];

    console.log(formData);
    return (
        <>
            <BookingContext.Provider
                value={{ handleFormData, handleStep, formData }}
            >
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
                            <BookingForm />
                        </>
                    )}
                    {currentStep === 1 && (
                        <>
                            <PersonalInfoForm />
                        </>
                    )}
                </div>
            </BookingContext.Provider>
        </>
    );
}

export default BookingPage;
