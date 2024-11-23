import React from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';

const ListarHistorial = () => {
  const navigate = useNavigate();
  
  // Obtener el rol y el ID del usuario desde el localStorage
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('id_usuario');
  
  const handleVolver = () => {
    if (userRole === 'admin') {
      navigate('/admin'); // Redirige al admin
    } else {
      navigate('/user'); // Redirige al usuario normal
    }
  };
  
  return (
    <div className="listar-usuarios">
      {/* Botón de volver */}
      <button onClick={handleVolver} className="volver-button">
        Volver a la pantalla principal
      </button>

      {/* Título y subtítulo */}
      <h2 className="titulo">Listar Historial</h2>
      <h3 className="subtitulo">En construcción</h3>
    </div>
  );
};

export default ListarHistorial;