import React from "react";
import { useGlobalContext } from "./context";
import { Button, Checkbox, Input, Textarea } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";

const CardModal = () => {
  // State per gestire input
  const [input, setInput] = React.useState({
    titolo: "Scimmia Dura",
    data: "",
    priorita: 1,
    descrizione: "Banzo",
  });

  //Controlla che la task sia spuntata come completata o no
  const [checked, setChecked] = React.useState(false);

  // Tiene traccia della colonna che l'utente seleziona per inserirci la card
  const [column, setColumn] = React.useState("");
  const context = useGlobalContext();
  const addTaskToColumn = context.addTaskToColumn;
  const isCardModalOpen = context.isCardModalOpen;
  const toggleCardModal = context.toggleCardModal;
  const activeColumns = context.activeColumns;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaskToColumn(column, { ...input, done: checked });
    setInput({
      titolo: "",
      data: new Date(Date.now()),
      priorita: 1,
      descrizione: "",
    });
    setChecked(false);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isCardModalOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crea il Task</ModalHeader>
        <ModalCloseButton onClick={context.toggleCardModal} />
        <ModalBody>
          <form
            onSubmit={handleSubmit}
            id='card-modal'
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "340px",
              marginTop: "20px",
            }}
          >
            <Input
              type='text'
              id='titolo'
              name='titolo'
              required
              maxLength={20}
              value={input.titolo}
              onChange={handleChange}
            />
            <Input
              type='date'
              id='data'
              name='data'
              required
              value={input.data}
              onChange={handleChange}
            />
            <Select
              value={input.priorita}
              id='priorita'
              name='priorita'
              onChange={handleChange}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <option
                  selected={index === 0 ? "selected" : null}
                  value={index + 1}
                >
                  {index + 1}
                </option>
              ))}
            </Select>
            <Textarea
              name='descrizione'
              id='descrizione'
              value={input.descrizione}
              onChange={handleChange}
            />
            <Checkbox
              isChecked={checked}
              onChange={() => setChecked(!checked)}
            />
            <Select
              placeholder={"Scegli elemento"}
              value={column}
              required
              onChange={(e) => setColumn(e.target.value)}
            >
              {activeColumns.map((column, index) => (
                <option value={column.title.toLowerCase()}>
                  {column.title}
                </option>
              ))}
            </Select>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='pink' type='submit' form='card-modal' mr={3}>
            Aggiungi
          </Button>
          <Button variant='ghost' onClick={toggleCardModal}>
            Annulla
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
