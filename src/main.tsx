import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmotionSelectPage from "./pages/emotion-select/EmotionSelectPage";
import EmotionConfirmPage from "./pages/emotion-confirm/EmotionConfirmPage";
import "./App.scss";
import EmotionActivityPage from "./pages/emotion-activity/EmotionActivityPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmotionSelectPage />} />
        <Route path="/confirm/:emotion" element={<EmotionConfirmPage />} />
        <Route path="/activity/:emotion" element={<EmotionActivityPage />} />
        <Route path="*" element={<EmotionSelectPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
