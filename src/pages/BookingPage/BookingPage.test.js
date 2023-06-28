import {
    fireEvent,
    getByLabelText,
    queryAllByRole,
    render,
    screen,
} from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingPage from "./BookingPage";
import dayjs from "dayjs";
import BookingForm from "./BookingForm";

// test("renders the Date label", () => {
//     render(
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <BookingPage />
//         </LocalizationProvider>
//     );
//     const fieldLabel = screen.getByLabelText("Date *");
//     expect(fieldLabel).toBeInTheDocument();
// });

const timePattern = /^(1[7-9]|2[0-3]):(00|30)$/;

test("initialized time shows the default time slots", () => {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BookingPage />
        </LocalizationProvider>
    );
    const timeInput = screen.getByLabelText("Time Slots");
    fireEvent.mouseDown(timeInput);

    const timeOptions = screen.getAllByRole("option");

    expect(timeOptions).not.toHaveLength(0);
    timeOptions.forEach((option) => {
        expect(option.textContent).toMatch(timePattern);
    });
});

test("update times slots based on date change", () => {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BookingPage />
        </LocalizationProvider>
    );
    const testDate = "08/29/2026";

    const dateInput = screen.getByLabelText("Date *");
    fireEvent.change(dateInput, { target: { value: testDate } });

    const timeInput = screen.getByLabelText("Time Slots");
    fireEvent.mouseDown(timeInput);

    const timeOptions = screen.getAllByRole("option");

    expect(dateInput).toHaveValue(testDate);
    expect(timeOptions).not.toHaveLength(0);
    timeOptions.forEach((option) => {
        expect(option.textContent).toMatch(timePattern);
    });
});
