import React, { useContext } from "react";
import { BookingContext } from "../../Contexts/BookingContext";
import dayjs from "dayjs";
import { InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YellowButton from "../../components/YellowButton";
import FormWrapper from "./FormWrapper";

const openHour = dayjs().set("hour", 17).startOf("hour");
const closeHour = dayjs().set("hour", 22).startOf("hour");

const minDiners = 1;
const maxDiners = 16;

const occasions = ["Party", "Business", "Holiday", "Gathering"];

const schema = yup.object().shape({
    bookDate: yup.mixed().required("Please select a date"),
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

                const isSameDay = selectedDateTime
                    .startOf("day")
                    .isSame(currentDate.startOf("day"));
                const isBeforeCurrentDateTime =
                    selectedDateTime.isBefore(currentDate);

                const isOpen =
                    value.hour() >= openHour.hour() &&
                    value.hour() <= closeHour.hour();

                if (selectedDateTime.isAfter(currentDate) && !isOpen) {
                    return this.createError({
                        message: `Please select a time between ${openHour.format(
                            "hh:mm A"
                        )} and ${closeHour.format("hh:mm A")}`,
                        path: "bookTime",
                    });
                }
                if (
                    isSameDay &&
                    isBeforeCurrentDateTime &&
                    currentDate.isBefore(closeHour)
                ) {
                    return this.createError({
                        message: `Please select a time after ${currentDate.format(
                            "hh:mm A"
                        )}`,
                        path: "bookTime",
                    });
                }
                if (
                    isSameDay &&
                    isBeforeCurrentDateTime &&
                    currentDate.isAfter(closeHour)
                ) {
                    return this.createError({
                        message: `We are closed for today, please select a date after ${currentDate.format(
                            "MM/DD/YYYY"
                        )}`,
                        path: "bookDate",
                    });
                }
                if (isBeforeCurrentDateTime) {
                    return this.createError({
                        message: "Please select a date in the future.",
                        path: "bookDate",
                    });
                }

                return selectedDateTime.isAfter(currentDate) && isOpen;
            }
        ),
    diners: yup
        .number()
        .min(minDiners, `Please chose at least ${minDiners} person as a guest`)
        .max(maxDiners, `We can only seat ${maxDiners} people per reservation`)
        .required("Please pick the number diners"),
    occasion: yup.string(),
    seating: yup.string().required("Please select a seating option"),
});

function BookingForm() {
    const { handleFormData, handleStep } = useContext(BookingContext);

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
            diners: 0,
            occasion: "",
            seating: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        handleFormData(data);
        handleStep();
    };

    //console.log(errors.diners);
    //console.log(watch("diners"));

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
