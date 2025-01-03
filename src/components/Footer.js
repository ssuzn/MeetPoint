import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <Logo>MeetPoint</Logo>
        <LinkGroup>
          <FooterLink href="/about">서비스 소개</FooterLink>
          <FooterLink href="/terms">이용 약관</FooterLink>
          <FooterLink href="/privacy">개인정보 처리방침</FooterLink>
          <FooterLink href="/support">고객 지원</FooterLink>
        </LinkGroup>
        <SocialIcons>
          <SocialIcon href="https://facebook.com" target="_blank">
            <FaFacebookF />
          </SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="https://instagram.com" target="_blank">
            <FaInstagram />
          </SocialIcon>
        </SocialIcons>
      </FooterTop>
      <FooterBottom>
        <Copyright>© 2024 MeetPoint. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  color: #333333;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid #eaeaea;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #574240;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #333333;
  font-size: 14px;

  &:hover {
    color: rgb(66, 49, 48);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: #333333;
  font-size: 18px;

  &:hover {
    color: rgb(66, 49, 48);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  font-size: 14px;
  color: #666666;
`;

const Copyright = styled.p`
  margin: 0;
`;
