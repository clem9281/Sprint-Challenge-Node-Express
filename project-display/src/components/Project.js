import React, { useState } from "react";
import axios from "axios";
import {
  ListGroupItemHeading,
  ListGroupItemText,
  ListGroupItem
} from "reactstrap";

import Actions from "./Actions";

const Project = props => {
  const { name, description, id } = props.project;
  const [showActions, setShowActions] = useState(false);
  const [actions, setActions] = useState([]);
  const handleClick = async (e, projectId) => {
    e.preventDefault();
    if (actions.length === 0) {
      try {
        const projectActions = await axios.get(
          `http://localhost:6500/api/actions/${projectId}`
        );
        setActions(projectActions.data);
      } catch (error) {
        console.log(error);
      }
    }
    setShowActions(!showActions);
  };
  return (
    <ListGroupItem
      tag="button"
      className="text-left"
      action
      onClick={e => handleClick(e, id)}
    >
      <ListGroupItemHeading className="mb-3">{name}</ListGroupItemHeading>
      <ListGroupItemText className="mb-2">{description}</ListGroupItemText>
      {showActions &&
        actions.map(action => <Actions action={action} key={action.id} />)}
    </ListGroupItem>
  );
};

export default Project;
