import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css'; 


const Admin = () => {
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
    <div className="admin-container">
      <h1>Administrador {nombreUsuario}</h1>
      <p>Seleccione la opcion con la operación requerida para continuar</p>

      <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      
      {/* Contenedor de los íconos en una cuadrícula de 3x2 */}
      <div className="table-container">
      <div className="icon-grid">
        {/* Icono: Usuarios */}
        <div className="icon-item">
          <h3>Usuarios</h3>
          <img src="/images/usuario.ico" alt="Usuarios" className="icon-image" />
          <Link to="/agregar">Agregar Usuario</Link>
          <Link to="/listarusuarios">Ver Usuarios</Link>
        </div>

        {/* Icono: Proyectos */}
        <div className="icon-item">
          <h3>Proyectos</h3>
          <img src="/images/proyecto.ico" alt="Proyectos" className="icon-image" />
          <Link to="/agregarproyectos">Agregar Proyectos</Link>
          <Link to="/listarproyectos">Ver Proyectos</Link>
        </div>

        {/* Icono: Contraparte */}
        <div className="icon-item">
          <h3>Contraparte</h3>
          <img src="/images/contraparte.ico" alt="Contraparte" className="icon-image" />
          <Link to="/agregarcontraparte">Agregar Contraparte</Link>
          <Link to="/listarcontrapartes">Ver Contrapartes</Link>
        </div>

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
          <Link to="/agregardesempeno">Agregar Desempeño</Link>
          <Link to="/listardesempeno">Ver Desempeño</Link>
          <Link to="/indicadores">Indicadores</Link>
        </div>
        </div>      
        </div>
    </div>
  );
};

export default Admin;