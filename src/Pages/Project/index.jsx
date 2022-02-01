import React from "react";
import {
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import useApi from "../../shared/hooks/api";
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
import EpicDetails from "./EpicDetails";
import History from "./History";

const Project = ({ setProject, epicUnderView }) => {
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();

  const issueCreateModalHelpers = createQueryParamModalHelpers("issue-create");
  const epicCreateModalHelpers = createQueryParamModalHelpers("epic-create");
  const epicDetailsModalHelpers = createQueryParamModalHelpers("epic-details");

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
          onClose={() => {
            history.goBack();
          }}
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
          onClose={() => {
            history.goBack();
          }}
          renderContent={modal => (
            <EpicCreate
              fetchProject={fetchProject}
              onCreate={modal.close}
              modalClose={modal.close}
            />
          )}
        />
      )}

      {epicDetailsModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:epic-details"
          width={1040}
          withCloseIcon={false}
          onClose={() => {
            history.goBack();
          }}
          renderContent={modal => (
            <EpicDetails
              epic={epicUnderView}
              projectUsers={project.users}
              fetchProject={fetchProject}
              modalClose={modal.close}
            />
          )}
        />
      )}

      <Route
        path={`${match.path}/board`}
        render={() => (
          <Board
            fetchProject={fetchProject}
            epicDetailsModalOpen={epicDetailsModalHelpers.open}
          />
        )}
      />

      <Route
        path={`${match.url}/backlog`}
        render={() => (
          <Backlog
            issueCreateModalOpen={issueCreateModalHelpers.open}
            epicCreateModalOpen={epicCreateModalHelpers.open}
            epicDetailsModalOpen={epicDetailsModalHelpers.open}
            fetchProject={fetchProject}
          />
        )}
      />

      <Route
        path={`${match.path}/history`}
        render={() => {
          return (
            <History
              issueCreateModalOpen={issueCreateModalHelpers.open}
              epicCreateModalOpen={epicCreateModalHelpers.open}
              epicDetailsModalOpen={epicDetailsModalHelpers.open}
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
const mapStatetoProps = state => ({
  epicUnderView: state.epicState.epicUnderView
});

export default connect(mapStatetoProps, mapDispatchToProps)(Project);
