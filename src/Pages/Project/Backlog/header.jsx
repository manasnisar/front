import React from "react";
import Sprint from "./Sprint";
import { Button } from "../../../shared/components";
import { Header, BoardName, ActionContainer } from "../Styles";
import { HeaderRightContent } from "../../MyProjects/Board/Header/Styles";
import NotificationHandler from "../../../shared/components/Notifications";
import { connect } from "react-redux";

const ProjectBoardHeader = ({
  epicCreateModalOpen,
  projectId,
  fetchProject,
  sprintStatus,
  user,
  project
}) => {
  return (
    <Header>
      <BoardName>Backlog</BoardName>
      <ActionContainer>
        <HeaderRightContent>
          <NotificationHandler/>
          <Button variant="success" onClick={epicCreateModalOpen}>
            Create Epic
          </Button>
          {sprintStatus === "inactive" &&
            (user.role === "owner" || user.id === project.projectLead.id) && (
              <Sprint fetchProject={fetchProject} projectId={projectId} />
            )}
        </HeaderRightContent>
      </ActionContainer>
    </Header>
  );
};

const mapStateToProps = state => ({
  user: state.userState.user,
  project: state.projectState.project
});

export default connect(mapStateToProps)(ProjectBoardHeader);
