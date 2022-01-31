import React from "react";
import PropTypes from "prop-types";

import { sortByNewest } from "../../../../shared/utils/javascript";

import Create from "./Create";
import Comment from "./Comment";
import { Comments, Title } from "./Styles";

const propTypes = {
  epic: PropTypes.object.isRequired,
  fetchEpic: PropTypes.func.isRequired
};

const ProjectBoardEpicDetailsComments = ({ epic, fetchEpic }) => {
  return (
    <Comments>
      <Title>Comments</Title>
      <Create epicId={epic.id} fetchEpic={fetchEpic} />

      {sortByNewest(epic.comments, "creationDate").map(comment => (
        <Comment key={comment.id} comment={comment} fetchEpic={fetchEpic} />
      ))}
    </Comments>
  );
};

ProjectBoardEpicDetailsComments.propTypes = propTypes;

export default ProjectBoardEpicDetailsComments;
