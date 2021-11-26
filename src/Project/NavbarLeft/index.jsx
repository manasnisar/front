import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../../shared/components";

import { NavLeft, LogoLink, Bottom, Item, ItemText } from "./Styles";
import Logo from "../../shared/components/Logo";

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired
};

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => (
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

    <Bottom></Bottom>
  </NavLeft>
);

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
