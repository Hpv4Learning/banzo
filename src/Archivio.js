import React from "react";
import styled from "styled-components";
import { Box, Container, Text } from "@chakra-ui/react";
import Card from "./Card";

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
    <Container maxW='container.lg'>
      <Box width='100%'>
        <Box mt='24px'>
          <Box px='8px' py='4px' background='gray.900'>
            <Text fontSize='18px'>{"Task Completi"}</Text>
          </Box>
        </Box>
        {data.storage && data.storage.length > 0 && (
          <Box mt='24px'>
            <Box px='8px' py='4px' background='gray.900'>
              {data.storage.map((task) => {
                return <Card {...task} />;
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Archivio;
