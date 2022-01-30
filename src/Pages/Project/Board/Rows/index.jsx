import React from "react";
import PropTypes from "prop-types";
import Lists from "../Lists";
import Collapsible from "react-collapsible";
import { Rows, Trigger } from "./Styles";
import { Icon } from "../../../../shared/components";

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired
};

const TriggerWhenClosed = ({ epic }) => {
  return (
    <Trigger>
      <Icon type={"chevron-right"} size={18} />
      <div>{epic.title}</div>
    </Trigger>
  );
};

const TriggerWhenOpen = ({ epic }) => {
  return (
    <Trigger>
      <Icon type={"chevron-down"} size={18} />
      <div>{epic.title}</div>
    </Trigger>
  );
};

const ProjectBoardEpics = ({ project, filters, updateLocalProjectIssues }) => {
  return (
    <Rows>
      {project.epics.map(epic => {
        return (
          <Collapsible
            key={epic.key}
            transitionTime={200}
            open={true}
            trigger={<TriggerWhenClosed epic={epic} />}
            triggerWhenOpen={<TriggerWhenOpen epic={epic} />}
          >
            <Lists
              project={project}
              filters={filters}
              updateLocalProjectIssues={updateLocalProjectIssues}
            />
          </Collapsible>
        );
      })}
    </Rows>
  );
};

ProjectBoardEpics.propTypes = propTypes;

export default ProjectBoardEpics;
