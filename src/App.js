import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import BookingPage from "./pages/BookingPage";
import { theme } from "./lib/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/booking" element={<BookingPage />} />
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
