import React from "react";
import styled from "styled-components";
import { Button, Nav, Logo, Article } from "../commons/styled";

interface INavigationProps {
  isMobi: boolean;
}

const Navigation: React.FunctionComponent<INavigationProps> = ({ isMobi }) => (
  <Nav>
    <NavItems>
      <Logo />
      {isMobi ? (
        <ButtonContainer>
          <Hamberger />
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button>Login</Button>
          <Button>Sign up</Button>
        </ButtonContainer>
      )}
    </NavItems>
  </Nav>
);

export default Navigation;

const NavItems = styled(Article)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "inherit",
  background: "none",
});

const ButtonContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Hamberger = styled.img.attrs({
  src:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1920px-Hamburger_icon.svg.png",
  alt: "menu",
})({
  width: "42px",
  height: "42px",
  margin: "0 10px",
  cursor: "pointer",
});
