import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import MidFindPage from "./pages/MidFindPage";

function App() {
  return (
    <Container>
      <Loading />
      <Header />

      <Page>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/find-midpoint" element={<MidFindPage />} />
        </Routes>
      </Page>

      <Footer />
    </Container>
  )  
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Page = styled.div`
  flex: 1;
  background-color: #f9f9f9;
`;
