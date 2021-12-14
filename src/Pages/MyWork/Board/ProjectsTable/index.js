import React from "react";
import GridTable from "@nadavshaar/react-grid-table";
import { GridContainer } from "./Styes";
import { useHistory, useRouteMatch } from "react-router-dom";

// custom cell component
const ProjectName = ({
  tableManager,
  value,
  field,
  data,
  column,
  colIndex,
  rowIndex
}) => {
  return (
    <div
      className="rgt-cell-inner"
      style={{ display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      <img src={data.avatar} alt="user avatar" />
      <span className="rgt-text-truncate" style={{ marginLeft: 10 }}>
        {value}
      </span>
    </div>
  );
};

let rows = [
  {
    id: 1,
    name: "Sample Project 0",
    key: "SM0",
    crteatedAt: "12/08/2019",
    lead: "Anas",
    avatar: "https://robohash.org/atquenihillaboriosam.bmp?size=32x32&set=set1"
  },
  {
    id: 2,
    name: "Sample Project 1",
    key: "SM1",
    crteatedAt: "12/08/2019",
    lead: "Anas",
    avatar: "https://robohash.org/etsedex.bmp?size=32x32&set=set1"
  },
  {
    id: 3,
    name: "Sample Project 2",
    key: "SM2",
    crteatedAt: "12/08/2019",
    lead: "Anas",
    avatar: "https://robohash.org/inimpeditquam.bmp?size=32x32&set=set1"
  },
  {
    id: 4,
    name: "Sample Project 3",
    key: "SM3",
    crteatedAt: "12/08/2019",
    lead: "Anas",
    avatar: "https://robohash.org/nobisducimussaepe.bmp?size=32x32&set=set1"
  },
  {
    id: 5,
    name: "Sample Project 4",
    key: "SM4",
    crteatedAt: "12/08/2019",
    lead: "Anas",
    avatar: "https://robohash.org/etconsequatureaque.jpg?size=32x32&set=set1"
  }
];

const columns = [
  {
    id: 1,
    field: "name",
    label: "Name",
    cellRenderer: ProjectName,
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
    field: "lead",
    label: "Lead",
    width: "25%"
  }
];

const ProjectsTable = () => {
  const match = useRouteMatch();
  const history = useHistory();
  return (
    <GridContainer>
      <GridTable
        columns={columns}
        rows={rows}
        isPaginated={false}
        showSearch={false}
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
