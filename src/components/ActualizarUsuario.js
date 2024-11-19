import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EstiloFormulario.css'

const ActualizarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const handleCancelar = () => {
    navigate('/listarusuarios');  // Redirige a la ruta de ListarUsuarios
  };

  // Estado para los datos del usuario
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    rut: '',
    dv: '',
    correo_usuario: '',
    password: '',
    rol: ''
  });

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Estado para controlar la visibilidad de la contraseña
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Cargar los datos del usuario cuando el componente se monta
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/usuario/${id}`)
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        setError('Error al cargar los datos del usuario');
      });
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Enviar datos actualizados al backend
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedUser = { ...usuario };
  
    axios
      .put(`${process.env.REACT_APP_API_URL}/usuario/${id}`, updatedUser)
      .then(response => {
        alert(response.data.message);
        navigate('/listarusuarios'); // Navegar a la lista de usuarios después de actualizar
      })
      .catch(error => {
        setError('Error al actualizar el usuario');
      });
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Modificar Usuario</h2>
      <h3 className="subtitulo">Modifique los atributos necesarios</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="nombre_usuario"
            value={usuario.nombre_usuario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>RUT:</label>
          <input
            type="text"
            name="rut"
            value={usuario.rut}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>DV:</label>
          <input
            type="text"
            name="dv"
            value={usuario.dv}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="correo_usuario"
            value={usuario.correo_usuario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"} // Alternar entre "text" y "password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>
        <div>
          <label>Rol:</label>
          <input
            type="text"
            name="rol"
            value={usuario.rol}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Actualizar Usuario</button>
          <button type="button" onClick={handleCancelar}>
                Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarUsuario;
