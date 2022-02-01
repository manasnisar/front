import React from "react";
import PropTypes from "prop-types";
import toast from "../../../shared/utils/toast";
import useApi from "../../../shared/hooks/api";
import useCurrentUser from "../../../shared/hooks/currentUser";
import { Form } from "../../../shared/components";
import { connect } from "react-redux";

import { ActionButton, FormElement, FormHeading } from "../Styles";
import { Actions } from "../../EpicCreate/Styles";

const propTypes = {
  project: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired
};

const InviteMemberToProject = ({ project, user, modalClose }) => {
  const [{ isCreating }, createInvitation] = useApi.post(`/project/invite`);

  const { currentUserId } = useCurrentUser();
  return (
    <Form
      enableReinitialize
      initialValues={{
        email: ""
      }}
      validations={{
        email: [Form.is.required(), Form.is.email()]
      }}
      onSubmit={async values => {
        // try {
        //   await createProject({
        //     category: values.category,
        //     name: values.projectName,
        //     description: values.description,
        //     key: values.key,
        //     projectLead: values.projectLead
        //   });
        //   await fetchProjects();
        //   toast.success("Project created successfully!");
        //   onCreate();
        // } catch (error) {
        //   toast.error(error);
        // }
      }}
    >
      <FormElement>
        <FormHeading>Invite member</FormHeading>
        <Form.Field.Input
          name="email"
          label="Email"
          tip="Type email of new team member"
        />

        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Generate Invite Code
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

InviteMemberToProject.propTypes = propTypes;

export default InviteMemberToProject;
