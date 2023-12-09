import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmotionSelectPage from "./pages/emotion-select/EmotionSelectPage";
import EmotionConfirmPage from "./pages/emotion-confirm/EmotionConfirmPage";
import "./App.scss";
import EmotionActivityPage from "./pages/emotion-activity/EmotionActivityPage";
import EmotionJournalPage from "./pages/emotion-journal/EmotionJournalPage";
import LoginPage from "./pages/login/LoginPage";
import UserInfoPage from "./pages/user-info/UserInfoPage";
import CreateUserPage from "./pages/create-user/CreateUserPage";
import AuthenticatedRoute from "./utils/GuardedRoute";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatedRoute />}>
          <Route path="/" element={<EmotionSelectPage />} />
        </Route>

        <Route path="/user-info" element={<AuthenticatedRoute />}>
          <Route path="/user-info" element={<UserInfoPage />} />
        </Route>

        <Route path="/confirm/:emotion" element={<AuthenticatedRoute />}>
          <Route path="/confirm/:emotion" element={<EmotionConfirmPage />} />
        </Route>

        <Route path="/activity/:emotion" element={<AuthenticatedRoute />}>
          <Route path="/activity/:emotion" element={<EmotionActivityPage />} />
        </Route>

        <Route path="/journal/:emotion" element={<AuthenticatedRoute />}>
          <Route path="/journal/:emotion" element={<EmotionJournalPage />} />
        </Route>

        <Route path="*" element={<AuthenticatedRoute />}>
          <Route path="*" element={<EmotionSelectPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
