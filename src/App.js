import React from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
import MidFindPage from "./pages/MidFindPage";

function App() {
  return (
    <React.Fragment>
      <Loading />
      <Routes>
        <Route path="/" element={<MidFindPage />} />
      </Routes>
    </React.Fragment>
  )  
}

export default App;
