import React from "react";
import Sprint from "./Sprint";
import { Button } from "../../../shared/components";
import { Header, BoardName, ActionContainer } from "../Styles";
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
        <Button variant="success" onClick={epicCreateModalOpen}>
          Create Epic
        </Button>
        {sprintStatus === "inactive" &&
          (user.role === "owner" || user.id === project.projectLead.id) && (
            <Sprint fetchProject={fetchProject} projectId={projectId} />
          )}
      </ActionContainer>
    </Header>
  );
};

const mapStateToProps = state => ({
  user: state.userState.user,
  project: state.projectState.project
});

export default connect(mapStateToProps)(ProjectBoardHeader);
