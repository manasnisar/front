import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  ProjectType,
  ProjectTypeCopy
} from "../../../shared/constants/projects";
import toast from "../../../shared/utils/toast";
import useApi from "../../../shared/hooks/api";
import { Form, Breadcrumbs, Avatar, Icon } from "../../../shared/components";

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  Header
} from "./Styles";
import { connect } from "react-redux";
import {
  SelectItem,
  SelectItemLabel
} from "../../MyProjects/ProjectCreate/Styles";
import { getTextContentsFromHtmlString } from "../../../shared/utils/browser";

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  openInvitationModal: PropTypes.func.isRequired
};

const ProjectSettings = ({ project, fetchProject, openInvitationModal }) => {
  const [{ isUpdating }, updateProject] = useApi.put(
    `/project/manage/${project._id}`
  );

  return (
    <Fragment>
      <Form
        initialValues={Form.initialValues(project, get => ({
          name: get("name"),
          category: get("category"),
          description: getTextContentsFromHtmlString(get("description")),
          projectLead: project.projectLead.id
        }))}
        validations={{
          name: [Form.is.required(), Form.is.maxLength(100)],
          category: Form.is.required(),
          projectLead: Form.is.required()
        }}
        onSubmit={async (values, form) => {
          try {
            await updateProject(values);
            await fetchProject();
            toast.success("Changes have been saved successfully.");
          } catch (error) {
            Form.handleAPIError(error, form);
          }
        }}
      >
        <FormCont>
          <FormElement>
            <Breadcrumbs
              items={["Projects", project.name, "Project Details"]}
            />
            <Header>
              <FormHeading>Project Details</FormHeading>
              <ActionButton
                type="button"
                onClick={openInvitationModal}
                variant="success"
              >
                Invite Members
              </ActionButton>
            </Header>

            <Form.Field.Input name="name" label="Name" />
            <Form.Field.TextEditor
              name="description"
              label="Description"
              tip="Describe the project in as much detail as you'd like."
            />
            <Form.Field.Select
              name="category"
              label="Project Category"
              options={categoryOptions}
            />
            <Form.Field.Select
              name="projectLead"
              label="Team lead"
              options={userOptions(project.users)}
              renderOption={renderUser(project.users, true)}
              renderValue={renderUser(project.users, true)}
            />

            <ActionButton
              type="submit"
              variant="primary"
              isWorking={isUpdating}
            >
              Save changes
            </ActionButton>
          </FormElement>
        </FormCont>
      </Form>
    </Fragment>
  );
};

const userOptions = users =>
  users.map(user => ({ value: user.id, label: user.name }));

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

const categoryOptions = Object.values(ProjectType).map(category => ({
  value: category,
  label: ProjectTypeCopy[category]
}));

ProjectSettings.propTypes = propTypes;

const mapStateToProps = state => ({
  project: state.projectState.project
});

export default connect(mapStateToProps)(ProjectSettings);
