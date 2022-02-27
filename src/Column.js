import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Column = ({ id, title, tasks }) => {
  return (
    <div key={id}>
      <h4>{title}</h4>
      {tasks.length > 0 &&
        tasks.map((task) => {
          return <Card {...task} />;
        })}
    </div>
  );
};

export default Column;
