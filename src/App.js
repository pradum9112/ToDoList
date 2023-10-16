import React, { useEffect, useState } from "react";

import Board from "./Components/Board/Board";

import "./App.css";

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("ToDoList")) ||
    [
    {
      id: 1,
      title: "To Do",
      cards: [],
    },
    {
      id: 2,
      title: "Doing",
      cards: [],
    },
    {
      id: 3,
      title: "Done",
      cards: [],
    },
  ]);

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addCardHandler = (id, title,description) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      description,
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;
    
    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;
    
    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;
    
    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };
  
  
  
  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };


  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
      );
      if (t_cardIndex < 0) return;
      
      const tempBoards = [...boards];
      const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
      tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
      tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);
    
    setTargetCard({
      bid: "",
      cid: "",
    });
  };
  
  
 
  const updateCard = (bid, cid, updatedCard) => {
    const boardIndex = boards.findIndex((item) => item.id === bid);
    if (boardIndex < 0) return;
    
    const tempBoards = [...boards];
    const board = tempBoards[boardIndex];
    const cardIndex = board.cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;
    
    const updatedBoard = {
      ...board,
      cards: [...board.cards],
    };
    
    updatedBoard.cards[cardIndex] = updatedCard;
    
    tempBoards[boardIndex] = updatedBoard;
    setBoards(tempBoards);
  };
  
  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(boards));
  }, [boards]);
  
  
  return (
    <div className="app">
      <div className="app_nav">
        <h1>To Do List</h1>
      </div>
      <div className="app_boards_container">
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
