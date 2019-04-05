import React from "react";

const Actions = props => {
  return (
    <p className="ml-2 border-bottom mb-2 pb-1">{props.action.description}</p>
  );
};

export default Actions;
