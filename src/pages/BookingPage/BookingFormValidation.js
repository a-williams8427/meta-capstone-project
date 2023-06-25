import dayjs from "dayjs";
import * as yup from "yup";

export const openHour = dayjs().set("hour", 17).startOf("hour");
export const closeHour = dayjs().set("hour", 22).startOf("hour");

export const minDiners = 1;
export const maxDiners = 16;

export const schema = yup.object().shape({
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
