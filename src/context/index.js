import React from "react";
import dataset from "../dataset";
import { v4 as uuidv4 } from "uuid";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //state per la gestione delle colonne e delle task
  const [data, setData] = React.useState(dataset);

  //Indica l'apertura e la chiusura del modal per la creazione di nuove task
  const [isCardModalOpen, setIsCardModalOpen] = React.useState(false);
  const [isEditableModalOpen, setIsEditableModalOpen] = React.useState(false);

  //Funzione unica per aprire e chiudere il modal per la creazione delle cards
  const toggleCardModal = () => setIsCardModalOpen(!isCardModalOpen);
  const toggleEditableModal = () =>
    setIsEditableModalOpen(!isEditableModalOpen);

  //Aggiunge una Task ad una colonna esistente usando come filtro il titolo
  function addTaskToColumn(title, content) {
    const doneTasks = [];
    const newTask = { id: uuidv4(), ...content };
    //creaiamo un nuovo array di colonne
    const newData = data.columns.map((colonna) => {
      colonna.tasks.forEach((task) => {
        if (task.done) doneTasks.push(task);
      });

      if (colonna.title.toLowerCase() !== title.toLowerCase()) {
        return colonna;
      }
      return {
        ...colonna,
        tasks: [...colonna.tasks, newTask],
      };
    });

    doneTasks.push(newTask);

    setData({
      ...data,
      columns: newData,
      storage: doneTasks,
    });

    setIsCardModalOpen(false);
  }

  //Creiamo una nuova colonna
  const creaColonna = (title) => {
    setData({
      ...data,
      columns: [
        ...data.columns,
        {
          id: uuidv4(),
          title: title,
          tasks: [],
        },
      ],
    });
  };

  //Creiamo la lista di colonne da mostrare nel dropdown di selezione
  const activeColumns = data.columns.map((column) => {
    return { title: column.title, id: column.id };
  });





  
  const editCards = (id, content) => {
    const newData = data.columns.map((colonna) => {
      if (!colonna.tasks.find((x) => x.id === id)) {
        return colonna;
      }
      return {
        ...colonna,
        tasks: colonna.tasks.map((el) => {
          if (el.id === id) {
            return { id, ...content };
          }
          return el;
        }),
      };
    });

    setData({
      ...data,
      columns: newData,
    });

    setIsEditableModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        toDoList: data,
        addTaskToColumn,
        creaColonna,
        toggleCardModal,
        toggleEditableModal,
        isEditableModalOpen,
        isCardModalOpen,
        activeColumns,
        editCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/*
Se volessi "nabbizzare" questo elemento:
1. Exportare da questo File AppContext 
2. Andare in tutti i file che utilizzano useGlobalContext, rimuoverlo
3. Importare {AppContext} 
4. Far diventare context = useGlobalContext() ----> context = React.useContext(AppContext)
*/
const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { useGlobalContext, AppProvider };
