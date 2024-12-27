import React from 'react';
import styled from "styled-components";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

function Header() {
  return (
    <HeaderContainer>
      <Logo onClick={() => window.location.href = "/"}>MeetPoint</Logo>

      <NavMenu>
        <NavItem href="/features">기능 소개</NavItem>
        <NavItem href="/about">서비스 소개</NavItem>
        <NavItem href="/faq">FAQ</NavItem>
      </NavMenu>

      <UtilityButtons>
        <IconButton>
          <FiBell size={20} />
        </IconButton>
        <IconButton>
          <FiUser size={20} />
        </IconButton>
        <LoginButton onClick={() => window.location.href = "/login"}>로그인</LoginButton>
      </UtilityButtons>

      <HamburgerMenu>
        <FiMenu size={24} />
      </HamburgerMenu>
    </HeaderContainer>
  )
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
    color:rgb(66, 49, 48);
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
  background: transparent;
  cursor: pointer;
  color: #333333;

  &:hover {
    color: rgb(66, 49, 48);
  }
`;

const LoginButton = styled.button`
  background-color: #574240;;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: rgb(66, 49, 48);
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