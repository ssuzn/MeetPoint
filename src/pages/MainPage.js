import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

  return (
    <Container>
      <MainSection>
        <MainOverlay />
        <MainContent>
          <MainTitle>중간 지점을 쉽고 빠르게 찾아보세요</MainTitle>
          <MainSubtitle>친구, 가족, 동료와의 만남을 더욱 편리하게!</MainSubtitle>
          <CTAButton onClick={() => navigate("/find-midpoint")}>
            중간 지점 찾기 시작하기
          </CTAButton>
        </MainContent>
      </MainSection>

      <FeaturesSection>
        <FeatureCard>
          <h3>🚩 중간 지점 찾기</h3>
          <p>여러 위치를 입력하면 최적의 중간 지점을 찾아드립니다.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>🍽 장소 추천</h3>
          <p>중간 지점 근처의 맛집, 카페, 명소를 추천합니다.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>🕒 소요 시간 확인</h3>
          <p>각 위치에서 중간 지점까지의 소요 시간을 확인하세요.</p>
        </FeatureCard>
      </FeaturesSection>
    </Container>
  );
}

export default MainPage;

export const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

export const MainSection = styled.section`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const MainOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const MainContent = styled.div`
  position: absolute;
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

export const MainSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

export const CTAButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #ff4c4c;
  }
`;

export const FeaturesSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 50px 20px;
  background-color: #f7f7f7;
  flex-wrap: wrap;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 280px;
  transition: transform 0.3s, box-shadow 0.3s;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #555;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;