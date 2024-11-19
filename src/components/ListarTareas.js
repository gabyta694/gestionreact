import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';


const ListarTareas = () => {
  const [tareas, setTareas]= useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  // Cargar proyectos desde la API
  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tareas`);
        console.log('Tareas obtenidos:', response.data); 
        setTareas(response.data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
        setMensaje('Error al cargar las tareas');
      }
    };
    obtenerTareas();
  }, []);

  // Función para eliminar un proyecto
  const eliminarTarea = (id) => {
    console.log("Eliminando tarea con ID:", id);  // Asegúrate de que el id sea correcto
  
    if (id) {
      axios.delete(`${process.env.REACT_APP_API_URL}/tarea/${id}`)
        .then((response) => {
          console.log('Tarea eliminada:', response.data);
          // Filtra el tarea eliminada de la lista en el frontend
          setTareas(prevTareas => prevTareas.filter(tarea => tarea.id_tarea !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar el tarea:', error);
        });
    } else {
      console.error("El ID del tarea es indefinido");
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
      <h2 className="titulo">Listar Tareas</h2>
      <h3 className="subtitulo">Detalles de las tareas</h3>

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
            <th>Proyecto</th>
            <th>Usuario Asignado</th>
            <th>Contraparte</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id_tarea}>
              <td>{tarea.nombre_tarea}</td>
              <td>{tarea.descripcion_tarea}</td>
              <td>{tarea.fecha_inicio}</td>
              <td>{tarea.fecha_fin}</td>
              <td>{tarea.estado}</td>
              <td>{tarea.nombre_proyecto}</td> {/* Nombre del proyecto */}
              <td>{tarea.nombre_usuario_asignado}</td> {/* Nombre del usuario */}
              <td>{tarea.nombre_contraparte_tarea}</td> {/* Nombre de la contraparte */}
              <td>
              <button
            onClick={() => navigate(`/actualizartarea/${tarea.id_tarea}`)}
            className="btn-accion"
          >
            Actualizar
          </button>
                <button onClick={() => eliminarTarea(tarea.id_tarea)}>
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

export default ListarTareas;