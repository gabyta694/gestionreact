import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';

const ListarContrapartes = () => {
  const [contrapartes, setContrapartes]= useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  // Cargar contrapartes desde la API
  useEffect(() => {
    const obtenerContrapartes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/contrapartes`);
        console.log('Contrapartes obtenidos:', response.data); 
        setContrapartes(response.data);
      } catch (error) {
        console.error('Error al obtener las contrapartes:', error);
        setMensaje('Error al cargar las contrapartes');
      }
    };
    obtenerContrapartes();
  }, []);

  // Función para eliminar un proyecto
  const eliminarContraparte = (id) => {
    console.log("Eliminando la contraparte con ID:", id);  
  
    if (id) {
      axios.delete(`${process.env.REACT_APP_API_URL}/contraparte/${id}`)
        .then((response) => {
          console.log('Contraparte eliminado:', response.data);
          // Filtra la contraparte eliminado de la lista en el frontend
          setContrapartes(prevContrapartes => prevContrapartes.filter(contraparte => contraparte.id_contraparte !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar la contraparte:', error);
        });
    } else {
      console.error("El ID de la contraparte es indefinido");
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
      <h2 className="titulo">Listar Contrapartes</h2>
      <h3 className="subtitulo">Detalles de las contrapartes</h3>

      {/* Grilla de contrapartes */}
      {mensaje && <p>{mensaje}</p>}
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rut</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contrapartes.map((contraparte) => (
            <tr key={contraparte.id_contraparte}>
              <td>{contraparte.nombre_contraparte}</td>
              <td>{contraparte.rut_contraparte}-{contraparte.dv_contraparte}</td> 
              <td>{contraparte.correo_contraparte}</td>
              <td>{contraparte.telefono}</td>
              <td>
              <button
            onClick={() => navigate(`/actualizarcontraparte/${contraparte.id_contraparte}`)}
            className="btn-accion"
          >
            Actualizar
          </button>
                <button onClick={() => eliminarContraparte(contraparte.id_contraparte)}>
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

export default ListarContrapartes;