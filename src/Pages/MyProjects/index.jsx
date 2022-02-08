import React, { useEffect } from "react";

import useApi from "../../shared/hooks/api";
import { createQueryParamModalHelpers } from "../../shared/utils/queryParamModal";
import { PageLoader, PageError, Modal } from "../../shared/components";

import Board from "./Board";
import NavbarLeft from "../../shared/components/NavbarLeft";
import { ProjectPage } from "./Styles";
import ProjectCreate from "./ProjectCreate";
import { connect } from "react-redux";
import { setOrgProjects } from "../../redux/project/project-reducer";

const MyProjects = ({ userId, setOrgProjects }) => {
  const projectCreateModalHelpers = createQueryParamModalHelpers(
    "project-create"
  );
  const [{ data, error }, fetchProjects] = useApi.get(`/project/${userId}`);
  useEffect(() => {
    let mounted = true;
    if (mounted && data) {
      setOrgProjects(data.projects);
    }
    return function cleanup() {
      mounted = false;
    };
  }, [data, setOrgProjects]);
  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { projects, members, owner } = data;
  const users = members.concat(owner);
  return (
    <ProjectPage>
      <NavbarLeft />
      <Board
        projects={projects}
        users={users}
        fetchProjects={fetchProjects}
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

const mapStateToProps = state => ({
  userId: state.userState.user.id
});

const mapDispatchToProps = dispatch => ({
  setOrgProjects: data => dispatch(setOrgProjects(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);
