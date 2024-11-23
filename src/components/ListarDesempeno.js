import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';

const ListarDesempeno = () => {
  const [desempeño, setDesempeño] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  // Obtener el rol y el ID del usuario desde el localStorage
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('id_usuario');

  // Cargar evaluación desde la API
  useEffect(() => {
    const obtenerDesempeño = async () => {
      const userId = localStorage.getItem('id_usuario');
      const userRole = localStorage.getItem('userRole');
  
      console.log("ID Usuario:", userId);  // Verifica el id del usuario
      console.log("Rol Usuario:", userRole); // Verifica el rol del usuario
  
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/evaluaciones`, {
      params: { userRole, userId }  // Enviando los parámetros de filtro
    });
    
    console.log('Desempeño obtenido:', response.data);  // Verifica si los datos están completos

    if (userRole === 'admin') {
      setDesempeño(response.data);  // El admin ve todos los desempeños
    } else {
      // El usuario normal solo ve su propio desempeño
      const filteredDesempeno = response.data.filter(item => item.id_usuario === parseInt(userId));
      console.log('Desempeño filtrado para el usuario:', filteredDesempeno);  // Verifica los datos filtrados
      setDesempeño(filteredDesempeno);
    }
  } catch (error) {
    console.error('Error al obtener el desempeño:', error);
    setMensaje('Error al cargar el desempeño');
  }
};
  
    obtenerDesempeño();
  }, []);
  
    // Función para eliminar un desempeño
  const eliminarDesempeño = (id) => {
    console.log("Eliminando desempeño con ID:", id);  
  
    if (id) {
      axios.delete(`${process.env.REACT_APP_API_URL}/evaluacion/${id}`)
        .then((response) => {
          console.log('Desempeño eliminado:', response.data);
          // Filtra el desempeño eliminado de la lista en el frontend
          setDesempeño(prevDesempeño => prevDesempeño.filter(evaluacion => evaluacion.id_evaluacion !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar el desempeño:', error);
        });
    } else {
      console.error("El ID del desempeño es indefinido");
    }
  };
  
  // Función para volver a la pantalla principal dependiendo del rol
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
      <h2 className="titulo">Listar Desempeños</h2>
      <h3 className="subtitulo">Detalles de los desempeños</h3>

      {/* Grilla de proyectos */}
      {mensaje && <p>{mensaje}</p>}
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Desempeño</th>
            <th>Comentarios</th>
            <th>Fecha Evaluación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {desempeño.map((evaluacion) => (
            <tr key={evaluacion.id_evaluacion}>
              <td>{evaluacion.nombre_usuario}</td>  {/* Nombre del usuario */}
              <td>{evaluacion.nombre_proyecto}</td> {/* Nombre del proyecto */}
              <td>{evaluacion.nombre_tarea}</td>    {/* Nombre de la tarea */}
              <td>{evaluacion.estado}</td>
              <td>{evaluacion.desempeño}</td>
              <td>{evaluacion.comentarios}</td> 
              <td>{evaluacion.fecha_evaluacion}</td> 
              <td>
                <button
                  onClick={() => navigate(`/actualizardesempeno/${evaluacion.id_evaluacion}`)}
                  className="btn-accion"
                >
                  Actualizar
                </button>
                {userRole === 'admin' && (
                  <button onClick={() => eliminarDesempeño(evaluacion.id_evaluacion)}>
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarDesempeno;
