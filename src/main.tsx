import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmotionSelectPage from "./pages/emotion-select/EmotionSelectPage";
import EmotionConfirmPage from "./pages/emotion-confirm/EmotionConfirmPage";
import "./App.scss";
import EmotionActivityPage from "./pages/emotion-activity/EmotionActivityPage";
import EmotionJournalPage from "./pages/emotion-journal/EmotionJournalPage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmotionSelectPage />} />
        <Route path="/confirm/:emotion" element={<EmotionConfirmPage />} />
        <Route path="/activity/:emotion" element={<EmotionActivityPage />} />
        <Route path="/journal/:emotion" element={<EmotionJournalPage />} />
        <Route path="*" element={<EmotionSelectPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
