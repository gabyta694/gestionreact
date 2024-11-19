import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';


const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  // Cargar usuarios desde la API
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios`);
        console.log('Usuarios obtenidos:', response.data); 
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        setMensaje('Error al cargar los usuarios');
      }
    };
    obtenerUsuarios();
  }, []);

  // Función para eliminar un usuario
  const eliminarUsuario = (id) => {
    console.log("Eliminando usuario con ID:", id);  // Asegúrate de que el id sea correcto
  
    if (id) {
      axios.delete(`${process.env.REACT_APP_API_URL}/usuario/${id}`)
        .then((response) => {
          console.log('Usuario eliminado:', response.data);
          // Filtra el usuario eliminado de la lista en el frontend
          setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id_usuario !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error);
        });
    } else {
      console.error("El ID del usuario es indefinido");
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
      <h2 className="titulo">Listar Usuarios</h2>
      <h3 className="subtitulo">Detalles de Usuarios</h3>

      {/* Grilla de usuarios */}
      {mensaje && <p>{mensaje}</p>}
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.nombre_usuario}</td>
              <td>{usuario.rut}-{usuario.dv}</td>
              <td>{usuario.correo_usuario}</td>
              <td>{usuario.rol}</td>
              <td>
              <button
            onClick={() => navigate(`/actualizar/${usuario.id_usuario}`)}
            className="btn-accion"
          >
            Actualizar
          </button>
                <button onClick={() => eliminarUsuario(usuario.id_usuario)}>
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

export default ListarUsuarios;
