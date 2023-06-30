import React from "react";
import { Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormWrapper from "./FormWrapper";
import YellowButton from "../../components/YellowButton";

const maxNameLength = 50;
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const maxPhoneLength = 15;
const maxEmailLength = 320;
const maxTextFieldLength = 300;

const schema = yup.object({
    firstName: yup
        .string()
        .max(
            maxNameLength,
            `Please use a first name that is less than ${maxNameLength} characters`
        )
        .required("Please give a first name for the reservation"),
    lastName: yup
        .string()
        .max(
            maxNameLength,
            `Please use a last name that is less than ${maxNameLength} characters`
        )
        .required("Please give a last name for the reservation"),
    phoneNumber: yup
        .string()
        .required("Please provide a phone number.")
        .matches(phoneRegExp, "Please provide a valid phone number.")
        .max(
            maxPhoneLength,
            "Please provide a number that is less than 15 digits long"
        ),
    email: yup
        .string()
        .email("Please provide a valid email.")
        .max(
            maxEmailLength,
            `Please provide an email less than ${maxEmailLength} characters`
        )
        .required("Please provide an email"),
    request: yup.string(),
});

function PersonalInfoForm({
    handleFormData,
    handleStep,
    formData,
    submitForm,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            request: formData.request,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        handleFormData(data);
        submitForm(formData) && handleStep("submit");
    };
    return (
        <>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    required
                    inputProps={{
                        max: maxNameLength,
                    }}
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    required
                    inputProps={{
                        max: maxNameLength,
                    }}
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
                <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    required
                    inputProps={{
                        max: maxPhoneLength,
                    }}
                    {...register("phoneNumber")}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    inputProps={{
                        max: maxEmailLength,
                    }}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    id="request"
                    label="Special Requests"
                    type="text"
                    fullWidth
                    multiline
                    minRows={3}
                    inputProps={{
                        max: maxTextFieldLength,
                    }}
                    {...register("request")}
                    error={!!errors.request}
                    helperText={errors.request?.message}
                />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width={"100%"}
                    spacing={{ xs: 1, sm: 2 }}
                >
                    <YellowButton
                        id="back"
                        name="back"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            handleStep("back");
                        }}
                    >
                        Back
                    </YellowButton>
                    <YellowButton
                        id="book"
                        name="book"
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Book
                    </YellowButton>
                </Stack>
            </FormWrapper>
        </>
    );
}

export default PersonalInfoForm;
