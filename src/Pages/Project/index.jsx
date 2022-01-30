import React, { useState } from "react";
import { Route, Redirect, useRouteMatch, useParams } from "react-router-dom";
import useApi from "../../shared/hooks/api";
import { updateArrayItemById } from "../../shared/utils/javascript";
import { createQueryParamModalHelpers } from "../../shared/utils/queryParamModal";
import { PageLoader, PageError, Modal } from "../../shared/components";
import NavbarLeft from "../../shared/components/NavbarLeft";
import Sidebar from "./Sidebar";
import Board from "./Board";
import IssueCreate from "./IssueCreate";
import ProjectSettings from "./ProjectSettings";
import { ProjectPage } from "./Styles";
import Backlog from "./Backlog";
import EpicCreate from "./EpicCreate";
import { connect } from "react-redux";
import { setProject } from "../../redux/project/project-reducer";

const Project = ({ setProject }) => {
  const match = useRouteMatch();
  const params = useParams();

  const issueCreateModalHelpers = createQueryParamModalHelpers("issue-create");
  const epicCreateModalHelpers = createQueryParamModalHelpers("epic-create");

  const [{ data, error }, fetchProject] = useApi.get(
    `/project/manage/${params.id}`
  );

  if (!data) return <PageLoader />;
  if (error) return <PageError />;
  const { project } = data;
  setProject(project);

  return (
    <ProjectPage>
      <NavbarLeft />

      <Sidebar project={project} />

      {issueCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={issueCreateModalHelpers.close}
          renderContent={modal => (
            <IssueCreate
              fetchProject={fetchProject}
              onCreate={modal.close}
              modalClose={modal.close}
            />
          )}
        />
      )}

      {epicCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:epic-create"
          width={800}
          withCloseIcon={false}
          onClose={epicCreateModalHelpers.close}
          renderContent={modal => (
            <EpicCreate
              fetchProject={fetchProject}
              onCreate={modal.close}
              modalClose={modal.close}
            />
          )}
        />
      )}

      <Route
        path={`${match.path}/board`}
        render={() => {
          return <Board fetchProject={fetchProject} />;
        }}
      />

      <Route
        path={`${match.url}/backlog`}
        render={() => {
          return (
            <Backlog
              issueCreateModalOpen={issueCreateModalHelpers.open}
              epicCreateModalOpen={epicCreateModalHelpers.open}
              fetchProject={fetchProject}
            />
          );
        }}
      />

      <Route
        path={`${match.path}/settings`}
        render={() => {
          return <ProjectSettings fetchProject={fetchProject} />;
        }}
      />

      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </ProjectPage>
  );
};

const mapDispatchToProps = dispatch => ({
  setProject: project => dispatch(setProject(project))
});

export default connect(null, mapDispatchToProps)(Project);
