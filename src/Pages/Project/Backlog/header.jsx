import React from "react";
import Sprint from "./Sprint";
import { Button } from "../../../shared/components";
import { Header, BoardName, ActionContainer } from "../Styles";
import { HeaderRightContent } from "../../MyProjects/Board/Header/Styles";
import NotificationHandler from "../../../shared/components/Notifications";

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
        <HeaderRightContent>
          <NotificationHandler/>
          <Button variant="success" onClick={epicCreateModalOpen}>
                Create Epic
              </Button>
              {sprintStatus === "inactive" && (
                <Sprint fetchProject={fetchProject} projectId={projectId} />
              )}
        </HeaderRightContent>
      </ActionContainer>
    </Header>
  );
};

export default ProjectBoardHeader;
