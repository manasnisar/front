import React from "react";
import PropTypes from "prop-types";

import {
  EpicPriorityCopy,
  IssuePriority,
  IssuePriorityCopy
} from "../../../shared/constants/issues";
import toast from "../../../shared/utils/toast";
import useApi from "../../../shared/hooks/api";
import { Form, IssuePriorityIcon } from "../../../shared/components";

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Actions,
  ActionButton
} from "./Styles";
import { connect } from "react-redux";

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired
};

const ProjectEpicCreate = ({ project, fetchProject, onCreate, modalClose }) => {
  const [{ isCreating }, createEpic] = useApi.post(`/epic/${project._id}`);

  return (
    <Form
      enableReinitialize
      initialValues={{
        title: "",
        description: "",
        priority: IssuePriority.MEDIUM
      }}
      validations={{
        epicTitle: [Form.is.required(), Form.is.maxLength(200)],
        description: Form.is.required(),
        priority: Form.is.required()
      }}
      onSubmit={async (values, form) => {
        try {
          await createEpic({
            title: values.epicTitle,
            key: `${project.key}-${project.totalEpics + 1}`,
            projectId: project._id,
            priority: values.priority
          });
          await fetchProject();
          toast.success("Epic has been successfully created.");
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Epic</FormHeading>
        <Form.Field.Input
          name="epicTitle"
          label="Summary"
          tip="Concisely summarize the feature in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the feature in as much detail as you'd like."
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other features."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Epic
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const priorityOptions = Object.values(IssuePriority).map(priority => ({
  value: priority,
  label: IssuePriorityCopy[priority]
}));

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{EpicPriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

ProjectEpicCreate.propTypes = propTypes;

const mapStatetoProps = state => ({
  project: state.projectState.project
});

export default connect(mapStatetoProps)(ProjectEpicCreate);
