import React from "react";
import styled from "styled-components";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, nickname } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => (window.location.href = "/")}>MeetPoint</Logo>

      <NavMenu>
        <NavItem href="/features">기능 소개</NavItem>
        <NavItem href="/about">서비스 소개</NavItem>
        <NavItem href="/faq">FAQ</NavItem>
      </NavMenu>

      <UtilityButtons>
        <IconButton>
          <FiBell size={20} style={{ width: "24px" }}/>
        </IconButton>
        <IconButton>
          <FiUser size={20} onClick={() => (window.location.href = "/mypage")} style={{ width: "24px" }}/>
        </IconButton>

        {isLoggedIn ? (
          <UserInfo>
            <UserNick>{nickname} 님</UserNick>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </UserInfo>
        ) : (
          <UserInfo>
            <LoginButton onClick={() => (window.location.href = "/signup")}>
              회원가입
            </LoginButton>
            <LoginButton onClick={() => (window.location.href = "/login")}>
              로그인
            </LoginButton>
          </UserInfo>
        )}

      </UtilityButtons>

      <HamburgerMenu>
        <FiMenu size={24} />
      </HamburgerMenu>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #ffffff;
  color: #333333;
  border-bottom: 1px solid #eaeaea;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #574240;
  cursor: pointer;

  &:hover {
    color: rgb(66, 49, 48);
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #333333;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    color: rgb(66, 49, 48);
  }
`;

const UtilityButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 3px;
  background: transparent;
  cursor: pointer;
  color: #333333;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgb(66, 49, 48);
  }
`;

const LoginButton = styled.button`
  padding: 6px 15px;
  font-size: 12px;
  color: #574240;
  background: transparent;
  border: 1px solid #574240;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(66, 49, 48);
    color: #fff;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    color: #333333;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 15px;
`;

const UserNick = styled.div`
  font-weight: 500;
  align-content: center;
`;

const LogoutButton = styled.button`
  padding: 6px 15px;
  font-size: 12px;
  color: #574240;
  background: transparent;
  border: 1px solid #574240;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(66, 49, 48);
    color: #fff;
  }
`;
