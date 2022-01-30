import React from "react";
import PropTypes from "prop-types";
import Lists from "../Lists";
import Collapsible from "react-collapsible";
import { Rows, Trigger, TriggerInner } from "./Styles";
import { Icon } from "../../../shared/components";

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired
};

const TriggerWhenClosed = ({ epic }) => {
  return (
    <Trigger>
      <TriggerInner>
        <Icon type={"chevron-right"} size={20} />
        <div style={{ margin: "2px 0 0 5px" }}>{epic.title}</div>
      </TriggerInner>
      <Icon
        onClick={e => {
          e.stopPropagation();
          console.log("here when epic is clicked");
        }}
        type={"more"}
        size={22}
      />
    </Trigger>
  );
};

const TriggerWhenOpen = ({ epic }) => {
  return (
    <Trigger>
      <TriggerInner>
        <Icon type={"chevron-down"} size={20} />
        <div style={{ margin: "2px 0 0 5px" }}>{epic.title}</div>
      </TriggerInner>
      <Icon type={"more"} size={22} />
    </Trigger>
  );
};

const ProjectBacklogEpics = ({
  project,
  filters,
  fetchProject,
  issueCreateModalOpen,
  page
}) => {
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
              users={project.users}
              fetchProject={fetchProject}
              issues={getIssuesForEpic(project, epic)}
              filters={filters}
              issueCreateModalOpen={issueCreateModalOpen}
              page={page}
            />
          </Collapsible>
        );
      })}
    </Rows>
  );
};

const getIssuesForEpic = (project, epic) => {
  return project.issues.filter(issue => issue.epicId === epic.id);
};

ProjectBacklogEpics.propTypes = propTypes;

export default ProjectBacklogEpics;
