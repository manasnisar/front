import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../index";

import { NavLeft, LogoLink, Bottom, Item, ItemText, LogoText } from "./Styles";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/api";
import {
  getStoredRefreshToken,
  removeStoredAuthToken
} from "../../utils/authToken";

const propTypes = {
  issueCreateModalOpen: PropTypes.func,
  page: PropTypes.string.isRequired
};

const ProjectNavbarLeft = ({
  issueCreateModalOpen,
  epicCreateModalOpen,
  page
}) => {
  const history = useHistory();
  const [, signOut] = useApi.post("/auth/logout");

  return (
    <NavLeft>
      <LogoLink to="/">
        <Logo color="#fff" />
        <LogoText>Sharingan</LogoText>
      </LogoLink>

      {page === "backlog" && (
        <div>
          <Item onClick={issueCreateModalOpen}>
            <Icon type="plus" size={27} />
            <ItemText>Create Issue</ItemText>
          </Item>
          <Item onClick={epicCreateModalOpen}>
            <Icon type="plus" size={27} />
            <ItemText>Create Epic</ItemText>
          </Item>
        </div>
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

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
