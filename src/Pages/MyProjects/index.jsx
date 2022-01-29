import React from "react";

import useApi from "../../shared/hooks/api";
import { createQueryParamModalHelpers } from "../../shared/utils/queryParamModal";
import { PageLoader, PageError, Modal } from "../../shared/components";

import Board from "./Board";
import NavbarLeft from "../../shared/components/NavbarLeft";
import { ProjectPage } from "./Styles";
import ProjectCreate from "./ProjectCreate";
import { connect } from "react-redux";

const MyProjects = ({ orgId }) => {
  const projectCreateModalHelpers = createQueryParamModalHelpers(
    "project-create"
  );

  const [{ data, error }, fetchProjects] = useApi.get(`/project/${orgId}`);

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { projects, members, owner } = data;
  const users = members.concat(owner);
  return (
    <ProjectPage>
      <NavbarLeft page={"projects"} />
      <Board
        projects={projects}
        users={users}
        openCreateProjectModal={projectCreateModalHelpers.open}
      />
      {projectCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:project-create"
          width={800}
          withCloseIcon={false}
          onClose={projectCreateModalHelpers.close}
          renderContent={modal => (
            <ProjectCreate
              projects={projects}
              users={users}
              fetchProjects={fetchProjects}
              onCreate={modal.close}
              modalClose={modal.close}
            />
          )}
        />
      )}
    </ProjectPage>
  );
};

const mapStatetoProps = state => ({
  orgId: state.userState.user.orgId
});

export default connect(mapStatetoProps)(MyProjects);
