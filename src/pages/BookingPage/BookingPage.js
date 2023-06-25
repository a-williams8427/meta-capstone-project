import React, { useState } from "react";
import BookingForm from "./BookingForm";
import Chicago from "../../components/Chicago";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { BookingContext } from "../../Contexts/BookingContext";
import PersonalInfoForm from "./PersonalInfoForm";
import { openHour } from "./BookingFormValidation";

function BookingPage() {
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        bookDate: dayjs(),
        bookTime: openHour,
        diners: 0,
        occasion: "",
        seating: "",
    });

    const handleFormData = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handleStep = (command) => {
        switch (command) {
            case "step":
                setCurrentStep((prevStep) => prevStep + 1);
                break;
            case "back":
                setCurrentStep((prevStep) => prevStep - 1);
                break;
            default:
                return;
        }
    };

    const bookingDescription = `${formData.seating} table for ${
        formData.diners
    } ${formData.diners > 1 ? "diners" : "diner"} on ${dayjs(
        formData.bookDate
    ).format("MM/DD/YYYY")} at ${dayjs(formData.bookTime).format("hh:mm A")}`;

    const subTitles = ["Find a table for any occasion", bookingDescription];

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
