import React from "react";
import PropTypes from "prop-types";

import api from "../../../shared/utils/api";
import toast from "../../../shared/utils/toast";
import { Button, ConfirmModal } from "../../../shared/components";

const propTypes = {
  fetchProject: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired
};

const SprintEnd = ({ fetchProject, projectId }) => {
  const handleSprintEnd = async modal => {
    try {
      await api.get(`/project/end_sprint/${projectId}`);
      toast.success("Sprint ended successfully!");
      modal.close();
      await fetchProject();
    } catch (error) {
      toast.error(error);
      modal.close();
    }
  };

  return (
    <ConfirmModal
      title="End Sprint"
      message="Everything in done will be moved to history. All other issues will be moved back to backlog, however they will retain their statuses when the next sprint starts."
      confirmText="End Sprint"
      onConfirm={handleSprintEnd}
      renderLink={modal => (
        <Button variant="primary" onClick={modal.open}>
          End Sprint
        </Button>
      )}
    />
  );
};

SprintEnd.propTypes = propTypes;

export default SprintEnd;
