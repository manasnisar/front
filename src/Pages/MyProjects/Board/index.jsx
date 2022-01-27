import React, { Fragment } from "react";
import PropTypes from "prop-types";

import useMergeState from "../../../shared/hooks/mergeState";
import { Divider } from "../../Project/Sidebar/Styles";
import Header from "./Header";
import Filters from "./Filters";
import ProjectsTable from "./ProjectsTable";
import { Route } from "react-router-dom";
import Board from "../../Project/Board";

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired
};

const defaultFilters = {
  searchTerm: "",
  userIds: [],
  myOnly: false,
  recent: false
};

const ProjectBoard = ({ projects, openCreateProjectModal, users }) => {
  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      <Header openCreateProjectModal={openCreateProjectModal} />
      <Filters
        projectUsers={users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <ProjectsTable projects={projects} />
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
