import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmotionSelectPage from "./pages/emotion-select/EmotionSelectPage";
import EmotionConfirmPage from "./pages/emotion-confirm/EmotionConfirmPage";
import "./App.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmotionSelectPage />} />
        <Route path="/confirm" element={<EmotionConfirmPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
