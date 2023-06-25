import { Box, Stack } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormWrapper from "./FormWrapper";

const schema = yup.object();

function PersonalInfoForm({ handleStep }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}></FormWrapper>
        </>
    );
}

export default PersonalInfoForm;
