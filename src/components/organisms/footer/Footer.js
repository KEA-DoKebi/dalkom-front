import React from "react";
import styled from "styled-components";
import { Google, Instagram, LinkedIn, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>Dalkom Shop</h3>
        <p>
          Made with <HeartIcon>&#10084;</HeartIcon> by Dokebi Front-end Team
        </p>
        <SocialsList>
          <li>
            <a href="https://www.google.com">
              <Google sx={{ fontSize: 30, color: "#DB4437" }} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <Instagram sx={{ fontSize: 30, color: "#C13584" }} />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <LinkedIn sx={{ fontSize: 30, color: "#0077B5" }} />
            </a>
          </li>
          <li>
            <a href="https://github.com/KEA-DoKebi">
              <GitHub sx={{ fontSize: 30, color: "#FFFFFF" }} />
            </a>
          </li>
          {/* <li>
            <a href="/">
              <GitHub sx={{ fontSize: 30, color: "#FFFFFF" }} />
            </a>
          </li> */}
        </SocialsList>
      </FooterContent>
      <FooterBottom>
        <p>
          copyright &copy; <a href="/">food Junction</a>{" "}
        </p>
        <span>Project with DKTechIn Mentors</span>
        <FooterMenu>
          <ul>
            <li>
              <a href="/">Main</a>
            </li>
            <li>
              <a href="/">Ask Us</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
          </ul>
        </FooterMenu>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #111;
  height: auto;
  padding-top: 40px;
  margin-top: 50px;
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-family: cursive;

  h3 {
    font-size: 2.1rem;
    font-weight: 500;
    text-transform: capitalize;
    line-height: 3rem;
  }

  p {
    max-width: 500px;
    margin: 10px auto;
    line-height: 28px;
    font-size: 14px;
    color: #cacdd2;
  }
`;

const HeartIcon = styled.span`
  color: red;
`;

const SocialsList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 2rem 3rem 0;

  li {
    margin: 0 10px;
  }

  a {
    text-decoration: none;
    color: #fff;
    padding: 5px;
    border-radius: 50%;
  }

  a:hover {
    i {
      color: aqua;
    }
  }

  i {
    font-size: 1.1rem;
    width: 20px;
    transition: color 0.4s ease;
  }
`;

const FooterBottom = styled.div`
  background: #000;
  width: 100vw;
  padding: 20px;
  font-size: 13px;
  padding-bottom: 40px;
  text-align: center;
  font-family: cursive;

  p {
    float: left;
    font-size: 13px;
    word-spacing: 2px;
    text-transform: capitalize;

    a {
      color: #44bae8;
      font-size: 15px;
      text-decoration: none;
    }
  }

  span {
    text-transform: uppercase;
    opacity: 0.4;
    font-weight: 200;
  }
`;

const FooterMenu = styled.div`
  float: right;

  ul {
    display: flex;
  }

  ul li {
    padding-right: 10px;
    display: block;
  }

  ul li a {
    color: #cfd2d6;
    text-decoration: none;
  }

  ul li a:hover {
    color: #27bcda;
  }
`;

export default Footer;
