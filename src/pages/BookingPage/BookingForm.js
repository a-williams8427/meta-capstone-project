import React from "react";
import dayjs from "dayjs";
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const openHour = dayjs().set("hour", 17).startOf("hour");
const closeHour = dayjs().set("hour", 22).startOf("hour");

const schema = yup.object().shape({
    bookDate: yup
        .mixed()
        .required("Please select a date")
        .test(
            "futureDate",
            "Please choose a date that hasn't passed",
            function (value) {
                const currentDate = dayjs().startOf("day");
                const selectedDate = dayjs(value).startOf("day");

                return (
                    selectedDate.isSame(currentDate) ||
                    selectedDate.isAfter(currentDate)
                );
            }
        ),
    bookTime: yup
        .mixed()
        .required("Please select a time")
        .test(
            "futureTime",
            "Please select a date and time in the future and within our open hours",
            function (value) {
                const { bookDate } = this.parent;
                const currentDate = dayjs();
                const selectedDateTime = dayjs(bookDate)
                    .set("hour", value.hour())
                    .set("minute", value.minute())
                    .set("second", value.second());

                const isOpen =
                    value.hour() >= openHour.hour() &&
                    value.hour() <= closeHour.hour();

                console.log(
                    currentDate.toDate(),
                    selectedDateTime.toDate(),
                    isOpen,
                    value.hour()
                );
                if (
                    (selectedDateTime.isAfter(currentDate) && !isOpen) ||
                    !isOpen
                ) {
                    return this.createError({
                        message: `Please select a time between ${openHour.format(
                            "hh:mm A"
                        )} and ${closeHour.format("hh:mm A")}`,
                        path: "bookTime",
                    });
                }
                if (selectedDateTime.isBefore(currentDate)) {
                    return this.createError({
                        message: "Please select a date and time in the future",
                        path: "bookTime",
                    });
                }

                return selectedDateTime.isAfter(currentDate) && isOpen;
            }
        ),
    diners: yup
        .number()
        .min(1, "Please chose at least 1 person as a guest")
        .max(12, "We can only seat 16 people per reservation")
        .required("Please pick the number diners"),
});

function BookingForm() {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            bookDate: dayjs(),
            bookTime: openHour,
            diners: undefined,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    //console.log(errors.bookDate);
    console.log(watch("diners"));

    const fieldWidthFull = "52ch";
    const fieldWidthHalf = "25ch";

    return (
        <>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                autoComplete="off"
                textAlign={"center"}
            >
                <div>
                    <Controller
                        control={control}
                        name="bookDate"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Date"
                                disablePast
                                sx={{ width: fieldWidthHalf }}
                                onChange={(e) => field.onChange(e)}
                                onClose={() => trigger(field.name)}
                                value={field.value || null}
                                slotProps={{
                                    textField: {
                                        error: !!errors.bookDate,
                                        helperText: errors.bookDate?.message,
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
                                sx={{ width: fieldWidthHalf }}
                                onChange={(e) => field.onChange(e)}
                                onClose={() => trigger(field.name)}
                                value={field.value || null}
                                slotProps={{
                                    textField: {
                                        error: !!errors.bookTime,
                                        helperText: errors.bookTime?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: fieldWidthFull }}
                        label="Number of Diners"
                        type="number"
                        fullWidth
                        onBlur={() => trigger("diners")}
                        {...register("diners")}
                        error={!!errors.diners}
                        helperText={errors.diners?.message}
                    />
                </div>
            </Box>
        </>
    );
}

export default BookingForm;
