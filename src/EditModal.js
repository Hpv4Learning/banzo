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

const CardModal = ({ id }) => {
  // State per gestire input

  // Tiene traccia della colonna che l'utente seleziona per inserirci la card
  const [column, setColumn] = React.useState("");
  const context = useGlobalContext();
  const isEditableModalOpen = context.isEditableModalOpen;
  const toggleEditableModal = context.toggleEditableModal;
  const activeColumns = context.activeColumns;
  const editCards = context.editCards;
  const data = context.toDoList;

  const cardColumn = data.columns.find((x) => {
    if (x.tasks.some((y) => y.id === id)) {
      return true;
    }
    return false;
  });

  const cardData = cardColumn && cardColumn.tasks.find((x) => x.id === id);

  //Controlla che la task sia spuntata come completata o no
  const [checked, setChecked] = React.useState(cardData && cardData.done);

  const [input, setInput] = React.useState({
    titolo: cardData.titolo ? cardData.titolo : "",
    data: cardData ? cardData.data : new Date(Date.now()),
    priorita: cardData ? cardData.priorita : 1,
    descrizione: cardData ? cardData.descrizione : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editCards(id, { ...input, done: checked });
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isEditableModalOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modifica il Task</ModalHeader>
        <ModalCloseButton onClick={toggleEditableModal} />
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
          <Button colorScheme='purple' type='submit' form='card-modal' mr={3}>
            Modifica
          </Button>
          <Button variant='ghost' onClick={toggleEditableModal}>
            Annulla
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
