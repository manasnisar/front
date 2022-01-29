import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

import Issue from "./Issue";
import { List, Issues } from "./Styles";
import filterIssues from "../../../../../shared/utils/filterIssues";
import getSortedListIssues from "../../../../../shared/utils/getSortedLists";

const propTypes = {
  status: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.string
};

const defaultProps = {
  currentUserId: null
};

const ProjectBoardList = ({ status, project, filters, currentUserId }) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);
  const filteredListIssues = getSortedListIssues(filteredIssues, status);

  return (
    <Droppable key={status} droppableId={status}>
      {provided => (
        <List>
          <Issues
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={`board-list:${status}`}
          >
            {filteredListIssues.map((issue, index) => (
              <Issue
                key={issue.id}
                projectUsers={project.users}
                issue={issue}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Issues>
        </List>
      )}
    </Droppable>
  );
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

export default ProjectBoardList;
