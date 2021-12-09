import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../index";

import { NavLeft, LogoLink, Bottom, Item, ItemText } from "./Styles";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/api";
import {
  getStoredRefreshToken,
  removeStoredAuthToken
} from "../../utils/authToken";

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired
};

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => {
  const history = useHistory();
  const [, signOut] = useApi.post("/auth/logout");

  return (
    <NavLeft>
      <LogoLink to="/">
        <Logo color="#fff" />
      </LogoLink>

      <Item onClick={issueSearchModalOpen}>
        <Icon type="search" size={22} top={1} left={3} />
        <ItemText>Search issues</ItemText>
      </Item>

      <Item onClick={issueCreateModalOpen}>
        <Icon type="plus" size={27} />
        <ItemText>Create Issue</ItemText>
      </Item>

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

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
