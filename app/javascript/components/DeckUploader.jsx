import React, { useState } from 'react';
import axios from 'axios';

const DeckUploader = () => {
  const [name, setName] = useState('');
  const [decklist, setDecklist] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const response = await axios.post('/decks', {
        name,
        decklist,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(`Deck "${response.data.name}" uploaded successfully!`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload deck.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Deck Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deck List</label>
          <textarea
            rows="10"
            value={decklist}
            onChange={(e) => setDecklist(e.target.value)}
            required
          />
        </div>
        <button type="submit">Upload Deck</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DeckUploader;
