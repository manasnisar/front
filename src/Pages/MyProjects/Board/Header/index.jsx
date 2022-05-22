import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../shared/components";
import { Header, BoardName } from "./Styles";
import { connect } from "react-redux";
import { HeaderRightContent } from "./Styles";
import NotificationHandler from "../../../../shared/components/Notifications";

const propTypes = {
  user: PropTypes.object.isRequired,
  openCreateProjectModal: PropTypes.func.isRequired
};

const ProjectBoardHeader = ({ openCreateProjectModal, user }) => (
  <Header>
    <BoardName>My Projects</BoardName>
    <HeaderRightContent>
    <NotificationHandler/>
    {user.role === "owner" && (
      <Button onClick={openCreateProjectModal} variant="primary">
        Create Project
      </Button>
    )}
    </HeaderRightContent>

  </Header>
);

ProjectBoardHeader.propTypes = propTypes;

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(ProjectBoardHeader);
