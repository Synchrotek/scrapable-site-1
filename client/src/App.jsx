import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import CaptchaPage from "./pages/CaptchaPage";
import ValidatePage from "./pages/ValidatePage";
import Welcome from './pages/Welcome';

function App() {
  return (
    <div className="bg-slate-800 h-screen text-white flex flex-col items-center p-5 gap-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CaptchaPage />} />
          <Route path="/validate" element={<ValidatePage />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
