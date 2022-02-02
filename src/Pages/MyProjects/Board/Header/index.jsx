import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components";
import { Header, BoardName } from "./Styles";
import { connect } from "react-redux";

const propTypes = {
  user: PropTypes.object.isRequired,
  openCreateProjectModal: PropTypes.func.isRequired
};

const ProjectBoardHeader = ({ openCreateProjectModal, user }) => (
  <Header>
    <BoardName>My Projects</BoardName>
    {user.role === "owner" && (
      <Button onClick={openCreateProjectModal} variant="primary">
        Create Project
      </Button>
    )}
  </Header>
);

ProjectBoardHeader.propTypes = propTypes;

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(ProjectBoardHeader);
