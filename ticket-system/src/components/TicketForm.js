import React, { useState, useEffect } from "react";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });
    clearForm();
  };
  const handleCancelEdit = () => {
    dispatch({ type: "CLEAR_EDITING_TICKET" });
    clearForm();
  };
  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button">
        Submit
      </button>
      {editingTicket && (
        <button className="button" onClick={handleCancelEdit}>
          Cancel Edit{" "}
        </button>
      )}
    </form>
  );
}
