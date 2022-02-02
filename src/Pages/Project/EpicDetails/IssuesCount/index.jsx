import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  EpicPriority,
  EpicPriorityCopy
} from "../../../../shared/constants/epics";
import { Select, IssuePriorityIcon } from "../../../../shared/components";

import { SectionTitle } from "../Styles";
import { Priority, Label } from "./Styles";
import { connect } from "react-redux";

const propTypes = {
  epic: PropTypes.object.isRequired,
  updateEpic: PropTypes.func.isRequired
};

const ProjectBoardEpicDetailsIssuesCount = ({ epic, issues }) => (
  <Fragment>
    <SectionTitle>Total Issues</SectionTitle>
    <div>{issues.filter(issue => issue.epicId === epic.id).length}</div>
  </Fragment>
);

ProjectBoardEpicDetailsIssuesCount.propTypes = propTypes;

const mapStateToProps = state => ({
  issues: state.projectState.project.issues
});

export default connect(mapStateToProps)(ProjectBoardEpicDetailsIssuesCount);
