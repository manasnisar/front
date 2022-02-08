import React, { Fragment, useEffect, useState } from "react";
import toast from "../../shared/utils/toast";
import useApi from "../../shared/hooks/api";
import { Avatar, Form } from "../../shared/components";

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  Header,
  AccountPage,
  AvatarContainer,
  ActionContainer
} from "./Styles";
import NavbarLeft from "../../shared/components/NavbarLeft";
import { SectionTitle } from "../Project/EpicDetails/Styles";
import { formatDateTimeConversational } from "../../shared/utils/dateTime";
import { connect } from "react-redux";
import ProjectsTable from "../MyProjects/Board/ProjectsTable";

const UserAccount = ({ user, orgProjects }) => {
  const [{ data }, fetchUser] = useApi.get(
    `/user/${user.id}`,
    {},
    { cachePolicy: "no-cache" }
  );
  const [{ isUpdating }, updateUser] = useApi.put(`/user/${user.id}`);
  const [userProjects, setUserProjects] = useState([]);
  user = data;

  useEffect(() => {
    if (user !== null) {
      setUserProjects(
        orgProjects.filter(project => user.projects.includes(project.id))
      );
    }
  }, [user, orgProjects]);

  return (
    user && (
      <AccountPage>
        <Fragment>
          <NavbarLeft page="account" />

          <Form
            initialValues={Form.initialValues(user, get => ({
              name: get("name")
            }))}
            validations={{
              name: [Form.is.required(), Form.is.maxLength(100)]
            }}
            onSubmit={async (values, form) => {
              try {
                await updateUser(values);
                await fetchUser();
                toast.success("Changes have been saved successfully.");
              } catch (error) {
                toast.success("Changes unsuccessful!");
              }
            }}
          >
            <FormCont>
              <FormElement>
                <Header>
                  <FormHeading>Account</FormHeading>
                </Header>
                <AvatarContainer>
                  <Avatar
                    size={150}
                    avatarUrl={user.avatarUrl}
                    name={user.name}
                  />
                </AvatarContainer>

                <Form.Field.Input name="name" label="Name" />
                <Fragment>
                  <SectionTitle>Email</SectionTitle>
                  <div>{user.email}</div>
                </Fragment>
                <Fragment>
                  <SectionTitle>Avatar Letters</SectionTitle>
                  <div>{user.name.slice(0, 2).toUpperCase()}</div>
                </Fragment>
                <Fragment>
                  <SectionTitle>Member Since</SectionTitle>
                  <div>{formatDateTimeConversational(user.creationDate)}</div>
                </Fragment>
                <Fragment>
                  <SectionTitle>Active Projects</SectionTitle>
                  <ProjectsTable projects={userProjects} page="account" />
                </Fragment>
                <ActionContainer>
                  <ActionButton
                    type="submit"
                    variant="primary"
                    isWorking={isUpdating}
                  >
                    Save changes
                  </ActionButton>
                </ActionContainer>
              </FormElement>
            </FormCont>
          </Form>
        </Fragment>
      </AccountPage>
    )
  );
};

const mapStateToProps = state => ({
  user: state.userState.user,
  orgProjects: state.projectState.orgProjects
});

export default connect(mapStateToProps)(UserAccount);
