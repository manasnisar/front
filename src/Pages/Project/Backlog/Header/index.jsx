import React from "react";

import { Button } from "../../../../shared/components";

import { Header, BoardName } from "./Styles";
import { GridContainer } from "../../../MyProjects/Board/ProjectsTable/Styes";
import GridTable from "@nadavshaar/react-grid-table";
import { useHistory, useRouteMatch } from "react-router-dom";

const ProjectBoardHeader = () => {
  const match = useRouteMatch();

  const history = useHistory();
  return (
    <Header>
      <BoardName>Backlog</BoardName>

      <Button
        variant="primary"
        onClick={() => {
          history.push(`/project/board`);
        }}
      >
        Start Sprint
      </Button>
    </Header>
  );
};

export default ProjectBoardHeader;
