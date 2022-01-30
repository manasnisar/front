import React from "react";

import { Button } from "../../../../shared/components";

import { Header, BoardName, ActionContainer } from "./Styles";
import { useHistory } from "react-router-dom";

const ProjectBoardHeader = ({ epicCreateModalOpen }) => {
  const history = useHistory();
  return (
    <Header>
      <BoardName>Backlog</BoardName>
      <ActionContainer>
        <Button variant="success" onClick={epicCreateModalOpen}>
          Create Epic
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            history.push(`/project/board`);
          }}
        >
          Start Sprint
        </Button>
      </ActionContainer>
    </Header>
  );
};

export default ProjectBoardHeader;
