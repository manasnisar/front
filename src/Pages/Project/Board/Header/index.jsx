import React from "react";

import { Button } from "../../../../shared/components";

import { Header, BoardName } from "./Styles";

const ProjectBoardHeader = () => (
  <Header>
    <BoardName>Active Sprint</BoardName>

    <Button variant="primary">Complete Sprint</Button>
  </Header>
);

export default ProjectBoardHeader;
