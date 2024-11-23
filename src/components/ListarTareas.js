import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';

const ListarTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const userId = localStorage.getItem('id_usuario');
        const userRole = localStorage.getItem('userRole');
        console.log('userId:', userId, 'userRole:', userRole); // Verifica los valores enviados
  
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tareas`, {
          params: { userId, userRole },
        });
  
        console.log('Tareas obtenidas:', response.data); // Verifica la respuesta del backend
        setTareas(response.data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
        setMensaje('Error al cargar las tareas');
      }
    };
    obtenerTareas();
  }, []);
 

  const eliminarTarea = (id) => {
    console.log('Eliminando tarea con ID:', id);

    if (id) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/tarea/${id}`)
        .then((response) => {
          console.log('Tarea eliminada:', response.data);
          // Filtrar la tarea eliminada de la lista en el frontend
          setTareas((prevTareas) =>
            prevTareas.filter((tarea) => tarea.id_tarea !== id)
          );
        })
        .catch((error) => {
          console.error('Error al eliminar la tarea:', error);
        });
    } else {
      console.error('El ID de la tarea es indefinido');
    }
  };

  const handleVolver = () => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="listar-usuarios">
      <button onClick={handleVolver} className="volver-button">
        Volver a la pantalla principal
      </button>
      <h2 className="titulo">Listar Tareas</h2>
      <h3 className="subtitulo">Detalles de las tareas</h3>

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
              <td>{tarea.nombre_proyecto}</td>
              <td>{tarea.nombre_usuario_asignado}</td>
              <td>{tarea.nombre_contraparte_tarea}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/actualizartarea/${tarea.id_tarea}`)
                  }
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
