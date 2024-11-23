import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        correo_usuario: correo,
        password,
      });
  
      console.log('Respuesta del servidor:', response.data);
  
      // Guarda el token en el almacenamiento local o en el contexto
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.rol);
      localStorage.setItem('nombre_usuario', response.data.user.nombre_usuario);
      localStorage.setItem('id_usuario', response.data.user.id_usuario);
      
      // Obtén el rol desde la estructura correcta
      const userRole = response.data.user.rol;
  
      if (userRole === 'admin') {
        navigate('/admin'); // Redirige al admin a su página
      } else if (userRole === 'normal') {
        navigate('/user'); // Redirige a usuarios normales
      } else {
        console.error('Rol desconocido:', userRole);
        alert('Rol desconocido. Por favor, contacta con soporte.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales inválidas'); // Muestra un mensaje de error
    }
  };
  
  
  return (
    <div className="listar">
      <h2 className="tit">Iniciar Sesión</h2>
      <h3 className="subt">Para iniciar sesión ingrese su correo y contraseña</h3>
      <form onSubmit={handleLogin}>
      <label>Correo:</label>
        <input
          type="email"
          placeholder=""
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
