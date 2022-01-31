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
import Priority from "./Priority";
import Dates from "./Dates";
import { TopActions, TopActionsRight, Content, Left, Right } from "./Styles";
import { connect } from "react-redux";
import IssuesCount from "./IssuesCount";

const propTypes = {
  epicId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired
};

const ProjectBoardEpicDetails = ({
  epicId,
  fetchProject,
  modalClose,
  user,
  projectLead
}) => {
  const [{ data, error }, fetchEpic] = useApi.get(`/epic/manage/${epicId}`);

  if (!data) return <Loader />;
  if (error) return <PageError />;

  const epic = data;

  const updateEpic = async updatedFields => {
    await api.optimisticUpdate(`/epic/manage/${epicId}`, updatedFields);
    await fetchEpic();
    await fetchProject();
  };

  return (
    <Fragment>
      <TopActions>
        <Type epic={epic} />
        <TopActionsRight>
          {(user.role === "owner" || user.id === projectLead.id) && (
            <Delete
              epic={epic}
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
          <Title epic={epic} updateEpic={updateEpic} />
          <Description epic={epic} updateEpic={updateEpic} />
          <Comments epic={epic} fetchEpic={fetchEpic} />
        </Left>
        <Right>
          <Priority epic={epic} updateEpic={updateEpic} />
          <IssuesCount epic={epic} />
          <Dates epic={epic} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardEpicDetails.propTypes = propTypes;
const mapStatetoProps = state => ({
  user: state.userState.user,
  projectLead: state.projectState.project.projectLead
});

export default connect(mapStatetoProps)(ProjectBoardEpicDetails);
