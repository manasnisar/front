import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Droppable } from "react-beautiful-dnd";
import { intersection } from "lodash";

import { BacklogIssueStatusCopy } from "../../../../../shared/constants/issues";

import Issue from "./Issue";
import { List, Title, IssuesCount, Issues, AddIssue } from "./Styles";
import filterIssues from "../../../../../shared/utils/filterIssues";
import getSortedListIssues from "../../../../../shared/utils/getSortedLists";
import formatIssuesCount from "../../../../../shared/utils/formatIssueCount";
import Icon from "../../../../../shared/components/Icon";
import { setUser } from "../../../../../redux/user/user-reducer";
import { connect } from "react-redux";
import { setEpicToBeUpdated } from "../../../../../redux/epic/epic-reducer";

const propTypes = {
  status: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.string
};

const defaultProps = {
  currentUserId: null
};

const ProjectBoardList = ({
  status,
  project,
  filters,
  currentUserId,
  issueCreateModalOpen,
  setEpicToBeUpdated,
  epic
}) => {
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
            {status === "unplanned" && (
              <AddIssue
                onClick={() => {
                  setEpicToBeUpdated(epic.id);
                  issueCreateModalOpen();
                }}
              >
                <Icon type="plus" size={28} />
                <div style={{ marginTop: "-2px" }}>Add</div>
              </AddIssue>
            )}
          </Issues>
        </List>
      )}
    </Droppable>
  );
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
  setEpicToBeUpdated: epicId => dispatch(setEpicToBeUpdated(epicId))
});

export default connect(null, mapDispatchToProps)(ProjectBoardList);
