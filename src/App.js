import React from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import MidFindPage from "./pages/MidFindPage";

function App() {
  return (
    <React.Fragment>
      <Loading />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/find-midpoint" element={<MidFindPage />} />
      </Routes>
    </React.Fragment>
  )  
}

export default App;
