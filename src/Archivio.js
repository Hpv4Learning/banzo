import React from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import Card from "./Card";
import Column from "./Column";

import { useGlobalContext } from "./context";

const StyledDiv = styled(Box)`
  display: flex;
  border: 1px solid black;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const Archivio = () => {
  const context = useGlobalContext();
  const data = context.toDoList;
  return (
    <StyledDiv mt='30px' py='18px'>
      <Column title='I Task Completati' tasks={data.storage}>
        {data.storage.map((task) => {
          if (!task.done) return null;
          return <Card {...task} />;
        })}
      </Column>
    </StyledDiv>
  );
};

export default Archivio;
