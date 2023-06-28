import React, { useContext } from "react";
import { BookingContext } from "../../Contexts/BookingContext";
import { InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import YellowButton from "../../components/YellowButton";
import FormWrapper from "./FormWrapper";
import dayjs from "dayjs";
import * as yup from "yup";

// const openHour = dayjs().set("hour", 17).startOf("hour");
// const closeHour = dayjs().set("hour", 22).startOf("hour");

const maxDiners = 16;
const minDiners = 1;

const schema = yup.object().shape({
    bookDate: yup
        .mixed()
        .required("Please select a date")
        .test(
            "correctDate",
            "Please select a date and time in the future and within our open hours",
            function (value) {
                const currentDate = dayjs();
                const selectedDate = value;

                const isSameDay = selectedDate
                    .startOf("day")
                    .isSame(currentDate.startOf("day"));
                const isBefore =
                    selectedDate.isBefore(currentDate) && !isSameDay;
                // const isAfterHours =
                //     selectedDate.isAfter(closeHour) && isSameDay;

                if (isBefore) {
                    return this.createError({
                        message: "Please select a date that hasn't passed.",
                        path: "bookDate",
                    });
                }
            }
        ),
    bookTime: yup.mixed().required("Please select a time"),
    diners: yup
        .number()
        .min(minDiners, `Please chose at least ${minDiners} person as a guest`)
        .max(maxDiners, `We can only seat ${maxDiners} people per reservation`)
        .required("Please pick the number diners"),
    occasion: yup.string(),
    seating: yup.string().required("Please select a seating option"),
});

function BookingForm() {
    const { handleFormData, handleStep, formData, availableTimes, dispatch } =
        useContext(BookingContext);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
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

    //const selectedDate = watch("bookDate");

    const handleDateChange = (date) => {
        console.log(date.toDate());
        dispatch({ type: "update", payload: date });
    };

    const formatNumToHour = (time, format) => {
        return dayjs(time, "HH:mm").format(format);
    };

    const occasions = ["Birthday", "Anniversary", "Holiday", "Gathering"];

    const onSubmit = (data) => {
        console.log(data);
        handleFormData(data);
        handleStep("step");
    };

    return (
        <>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width={"100%"}
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
                                onChange={(e) => {
                                    field.onChange(e);
                                    handleDateChange(e);
                                }}
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
                            <TextField
                                {...field}
                                id="bookTime"
                                label="Time Slots"
                                select
                                fullWidth
                                error={!!errors.bookTime}
                                helperText={errors.bookTime?.message}
                            >
                                {/* TODO: Add filtering function that grabs the bookTime field's value
                                Should work now*/}
                                {availableTimes.map((time) => (
                                    <MenuItem key={time} value={time}>
                                        {formatNumToHour(time, "h:mm A")}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    {/* <Controller
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
                    /> */}
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
