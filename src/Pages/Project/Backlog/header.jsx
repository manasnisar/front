import React from "react";
import Sprint from "./Sprint";
import { Button } from "../../../shared/components";
import { Header, BoardName, ActionContainer } from "../Styles";

const ProjectBoardHeader = ({
  epicCreateModalOpen,
  projectId,
  fetchProject,
  sprintStatus
}) => {
  return (
    <Header>
      <BoardName>Backlog</BoardName>
      <ActionContainer>
        <Button variant="success" onClick={epicCreateModalOpen}>
          Create Epic
        </Button>
        {sprintStatus === "inactive" && (
          <Sprint fetchProject={fetchProject} projectId={projectId} />
        )}
      </ActionContainer>
    </Header>
  );
};

export default ProjectBoardHeader;
