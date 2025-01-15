import React from "react";
import styled from "styled-components";
import {
  FaUserCircle,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCog,
  FaPencilAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function MyPage() {
  const { nickname } = useSelector((state) => state.user);

  return (
    <MyPageContainer>

      <ProfileSection>
        <ProfileImage>
          <FaUserCircle size="80" color="#574240" />
        </ProfileImage>
        <UserInfo>
          <Username>{nickname}</Username>
          <EditProfileButton>프로필 수정</EditProfileButton>
        </UserInfo>
      </ProfileSection>

      <MenuGrid>
        <MenuItem>
          <FaMapMarkerAlt size="30" />
          <MenuText>자주 가는 장소</MenuText>
        </MenuItem>
        <MenuItem>
          <FaStar size="30" />
          <MenuText>즐겨찾기</MenuText>
        </MenuItem>
        <MenuItem>
          <FaPencilAlt size="30" />
          <MenuText>내가 쓴 리뷰</MenuText>
        </MenuItem>
        <MenuItem>
          <FaCalendarAlt size="30" />
          <MenuText>내 일정 관리</MenuText>
        </MenuItem>
        <MenuItem>
          <FaCog size="30" />
          <MenuText>설정</MenuText>
        </MenuItem>
      </MenuGrid>
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  margin-right: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #333;
`;

const EditProfileButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 700;
  background: transparent;
  color: #574240;
  border: 1px solid #574240;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(66, 49, 48);
    color: #fff;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const MenuItem = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MenuText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
