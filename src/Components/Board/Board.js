import React from "react";
import Card from "../Card/Card";
import Editable from "../Editabled/Editable";
import "./Board.css";

function Board(props) {
  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          {props.board?.discription}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="Add Card"
          textT="Add Title"
          textD="Add Description"
          placeholderTitle="Enter Card Title"
          placeholderDescription="Enter Description"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(title, description) => {
            props.addCard(props.board?.id, title, description);
          }}
        />
      </div>
    </div>
  );
}

export default Board;
