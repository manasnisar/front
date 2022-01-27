import React from "react";
import PropTypes from "prop-types";

import { IssueType, IssueStatus } from "../../../shared/constants/issues";
import toast from "../../../shared/utils/toast";
import useApi from "../../../shared/hooks/api";
import useCurrentUser from "../../../shared/hooks/currentUser";
import { Form, Icon, Avatar } from "../../../shared/components";
import { connect } from "react-redux";

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton
} from "./Styles";
import {
  ProjectType,
  ProjectTypeCopy
} from "../../../shared/constants/projects";

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired
};

const CreateProject = ({
  projects,
  fetchProjects,
  onCreate,
  modalClose,
  orgId,
  users
}) => {
  const [{ isCreating }, createProject] = useApi.post(`/project/${orgId}`);

  const { currentUserId } = useCurrentUser();
  return (
    <Form
      enableReinitialize
      initialValues={{
        type: ProjectType.DEV,
        title: "",
        leadId: currentUserId
      }}
      validations={{
        category: Form.is.required(),
        description: [Form.is.required(), Form.is.maxLength(200)],
        projectName: [Form.is.required(), Form.is.maxLength(40)],
        key: Form.is.required(),
        projectLead: Form.is.required()
      }}
      onSubmit={async (values, form) => {
        try {
          await createProject({
            category: values.category,
            name: values.projectName,
            description: values.description,
            key: values.key,
            projectLead: values.projectLead
          });
          await fetchProjects();
          toast.success("Project created successfully!");
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create project</FormHeading>
        <Form.Field.Select
          name="category"
          label="Project Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="description"
          label="Short Summary"
          tip="Concisely summarize the project in one or two sentences."
        />
        <Form.Field.Input
          name="projectName"
          label="Name"
          tip="What should we call your project?"
        />
        <Form.Field.Input
          name="key"
          label="Key"
          disabled={true}
          tip="Unique identifier for you project (auto generated)"
        />
        <Form.Field.Select
          name="projectLead"
          label="Team lead"
          options={userOptions(users)}
          renderOption={renderUser(users)}
          renderValue={renderUser(users)}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Project
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const typeOptions = Object.values(ProjectType).map(type => ({
  value: type,
  label: ProjectTypeCopy[type]
}));

const userOptions = users =>
  users.map(user => ({ value: user.id, label: user.name }));

const renderType = ({ value: type }) => (
  <SelectItem>
    <SelectItemLabel>{ProjectTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const renderUser = users => ({ value: userId, removeOptionValue }) => {
  const user = users.find(({ id }) => id === userId);

  return (
    <SelectItem
      key={user.id}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar size={20} avatarUrl={user.avatarUrl} name={user.name} />
      <SelectItemLabel>{user.name}</SelectItemLabel>
      {removeOptionValue && <Icon type="close" top={2} />}
    </SelectItem>
  );
};

CreateProject.propTypes = propTypes;

const mapStatetoProps = state => ({
  orgId: state.userState.user.orgId
});

export default connect(mapStatetoProps)(CreateProject);
