import ThemeProvider from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MobileForm from "./pages/MobileForm";
import OtpForm from "./pages/OtpForm";
import NameForm from "./pages/NameForm";
import AgentForm from "./pages/AgentForm";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/mobile" replace />} />
          <Route path="/mobile" element={<MobileForm />} />
          <Route path="/otp" element={<OtpForm />} />
          <Route path="/name" element={<NameForm />} />
          <Route path="/agent" element={<AgentForm />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
