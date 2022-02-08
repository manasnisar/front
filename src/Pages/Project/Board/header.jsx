import React from "react";
import { Header, BoardName } from "../Styles";
import { Right, SprintInfo } from "./Styles";
import SprintEnd from "./sprint";

const ProjectBoardHeader = ({ project, fetchProject }) => {
  let sprintOverDue = false;
  const startDate = new Date(Date.now());
  const endDate = new Date(project.sprintEndDate);
  let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  if (seconds < 0) {
    sprintOverDue = true;
    seconds = Math.abs(seconds);
  }
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  hours = hours - days * 24;

  return (
    <Header>
      <BoardName>
        Active Sprint <span>(Sprint {project.sprintNumber})</span>
      </BoardName>
      {project.sprintStatus === "active" && (
        <Right>
          {project.sprintStatus === "active" && (
            <SprintInfo sprintOverDue={sprintOverDue}>
              {sprintOverDue
                ? `Sprint overdue by ${days} ${
                    days > 1 ? "days" : "day"
                  }, ${hours} hours`
                : `Sprint ends in ${days} days, ${hours} hours`}
            </SprintInfo>
          )}
          <SprintEnd fetchProject={fetchProject} projectId={project._id} />
        </Right>
      )}
    </Header>
  );
};

export default ProjectBoardHeader;
