import Logo from "../../assets/dzen-logo.svg?react";
import LogoText from "../../assets/dzen-text.svg?react";
import { Container } from "../Container";
import { HeaderWrapper, LogoLink } from "./Header.styled";

export const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <header>
          <LogoLink href="/">
            <Logo />
            <LogoText />
          </LogoLink>
          <h1> Test </h1>
        </header>
      </Container>
    </HeaderWrapper>
  );
};
