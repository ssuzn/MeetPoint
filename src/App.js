import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import MidFindPage from "./pages/MidFindPage";
import MyPage from "./pages/MyPage";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 새로고침 시에도 로그인 유지
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(
        loginSuccess({
          email: storedUser.email,
          nickname: storedUser.nickname,
        })
      );
    }
  }, [dispatch]);
  
  return (
    <Container>
      <Loading />
      <Header />

      <Page>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/find-midpoint" element={<MidFindPage />} />
          <Route path="/mypage" element={<MyPage />} />
          
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
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
