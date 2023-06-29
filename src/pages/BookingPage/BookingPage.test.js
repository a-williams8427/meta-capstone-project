import { fireEvent, render, screen } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingPage from "./BookingPage";

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
const dateErrorMessageText = "Please select a date that hasn't passed.";
const dinerErrorMessageText = "Please chose at least 1 person as a guest";

describe("BookingForm", () => {
    it("initialized time shows the default time slots", () => {
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

    it("update times slots based on date change", () => {
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

    it("checks for error messages on invalid form entries", async () => {
        render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BookingPage />
            </LocalizationProvider>
        );
        const testDate = "01/26/2020";
        const testDiners = 0;

        const dateInput = screen.getByLabelText("Date *");
        fireEvent.change(dateInput, { target: { value: testDate } });

        const dinerInput = screen.getByLabelText("Number of Diners *");
        fireEvent.change(dinerInput, { target: { value: testDiners } });

        const submitButton = screen.getByRole("button", { name: "Continue" });

        fireEvent.submit(submitButton);

        const dateErrorMessage = await screen.findByText(dateErrorMessageText);
        const dinerErrorMessage = await screen.findByText(
            dinerErrorMessageText
        );
        expect(dateErrorMessage).toBeInTheDocument();
        expect(dinerErrorMessage).toBeInTheDocument();
    });

    it("checks for no error messages on valid form entries", async () => {
        render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BookingPage />
            </LocalizationProvider>
        );
        const testDate = "01/26/2030";
        const testDiners = 6;

        const dateInput = screen.getByLabelText("Date *");
        fireEvent.change(dateInput, { target: { value: testDate } });

        const dinerInput = screen.getByLabelText("Number of Diners *");
        fireEvent.change(dinerInput, { target: { value: testDiners } });

        const submitButton = screen.getByRole("button", { name: "Continue" });

        fireEvent.submit(submitButton);

        const dateErrorMessage = screen.queryByText(dateErrorMessageText);
        const dinerErrorMessage = screen.queryByText(dinerErrorMessageText);
        expect(dateErrorMessage).not.toBeInTheDocument();
        expect(dinerErrorMessage).not.toBeInTheDocument();
    });
});
