import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, useRouteMatch, useHistory } from "react-router-dom";

import useMergeState from "../../../shared/hooks/mergeState";
import { Breadcrumbs, Modal } from "../../../shared/components";

import Header from "./Header";
import Filters from "./Filters";
import IssueDetails from "./IssueDetails";
import { TitlesAndLists } from "../Board/Styles";
import ProjectBacklogTitleList from "./Titles";
import ProjectBacklogEpics from "./Rows";
import useCurrentUser from "../../../shared/hooks/currentUser";

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired
};

const defaultFilters = {
  searchTerm: "",
  userIds: [],
  myOnly: false,
  recent: false
};

const ProjectBacklog = ({
  project,
  fetchProject,
  updateLocalProjectIssues,
  epicCreateModalOpen,
  issueCreateModalOpen
}) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { currentUserId } = useCurrentUser();

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      <Breadcrumbs items={["Projects", project.name, "Backlog"]} />
      <Header epicCreateModalOpen={epicCreateModalOpen} />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <TitlesAndLists>
        <ProjectBacklogTitleList
          filters={filters}
          project={project}
          currentUserId={currentUserId}
        />
        <ProjectBacklogEpics
          filters={filters}
          project={project}
          updateLocalProjectIssues={updateLocalProjectIssues}
          issueCreateModalOpen={issueCreateModalOpen}
        />
      </TitlesAndLists>
      <Route
        path={`${match.path}/issues/:issueId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:issue-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <IssueDetails
                issueId={routeProps.match.params.issueId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                updateLocalProjectIssues={updateLocalProjectIssues}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />
    </Fragment>
  );
};

ProjectBacklog.propTypes = propTypes;

export default ProjectBacklog;
