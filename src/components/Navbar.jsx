import React, { useEffect, useState, useContext } from "react";
import { animateScroll } from "react-scroll";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color_theme, text_theme } from "../theme";
import useWindowDimensions from "../hooks/useWindowDimensions";

const rgbMultiplier = 1.25;

const barRGB = `${color_theme.rgb.primary.r * rgbMultiplier}, ${
  color_theme.rgb.primary.g * rgbMultiplier
}, ${color_theme.rgb.primary.b * rgbMultiplier}`;

const Bar = styled.div`
  background-color: ${(props) =>
    props.solid
      ? css`
      rgb(${barRGB});
        `
      : css`
      rgba(${barRGB}, 0.5);
        `}
  display: flex;
  flex-direction: row;
  color: white;
  height: 8vh;
  align-items: stretch;
  padding: 10px 20px;
  transition: 0.5s;

  font-family: ${text_theme.header.font};

  @media screen and (max-width: 600px) {
    padding: 5px 10px;
  }
`;

const ItemList = styled.div`
  background: transparent;
  transition: 0.5s;
  align-self: right;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ItemLink = styled(Link)`
  background: transparent;
  transition: 0.5s;
  align-self: right;
  margin-right: 10px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  align-items: center;
  display: flex;
  padding: 0px 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media screen and (max-width: 600px) {
    font-size: 15px;
    padding: 0px 5px;
    margin-right: 3px;
  }
`;

const ItemGoTo = styled.div`
  background: transparent;
  transition: 0.5s;
  align-self: right;
  margin-right: 10px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  align-items: center;
  display: flex;
  padding: 0px 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media screen and (max-width: 600px) {
    font-size: 15px;
    padding: 0px 5px;
    margin-right: 3px;
  }
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 30px;
  transition: 0.5s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

const NavButton = styled.div`
  background: transparent;
  transition: 0.5s;
  align-self: right;
  margin-right: 10px;
  color: white;
  text-decoration: none;
  font-size: 25px;
  align-items: center;
  display: flex;
  padding: 0px 10px;
  margin-right: 3px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;

  background: url(${(props) => props.src}) center center no-repeat;
  background-size: contain;
  padding: 5px;
  margin-right: 10px;
  transition: 0.5s;
  @media screen and (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const OpenContext = React.createContext(null);

const Navbar = ({ solid = false }) => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const menuIconAppearWidth = 800;

  useEffect(() => {
    if (width > menuIconAppearWidth) {
      setOpen(false);
    }
  }, [width]);

  return (
    <Bar solid={solid}>
      <TitleLink to="/" replace={pathname === "/"}>
        <Logo src="../images/logo.png" />
        Texas VCG
      </TitleLink>
      <ItemList>
        {width > menuIconAppearWidth ? (
          <>
            <ItemLink to="/about" replace={pathname === "/about"}>
              About
            </ItemLink>
            <ItemLink to="/team" replace={pathname === "/team"}>
              Team
            </ItemLink>
            <ItemLink to="/members" replace={pathname === "/members"}>
              For Members
            </ItemLink>
            {/*<ItemLink to="/resources" replace={pathname === "/resources"}>
              Resources
            </ItemLink>*/}
            <ItemGoTo onClick={() => animateScroll.scrollToBottom()}>
              Contact
            </ItemGoTo>
          </>
        ) : (
          <NavButton onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={["fas", "bars"]} />
            <OpenContext.Provider value={{ open, setOpen }}>
              <Sidebar>
                <ItemLink to="/about" replace={pathname === "/about"}>
                  About
                </ItemLink>
                <ItemLink to="/team" replace={pathname === "/team"}>
                  Team
                </ItemLink>
                <ItemLink to="/members" replace={pathname === "/members"}>
                  For Members
                </ItemLink>
                {/*<ItemLink to="/resources" replace={pathname === "/resources"}>
                      Resources
                </ItemLink>*/}
                <ItemGoTo onClick={() => animateScroll.scrollToBottom()}>
                  Contact
                </ItemGoTo>
              </Sidebar>
            </OpenContext.Provider>
          </NavButton>
        )}
      </ItemList>
    </Bar>
  );
};

const Icon = styled(FontAwesomeIcon)``;

const VerticalBar = styled.div`
  background-color: rgb(${color_theme.primary});
  position: fixed;
  top: 0px;
  ${(props) =>
    props.expanded
      ? css`
          right: 0px;
        `
      : css`
          right: -40vw;
        `}
  height: 100vh;
  width: 40vw;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 0px;
  transition: right 0.5s;

  & > * {
    margin-bottom: 10px;
    padding: 10px 20px;
  }

  @media screen and (max-width: 600px) {
    width: 60vw;
    & > * {
      margin-bottom: 5px;
      padding: 10px 20px;
    }
    ${(props) =>
      props.expanded
        ? css`
            right: 0px;
          `
        : css`
            right: -60vw;
          `}
  }
`;

const Cover = styled.div`
  
  position: fixed;
  background-color: ${(props) =>
    props.expanded
      ? css`
          rgba(0,0,0,0.75);
        `
      : css`
      rgba(0,0,0,0);
        `}
  width: ${(props) =>
    props.expanded
      ? css`
          100vw;
        `
      : css`
      0px;
        `}
  height: 100vh;
  right: 0px;
  top: 0px;
  transition: 0.33s;
`;

const TitleText = styled(TitleLink)`
  margin-bottom: 0px;
`;

const Split = styled.hr`
  width: 80%;
  border: solid 2px;
  color: white;
  margin: 20px 0px;
  padding: 0px;
`;

const Sidebar = ({ children }) => {
  const { open, setOpen } = useContext(OpenContext);
  const { pathname } = useLocation();

  return (
    <>
      <Cover expanded={open} onCLick={() => setOpen(false)} />
      <VerticalBar expanded={open}>
        <TitleText to="/" replace={pathname === "/"}>
          Texas VCG
        </TitleText>
        <Split />
        {children}
      </VerticalBar>
    </>
  );
};

export default Navbar;
