import React from "react";
import GridTable from "@nadavshaar/react-grid-table";
import { GridContainer } from "./Styes";
import { useHistory, useRouteMatch } from "react-router-dom";

// custom cell component
const ProjectName = ({ value, data }) => {
  return (
    <div
      className="rgt-cell-inner"
      style={{ display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      <img src={data.avatarUrl} alt="user avatar" />
      <span className="rgt-text-truncate" style={{ marginLeft: 10 }}>
        {value}
      </span>
    </div>
  );
};

const projectLead = ({ data }) => {
  return <div>{data.projectLead.name}</div>;
};
const columns = [
  {
    id: 1,
    field: "name",
    label: "Name",
    width: "35%"
  },
  {
    id: 2,
    field: "key",
    label: "Key",
    width: "15%"
  },
  {
    id: 3,
    field: "crteatedAt",
    label: "Crteated At",
    width: "25%",
    sort: ({ a, b, isAscending }) => {
      let aa = a
          .split("/")
          .reverse()
          .join(),
        bb = b
          .split("/")
          .reverse()
          .join();
      return aa < bb
        ? isAscending
          ? -1
          : 1
        : aa > bb
        ? isAscending
          ? 1
          : -1
        : 0;
    }
  },
  {
    id: 4,
    field: "projectLead",
    label: "Lead",
    width: "25%",
    cellRenderer: projectLead
  }
];

const ProjectsTable = ({ projects }) => {
  const match = useRouteMatch();
  const history = useHistory();
  return (
    <GridContainer>
      <GridTable
        columns={columns}
        rows={projects}
        isPaginated={false}
        showSearch={false}
        showRowsInformation={false}
        showColumnVisibilityManager={false}
        onRowClick={(
          { rowIndex, data, column, isEdit, event },
          tableManager
        ) => {
          history.push(`/project`);
        }}
      />
    </GridContainer>
  );
};

export default ProjectsTable;
