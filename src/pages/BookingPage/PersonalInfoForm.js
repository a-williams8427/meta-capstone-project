import { Stack, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormWrapper from "./FormWrapper";
import YellowButton from "../../components/YellowButton";

const maxNameLength = 50;
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneNumberLength = 10;
const maxEmailLength = 320;
const maxTextFieldLength = 300;

const schema = yup.object({
    firstName: yup
        .string()
        .max(
            maxNameLength,
            "Please use a first name that is less than 50 characters"
        )
        .required("Please give a first name for the reservation"),
    lastName: yup
        .string()
        .max(
            maxNameLength,
            "Please use a last name that is less than 50 characters"
        )
        .required("Please give a last name for the reservation"),
    phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Please provide a valid phone number.")
        .length(phoneNumberLength, "Please provide a number that is 10 digits")
        .required("Please provide a phone number."),
    email: yup
        .string()
        .email("Please provide a valid email.")
        .max.required("Please provide an email"),
    request: yup.string(),
});

function PersonalInfoForm({ handleStep }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            request: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <TextField
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
                    label="Last Name"
                    type="tel"
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
                    label="Phone Number"
                    type="text"
                    fullWidth
                    required
                    inputProps={{
                        max: phoneNumberLength,
                    }}
                    {...register("phoneNumber")}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />
                <TextField
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
                <YellowButton type="submit" variant="contained" fullWidth>
                    Book
                </YellowButton>
            </FormWrapper>
        </>
    );
}

export default PersonalInfoForm;