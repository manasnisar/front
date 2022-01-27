import React from "react";

import { Button } from "../../../../shared/components";

import { Header, BoardName } from "./Styles";

const ProjectBoardHeader = ({ openCreateProjectModal }) => (
  <Header>
    <BoardName>My Projects</BoardName>

    <Button onClick={openCreateProjectModal} variant="primary">
      Create Project
    </Button>
  </Header>
);

export default ProjectBoardHeader;
