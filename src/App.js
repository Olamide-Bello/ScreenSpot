import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import Homepage from "./Pages/Homepage";
import DetailPage from "./Pages/DetailPage";
import More from "./Pages/More";
import TvPage from "./Pages/TvPage";
import UpcomingPage from "./Pages/UpcomingPage";
import TvDetailPage from "./Pages/TvDetailPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center"/>
      <Routes>
         <Route path="/" element={<Homepage/>} />
         <Route path="/movies/:id" element={<DetailPage/>} />
         <Route path="/tv/:id" element={<TvDetailPage/>} />
         <Route path="/home" element={<Homepage />} />
         <Route path="/movies" element={<More/>} />
         <Route path="/tv" element={<TvPage/>} />
         <Route path="/upcoming" element={<UpcomingPage/>} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
