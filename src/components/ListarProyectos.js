import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';


const ListarProyectos = () => {
  const [proyectos, setProyectos]= useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  // Cargar proyectos desde la API
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/proyectos`);
        console.log('Proyectos obtenidos:', response.data); 
        setProyectos(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        setMensaje('Error al cargar los proyectos');
      }
    };
    obtenerProyectos();
  }, []);

  // Función para eliminar un proyecto
  const eliminarProyecto = (id) => {
    console.log("Eliminando proyecto con ID:", id);  // Asegúrate de que el id sea correcto
  
    if (id) {
      axios.delete(`${process.env.REACT_APP_API_URL}/proyecto/${id}`)
        .then((response) => {
          console.log('Proyecto eliminado:', response.data);
          // Filtra el proyecto eliminado de la lista en el frontend
          setProyectos(prevProyectos => prevProyectos.filter(proyecto => proyecto.id_proyecto !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar el proyecto:', error);
        });
    } else {
      console.error("El ID del proyecto es indefinido");
    }
  };

  // Función para volver a la pantalla principal dependiendo del rol
  const handleVolver = () => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin') {
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
      <h2 className="titulo">Listar Proyectos</h2>
      <h3 className="subtitulo">Detalles de los proyectos</h3>

      
      {/* Grilla de proyectos */}
      {mensaje && <p>{mensaje}</p>}
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>Relevancia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id_proyecto}>
              <td>{proyecto.nombre_proyecto}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.fecha_inicio}</td>
              <td>{proyecto.fecha_fin}</td>
              <td>{proyecto.estado}</td>
              <td>{proyecto.relevancia}</td>
              <td>
              <button
            onClick={() => navigate(`/actualizarproyecto/${proyecto.id_proyecto}`)}
            className="btn-accion"
          >
            Actualizar
          </button>
                <button onClick={() => eliminarProyecto(proyecto.id_proyecto)}>
              Eliminar
            </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default ListarProyectos;