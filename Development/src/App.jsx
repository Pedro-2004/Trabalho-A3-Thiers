import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/LoginPage/index";
import CommitmentRegistration from "./Page/CommitmentRegistration";
import Styles from "./Styles/App.module.css";
const App = () => {
  return (
    <div className={Styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/CommitmentRegistration"
            element={<CommitmentRegistration />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
