import React, { useContext } from "react";
import { BookingContext } from "../../Contexts/BookingContext";
import { InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import YellowButton from "../../components/YellowButton";
import FormWrapper from "./FormWrapper";
import {
    openHour,
    closeHour,
    schema,
    maxDiners,
    minDiners,
} from "./BookingFormValidation";

function BookingForm() {
    const { handleFormData, handleStep, formData } = useContext(BookingContext);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            bookDate: formData.bookDate,
            bookTime: formData.bookTime,
            diners: formData.diners,
            occasion: formData.occasion,
            seating: formData.seating,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        handleFormData(data);
        handleStep("step");
    };

    const occasions = ["Birthday", "Anniversary", "Holiday", "Gathering"];

    return (
        <>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 1, sm: 2 }}
                >
                    <Controller
                        control={control}
                        name="bookDate"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Date"
                                disablePast
                                onChange={(e) => field.onChange(e)}
                                onClose={() => trigger(field.name)}
                                value={field.value || null}
                                slotProps={{
                                    textField: {
                                        error: !!errors.bookDate,
                                        helperText: errors.bookDate?.message,
                                        fullWidth: true,
                                        required: true,
                                    },
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="bookTime"
                        render={({ field }) => (
                            <TimePicker
                                {...field}
                                label="Time"
                                minTime={openHour}
                                maxTime={closeHour}
                                closeOnSelect={false}
                                onChange={(e) => field.onChange(e)}
                                onClose={() => trigger(field.name)}
                                value={field.value || null}
                                slotProps={{
                                    textField: {
                                        error: !!errors.bookTime,
                                        helperText: errors.bookTime?.message,
                                        fullWidth: true,
                                        required: true,
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
                <TextField
                    label="Number of Diners"
                    type="number"
                    fullWidth
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <GroupIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        min: minDiners,
                        max: maxDiners,
                    }}
                    {...register("diners")}
                    error={!!errors.diners}
                    helperText={errors.diners?.message}
                />
                <Controller
                    name="occasion"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Occasion"
                            select
                            fullWidth
                            error={!!errors.occasion}
                            helperText={errors.occasion?.message}
                        >
                            {occasions.map((occasion) => (
                                <MenuItem key={occasion} value={occasion}>
                                    {occasion}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <Controller
                    name="seating"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Seating Option"
                            select
                            fullWidth
                            required
                            error={!!errors.seating}
                            helperText={errors.seating?.message}
                        >
                            <MenuItem value={"Indoor"}>Indoor</MenuItem>
                            <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                        </TextField>
                    )}
                />
                <YellowButton type="submit" variant="contained" fullWidth>
                    Continue
                </YellowButton>
            </FormWrapper>
        </>
    );
}

export default BookingForm;
