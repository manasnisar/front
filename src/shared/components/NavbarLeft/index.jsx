import React from "react";

import { Icon } from "../index";

import { NavLeft, LogoLink, Bottom, Item, ItemText, LogoText } from "./Styles";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/api";
import {
  getStoredRefreshToken,
  removeStoredAuthToken
} from "../../utils/authToken";

const ProjectNavbarLeft = ({ page }) => {
  const history = useHistory();
  const [, signOut] = useApi.post("/auth/logout");

  return (
    <NavLeft>
      <LogoLink to="/">
        <Logo color="#fff" />
        <LogoText>Sharingan</LogoText>
      </LogoLink>

      {page === "account" ? (
        <Item onClick={() => history.push("/projects")}>
          <Icon type="arrow-left" size={22} top={1} left={3} />
          <ItemText>Projects</ItemText>
        </Item>
      ) : (
        <Item onClick={() => history.push("/account")}>
          <Icon type="settings" size={22} top={1} left={3} />
          <ItemText>Account</ItemText>
        </Item>
      )}

      <Bottom>
        <Item
          onClick={async () => {
            const refreshToken = getStoredRefreshToken();
            await signOut({ refreshToken });
            removeStoredAuthToken();
            history.push("/signin");
          }}
        >
          <Icon type="arrow-left" size={27} />
          <ItemText>Logout</ItemText>
        </Item>
      </Bottom>
    </NavLeft>
  );
};

export default ProjectNavbarLeft;
