import React from "react";

import { Button } from "../../../../shared/components";

import { Header, BoardName } from "./Styles";

const ProjectBoardHeader = () => (
  <Header>
    <BoardName>My Projects</BoardName>

    <Button variant="primary">Create Project</Button>
  </Header>
);

export default ProjectBoardHeader;
