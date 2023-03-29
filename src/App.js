import React, { useState } from 'react';
import './App.css';

function App() {
  const [cocktailName, setCocktailName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/cocteles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: cocktailName })
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('Error al enviar el coctel');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al enviar el coctel');
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del coctel:
          <input type="text" value={cocktailName} onChange={(e) => setCocktailName(e.target.value)} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;