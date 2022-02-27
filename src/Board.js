import React, { useState } from "react";
import styled from "styled-components";
import Column from "./Column";
import CardModal from "./CardModal";
import { useGlobalContext } from "./context";
import { Box, Button, Container, HStack, Input } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const StyledDiv = styled(Box)`
  display: flex;
  border: 1px solid black;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const Board = () => {
  const context = useGlobalContext();
  const data = context.toDoList;
  const creaColonna = context.creaColonna;
  const toggleCardModal = context.toggleCardModal;
  const activeColumns = context.activeColumns;

  console.log(data.storage);

  //Controlla apertura del modal per creare un colonna
  const [isOpen, setIsOpen] = useState();

  //Tiene traccia del valore che inseriamo nel input dentro il modal
  const [input, setInput] = useState("");

  //Crea una colonna, svuota l'input e chiude il modal
  const aggiungiColonna = () => {
    creaColonna(input);
    setInput("");
    setIsOpen(false);
  };

  return (
    <Container maxW='container.lg'>
      <HStack
        mt='30px'
        alignItems='center'
        justifyContent='flex-end'
        background='gray.900'
        py='8px'
        px='12px'
      >
        <Button
          colorScheme='purple'
          variant='outline'
          onClick={() => setIsOpen(true)}
        >
          Crea Colonna
        </Button>
        <Button
          colorScheme='purple'
          disabled={activeColumns.length === 0}
          onClick={toggleCardModal}
        >
          Crea Il Task
        </Button>
      </HStack>
      <StyledDiv mt='30px' py='18px'>
        {data.columns.map((el, index) => {
          return <Column key={el.id} {...el} />;
        })}
      </StyledDiv>

      <CardModal />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea un colonna</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='pink' mr={3} onClick={aggiungiColonna}>
              Crea Colonna
            </Button>
            <Button variant='ghost' onClick={() => setIsOpen(!isOpen)}>
              Annulla
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Board;
