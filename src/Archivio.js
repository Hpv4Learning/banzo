import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import Card from "./Card";

import { useGlobalContext } from "./context";

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
              {data.storage
                .filter((el) => el.done)
                .map((task) => {
                  return <Card {...task} isEditable={false} />;
                })}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Archivio;
