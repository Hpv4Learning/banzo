import React from "react";
import { Button, Text, Container, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Container centerContent>
          <Text fontSize='5xl' color='purple'>
            BANZO
          </Text>
          <Text align='center'>
            Il tuo sistema informatico aziendale che permette l'organizzazione
            del lavoro tramite singoli task
          </Text>
          <HStack mt='10px'>
            <Button colorScheme='purple'>
              <Link to='/'>Home</Link>
            </Button>
            <Button colorScheme='purple'>
              <Link to='/archivio'>Archivio</Link>
            </Button>
          </HStack>
        </Container>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
