import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { id, title, description } = props.card;

  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [updatedCard, setUpdatedCard] = useState({
    // Store updated card data
    id,
    title: props.card.title,
    description: props.card.description,
  });

  // Function to handle card submission after editing
  const handleCardSubmit = () => {
    props.updateCard(props.boardId, id, updatedCard);
    setIsEditing(false); // Disable editing mode after submission
  };

  // Close dropdown when clicking outside of it or moving cursor away
  useEffect(() => {
    const handleClickOrMove = (event) => {
      if (
        showDropdown &&
        !event.target.closest(".board_dropdown") &&
        !event.target.closest(".card_top_more")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousemove", handleClickOrMove);

    return () => {
      document.removeEventListener("mousemove", handleClickOrMove);
    };
  });

  return (
    <>
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
      >
        <div className="card_top">
          <div className="card_top_labels"></div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
                <p onClick={() => setIsEditing(true)}>Edit Card</p>{" "}
                {/* Enable editing mode */}
              </Dropdown>
            )}
          </div>
        </div>
        {isEditing ? ( // Display an editable form when in editing mode
          <div className="card_edit">
            <input
              type="text"
              value={updatedCard.title}
              onChange={(event) =>
                setUpdatedCard({
                  ...updatedCard,
                  title: event.target.value,
                })
              }
            />
            <input
              value={updatedCard.description}
              onChange={(event) =>
                setUpdatedCard({
                  ...updatedCard,
                  description: event.target.value,
                })
              }
            />

            <div className="card_edit_footer">
              <button type="submit" onClick={handleCardSubmit}>
                Save
              </button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          // Display card content when not in editing mode
          <>
            <div className="card_title">{title}</div>
            <div className="card_description">{description}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Card;
