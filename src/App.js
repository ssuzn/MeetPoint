import React from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import MidFindPage from "./pages/MidFindPage";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/midfind" element={<MidFindPage />} />
      </Routes>
    </React.Fragment>
  )  
}

export default App;
