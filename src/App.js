import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Nav from "./components/Nav/Nav";
import Homepage from "./pages/Homepage/Homepage";
import BookingPage from "./pages/BookingPage";
import { theme } from "./lib/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
