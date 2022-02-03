import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { ProjectType, ProjectTypeCopy } from "../../shared/constants/projects";
import toast from "../../shared/utils/toast";
import useApi from "../../shared/hooks/api";
import { Form } from "../../shared/components";

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  Header,
  AccountPage
} from "./Styles";
import { connect } from "react-redux";
import { getTextContentsFromHtmlString } from "../../shared/utils/browser";
import NavbarLeft from "../../shared/components/NavbarLeft";
import Sidebar from "../Project/Sidebar";

const propTypes = {
  user: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const UserAccount = ({ user, fetchUser }) => {
  const [{ isUpdating }, updateUser] = useApi.put(`/user/${user._id}`);

  return (
    <AccountPage>
      <Fragment>
        <NavbarLeft page="account" />

        <Form
          initialValues={Form.initialValues(user, get => ({
            name: get("name"),
            category: get("category"),
            description: getTextContentsFromHtmlString(get("description"))
          }))}
          encType="multipart/form-data"
          validations={{
            name: [Form.is.required(), Form.is.maxLength(100)],
            category: Form.is.required(),
            projectLead: Form.is.required()
          }}
          onSubmit={async (values, form) => {
            try {
              await updateUser(values);
              await fetchUser();
              toast.success("Changes have been saved successfully.");
            } catch (error) {
              Form.handleAPIError(error, form);
            }
          }}
        >
          <FormCont>
            <FormElement>
              <Header>
                <FormHeading>Project Details</FormHeading>
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
    </AccountPage>
  );
};

const categoryOptions = Object.values(ProjectType).map(category => ({
  value: category,
  label: ProjectTypeCopy[category]
}));

UserAccount.propTypes = propTypes;

const mapStateToProps = state => ({
  project: state.projectState.project,
  user: state.userState.user
});

export default connect(mapStateToProps)(UserAccount);
