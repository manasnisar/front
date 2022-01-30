import React from "react";
import PropTypes from "prop-types";

import { Titles, Title, IssuesCount } from "./Styles";
import {
  IssueStatus,
  IssueStatusCopy
} from "../../../../shared/constants/issues";
import filterIssues from "../../../../shared/utils/filterIssues";
import getSortedListIssues from "../../../../shared/utils/getSortedLists";
import formatIssuesCount from "../../../../shared/utils/formatIssueCount";

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.string
};

const defaultProps = {
  currentUserId: null
};

const ProjectBoardTitleList = ({ project, filters, currentUserId }) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);

  return (
    <Titles>
      {Object.entries(IssueStatusCopy).map((entry, index) => (
        <Title key={index}>
          {`${entry[1]} `}
          <IssuesCount>
            <IssuesCount>
              {formatIssuesCount(
                getSortedListIssues(project.issues, entry[0]),
                getSortedListIssues(filteredIssues, entry[0])
              )}
            </IssuesCount>
          </IssuesCount>
        </Title>
      ))}
    </Titles>
  );
};

ProjectBoardTitleList.propTypes = propTypes;
ProjectBoardTitleList.defaultProps = defaultProps;

export default ProjectBoardTitleList;
