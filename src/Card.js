import React from "react";
import styled from "@emotion/styled";
import { Button, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import EditCardModal from "./EditModal";
import { useGlobalContext } from "./context";

const StyledCard = styled.div`
  /* width: 343px; */
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  padding: 16px;
  position: relative;
  border-radius: 0px 8px 8px 0px;
  background: #2d3748;

  //Applica lo stile a tutti tranne al primo figlio diretto, proprietà gap su safari non è supportata
  // Fonte: https://caniuse.com/?search=gap
  .spacer {
    & > *:not(:first-child) {
      margin-top: 8px;
    }
  }

  .star-container {
    & > *:not(:first-child) {
      margin-left: 2px;
    }
  }

  .card-info,
  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:after {
    content: " ";
    left: 0px;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 8px;
    position: absolute;
    background-color: red;
  }

  [role="edit"]: {
    display: none !important;
  }
`;

const Card = ({
  titolo,
  data,
  priorita,
  descrizione,
  done,
  id,
  isEditable = true,
}) => {
  /*
  Crea Stelline:
  1. Crea un Array di lunghezza pari al valore di priorità
  2. Usa il secondo parametro di Array.from() che è una map function 
  3. In questa funzione ritorna la stellina
  */
  const stellineDiDio = Array.from({ length: Number(priorita) }, (el) => {
    return <StarIcon boxSize={3} color='orange' />;
  });

  const context = useGlobalContext();
  const toggleEditableModal = context.toggleEditableModal;

  return (
    <>
      <StyledCard>
        <div className='spacer'>
          <div className='card-info'>
            <Text fontSize='md'>{titolo}</Text>
            <div className='star-container'>
              {stellineDiDio.map((stellina) => stellina)}
            </div>
          </div>
          <Text fontSize='xs'>{descrizione}</Text>
          {/* <p>{done.toString()}</p> */}
          <div className='action'>
            <p>{data}</p>
            <Button
              size='xs'
              style={{
                display: !isEditable && "none",
              }}
              onClick={toggleEditableModal}
            >
              Edit
            </Button>
          </div>
        </div>
      </StyledCard>
      <EditCardModal id={id} />
    </>
  );
};

export default Card;
