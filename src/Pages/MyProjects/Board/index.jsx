import React, { Fragment } from "react";
import PropTypes from "prop-types";
import useMergeState from "../../../shared/hooks/mergeState";
import Header from "./Header";
import Filters from "./Filters";
import ProjectsTable from "./ProjectsTable";

const propTypes = {
  projects: PropTypes.array.isRequired,
  openCreateProjectModal: PropTypes.func.isRequired
};

const defaultFilters = {
  searchTerm: ""
};

const ProjectBoard = ({ projects, openCreateProjectModal }) => {
  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      <Header openCreateProjectModal={openCreateProjectModal} />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <ProjectsTable projects={projects} filters={filters} />
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
