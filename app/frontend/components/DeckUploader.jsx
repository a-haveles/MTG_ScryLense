import React, { useState } from "react";
import axios from "axios";
import TagChart from "./TagChart";

const DeckUploader = () => {
  const [name, setName] = useState('');
  const [decklist, setDecklist] = useState('');
  const [deckId, setDeckId] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/decks', { name, decklist }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setDeckId(response.data.id);
      setMessage(`Deck "${response.data.name}" uploaded!`);
    } catch (err) {
      setMessage("Upload failed.");
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="title">SCRYLENSE</h1>
      <div className="page-container">
        <form onSubmit={handleSubmit}>
          <label>Deck Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
  
          <label>Deck List</label>
          <textarea rows="10" value={decklist} onChange={(e) => setDecklist(e.target.value)} required />
  
          <button type="submit">Upload Deck</button>
        </form>
  
        {message && <p>{message}</p>}
        {deckId && <TagChart deckId={deckId} />}
      </div>
    </>
  );  
};

export default DeckUploader;