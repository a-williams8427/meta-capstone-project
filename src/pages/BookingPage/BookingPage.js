import React, { useReducer, useState } from "react";
import BookingForm from "./BookingForm";
import Chicago from "../../components/Chicago";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import PersonalInfoForm from "./PersonalInfoForm";
import { fetchAPI, submitAPI } from "../../lib/api";
import ConfirmedBooking from "./ConfirmedBooking";

function BookingPage() {
    //const timeSlots = [17, 18, 19, 20, 21, 22];
    const currentDate = dayjs();

    const initializeTimes = () => {
        const timeSlots = fetchAPI(currentDate.toDate());

        return timeSlots;
    };

    const updateTimes = (state, action) => {
        let times;
        switch (action.type) {
            case "update":
                const selectedDate = action.payload;
                const timeSlots = fetchAPI(selectedDate.toDate());

                times = timeSlots;
                break;
            default:
                throw new Error();
        }
        return times;
    };
    const [availableTimes, dispatch] = useReducer(
        updateTimes,
        initializeTimes()
    );

    const defaultFormFields = {
        bookTime: "",
        bookDate: dayjs(),
        diners: 0,
        occasion: "",
        seating: "",
        // Step two
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        request: "",
    };
    const [formData, setFormData] = useState({ ...defaultFormFields });
    const [currentStep, setCurrentStep] = useState(0);

    const handleFormData = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handleStep = (command) => {
        switch (command) {
            case "step":
                setCurrentStep((prevStep) => (prevStep = 1));
                break;
            case "back":
                setCurrentStep((prevStep) => (prevStep = 0));
                break;
            case "submit":
                setCurrentStep((prevStep) => (prevStep = 2));
                break;
            default:
                return;
        }
    };

    const submitForm = (data) => {
        return submitAPI(data);
    };

    const bookingDescription = `${formData.seating} table for ${
        formData.diners
    } ${formData.diners > 1 ? "diners" : "diner"} on ${dayjs(
        formData.bookDate
    ).format("MM/DD/YYYY")} at ${formData.bookTime}`;

    const subTitles = [
        "Find a table for any occasion",
        bookingDescription,
        "Reservation Confirmed!",
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
                        <BookingForm
                            handleFormData={handleFormData}
                            handleStep={handleStep}
                            formData={formData}
                            availableTimes={availableTimes}
                            dispatch={dispatch}
                        />
                    </>
                )}
                {currentStep === 1 && (
                    <>
                        <PersonalInfoForm
                            handleFormData={handleFormData}
                            handleStep={handleStep}
                            formData={formData}
                            submitForm={submitForm}
                        />
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <ConfirmedBooking formData={formData} />
                    </>
                )}
            </div>
        </>
    );
}

export default BookingPage;
