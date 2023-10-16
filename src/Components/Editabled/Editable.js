import React, { useState } from "react";
import { X } from "react-feather";
import "./Editable.css";

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputTitle, setInputTitle] = useState(props.defaultValue || "");
  const [inputDescription, setInputDescription] = useState(
    props.defaultDescription || ""
  );

  const submission = (e) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(inputTitle, inputDescription);
      setInputTitle(""); // Clear title input
      setInputDescription(""); // Clear description input
      setIsEditable(false);
    }
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <h4>Title:</h4>
          <input
            type="text"
            value={inputTitle}
            placeholder={props.placeholderTitle || props.textT}
            onChange={(event) => setInputTitle(event.target.value)}
            autoFocus
          />
          <h4>Description:</h4>
          <input
            type="text"
            value={inputDescription}
            placeholder={props.placeholderDescription || props.textD}
            onChange={(event) => setInputDescription(event.target.value)}
          />
          <div className="editable_edit_footer">
            <button type="submit">Add</button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
          
        </form>
      ) : (
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ""
          }`}
          
          onClick={() => setIsEditable(true)}
        >
          {props.text}
          {/* <button type="submit">Edit-Card</button> */}
        </p>
      )}
    </div>
  );
}

export default Editable;

