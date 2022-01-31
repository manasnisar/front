import React, { Fragment } from "react";
import PropTypes from "prop-types";

import api from "../../../shared/utils/api";
import useApi from "../../../shared/hooks/api";
import { PageError, Button } from "../../../shared/components";

import Loader from "./Loader";
import Type from "./Type";
import Delete from "./Delete";
import Title from "./Title";
import Description from "./Description";
import Comments from "./Comments";
import Status from "./Status";
import AssigneesReporter from "./AssigneesReporter";
import Priority from "./Priority";
import EstimateTracking from "./EstimateTracking";
import Dates from "./Dates";
import { TopActions, TopActionsRight, Content, Left, Right } from "./Styles";
import { connect } from "react-redux";

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  modalClose,
  page,
  user,
  projectLead
}) => {
  const [{ data, error }, fetchIssue] = useApi.get(`/issue/${issueId}`);
  console.log(user);
  if (!data) return <Loader />;
  if (error) return <PageError />;

  const issue = data;

  const updateIssue = async updatedFields => {
    await api.optimisticUpdate(`/issue/${issueId}`, updatedFields);
    await fetchIssue();
    await fetchProject();
  };

  return (
    <Fragment>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          {(user.role === "owner" || user.id === projectLead.id) && (
            <Delete
              issue={issue}
              fetchProject={fetchProject}
              modalClose={modalClose}
            />
          )}

          <Button
            icon="close"
            iconSize={24}
            variant="empty"
            onClick={modalClose}
          />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          <Status issue={issue} updateIssue={updateIssue} page={page} />
          <AssigneesReporter
            issue={issue}
            updateIssue={updateIssue}
            projectUsers={projectUsers}
          />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;
const mapStatetoProps = state => ({
  user: state.userState.user,
  projectLead: state.projectState.project.projectLead
});

export default connect(mapStatetoProps)(ProjectBoardIssueDetails);
