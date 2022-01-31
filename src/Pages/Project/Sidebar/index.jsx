import React from "react";
import PropTypes from "prop-types";
import { NavLink, useRouteMatch } from "react-router-dom";

import { ProjectTypeCopy } from "../../../shared/constants/projects";
import { Icon, ProjectAvatar } from "../../../shared/components";

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  NotImplemented
} from "./Styles";

const propTypes = {
  project: PropTypes.object.isRequired
};

const ProjectSidebar = ({ project }) => {
  const match = useRouteMatch();

  return (
    <Sidebar>
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>{project.name}</ProjectName>
          <ProjectCategory>
            {ProjectTypeCopy[project.category]} Project
          </ProjectCategory>
        </ProjectTexts>
      </ProjectInfo>

      {renderLinkItem(match, "Active Sprint", "board", "/board")}
      {renderLinkItem(match, "Backlog", "plus", "/backlog")}
      {renderLinkItem(match, "History", "menu", "/history")}
      {renderLinkItem(match, "Project settings", "settings", "/settings")}
      <Divider />
      {renderLinkItem(match, "Back to Projects", "arrow-left", "../projects")}
    </Sidebar>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? {
        as: NavLink,
        exact: true,
        to: path.includes("..")
          ? `${path.replaceAll(".", "")}`
          : `${match.url}${path}`
      }
    : { as: "div" };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
