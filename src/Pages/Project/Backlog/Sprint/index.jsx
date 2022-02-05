import React from "react";
import PropTypes from "prop-types";

import api from "../../../../shared/utils/api";
import toast from "../../../../shared/utils/toast";
import { Button } from "../../../../shared/components";
import Modal from "./Modal";
import { connect } from "react-redux";

const propTypes = {
  fetchProject: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired
};

const Index = ({ projectId, fetchProject, issues }) => {
  const issuesPlanned = issues.filter(issue => issue.status === "planned")
    .length;
  const handleStartSprint = async (noOfWeeks, modal) => {
    if (!issuesPlanned) {
      toast.error("Nothing planned for the sprint!");
      modal.close();
      return;
    }
    try {
      await api.post(`/project/start_sprint/${projectId}`, { noOfWeeks });
      await fetchProject();
      toast.success("Sprint started successfully!");
      modal.close();
    } catch (error) {
      toast.error(error);
      modal.close();
    }
  };

  return (
    <Modal
      title="Sprint Setup"
      confirmText="Start Sprint"
      onConfirm={handleStartSprint}
      renderLink={modal => (
        <Button variant="primary" onClick={modal.open}>
          Start Sprint
        </Button>
      )}
    />
  );
};

Index.propTypes = propTypes;

const mapStateToProps = state => ({
  issues: state.projectState.project.issues
});

export default connect(mapStateToProps)(Index);
