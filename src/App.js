import React, { useState } from 'react';
import axios from './http';

function App() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    //change entry to database

    event.preventDefault();
    axios.post('/cocteles', { nombre })
      .then((response) => {
        setMensaje(response.data);
      })
      .catch((error) => {
        setNombre('');
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del coctel:
          <input type="text" value={nombre} onChange={handleNombreChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default App;
