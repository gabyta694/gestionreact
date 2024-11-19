import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './User.css'; 

const User = () => {
  const navigate = useNavigate(); // Hook para navegación
  // Obtén el nombre del usuario desde el almacenamiento local
  const nombreUsuario = localStorage.getItem('nombre_usuario') || 'Administrador';
  
  const handleLogout = () => {
    // Elimina los datos del usuario del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('nombre_usuario');
    
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div className="user-container">
      <h1>Bienvenido {nombreUsuario}</h1>
      <p>Seleccione la opcion con la operación requerida para continuar</p>

      <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>

      {/* Contenedor de los íconos en una cuadrícula de 3x2 */}
      <div className="icon-grid">
        {/* Icono: Tareas */}
        <div className="icon-item">
          <h3>Tareas</h3>
          <img src="/images/tarea.ico" alt="Tarea" className="icon-image" />
          <Link to="/agregartarea">Agregar Tareas</Link>
          <Link to="/listartareas">Ver Tareas</Link>
        </div>

        {/* Icono: Historial */}
        <div className="icon-item">
          <h3>Historial</h3>
          <img src="/images/historial.ico" alt="Historial" className="icon-image" />
          <Link to="/listarhistorial">Ver Historial</Link>
        </div>

        {/* Icono: Desempeño */}
        <div className="icon-item">
          <h3>Desempeño</h3>
          <img src="/images/desempeno.ico" alt="Desempeno" className="icon-image" />
          <Link to="/listardesempeno">Ver Desempeño</Link>
        </div>

      </div>
    </div>
  );
  
};

export default User;