import React from "react";

import useApi from "../../shared/hooks/api";
import { updateArrayItemById } from "../../shared/utils/javascript";
import { createQueryParamModalHelpers } from "../../shared/utils/queryParamModal";
import { PageLoader, PageError, Modal } from "../../shared/components";

import Board from "./Board";
import NavbarLeft from "../../shared/components/NavbarLeft";
import { ProjectPage } from "./Styles";

const MyWork = () => {
  const projectCreateModalHelpers = createQueryParamModalHelpers(
    "project-create"
  );

  const [{ data, error, setLocalData }, fetchProject] = useApi.get(
    "/project/manage/62131"
  );

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(
          currentData.project.issues,
          issueId,
          updatedFields
        )
      }
    }));
  };

  return (
    <ProjectPage>
      <NavbarLeft />
      <Board
        project={project}
        fetchProject={fetchProject}
        updateLocalProjectIssues={updateLocalProjectIssues}
        issueCreateModalO
        pen={projectCreateModalHelpers.open}
      />
    </ProjectPage>
  );
};

export default MyWork;
