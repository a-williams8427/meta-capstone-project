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

// test("renders the Date label", () => {
//     render(
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <BookingPage />
//         </LocalizationProvider>
//     );
//     const fieldLabel = screen.getByLabelText("Date *");
//     expect(fieldLabel).toBeInTheDocument();
// });

test("initailized time shows the default time slots", () => {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BookingPage />
        </LocalizationProvider>
    );
    const timeInput = screen.getByLabelText("Time Slots");
    fireEvent.mouseDown(timeInput);

    const timeOptions = screen.getAllByRole("option");

    expect(timeOptions).toHaveLength(6);
    expect(timeOptions[0]).toContainHTML("5:00 PM");
    expect(timeOptions[1]).toContainHTML("6:00 PM");
    expect(timeOptions[2]).toContainHTML("7:00 PM");
    expect(timeOptions[3]).toContainHTML("8:00 PM");
    expect(timeOptions[4]).toContainHTML("9:00 PM");
    expect(timeOptions[5]).toContainHTML("10:00 PM");
});

test("update times slots based on date change", () => {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BookingPage />
        </LocalizationProvider>
    );
    const dateInput = screen.getByLabelText("Date *");
    fireEvent.change(dateInput, { target: { value: "06/29/2023" } });

    const timeInput = screen.getByLabelText("Time Slots");
    fireEvent.mouseDown(timeInput);

    const timeOptions = screen.getAllByRole("option");

    expect(dateInput).toHaveValue("06/29/2023");
    expect(timeOptions).toHaveLength(6);
    expect(timeOptions[0]).toContainHTML("5:00 PM");
});
