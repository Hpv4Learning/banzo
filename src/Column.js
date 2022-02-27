import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

const Column = ({ id, title, tasks }) => {
  return (
    <Box key={id} maxWidth='343px' width='100%'>
      <Box mt='24px'>
        <Box px='8px' py='4px' background='gray.900'>
          <Text fontSize='18px'>{title}</Text>
        </Box>
      </Box>
      <Box mt='24px'>
        <Box px='8px' py='4px' background='gray.900'>
          {tasks.length > 0 &&
            tasks.map((task) => {
              return <Card {...task} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Column;
