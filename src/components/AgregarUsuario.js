import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EstiloFormulario.css';

const AgregarUsuario = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [rut, setRut] = useState('');
  const [dv, setDv] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('normal'); // Por defecto
  const navigate = useNavigate();

  const validarRut = (rut) => {
    // Validar que el RUT sea solo números
    const rutRegex = /^[0-9]+$/;
    return rutRegex.test(rut);
  };

  const validarDv = (dv) => {
    // Validar que el DV sea un número o la letra "K", y que tenga una longitud de 1
    return /^[0-9K]$/i.test(dv) && dv.length === 1;
  };

  const validarCorreo = (correo) => {
    // Validar que el correo tenga un formato válido
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return correoRegex.test(correo);
  };

  const agregarUsuario = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Validar campos
    if (!validarRut(rut)) {
      alert('El RUT debe contener solo números.');
      return;
    }

    if (!validarDv(dv)) {
      alert('El Dígito Verificador debe ser un número o la letra "K", y tener exactamente un carácter.');
      return;
    }

    if (!validarCorreo(correoUsuario)) {
      alert('El correo no tiene un formato válido.');
      return;
    }

    try {
      const nuevoUsuario = {
        nombre_usuario: nombreUsuario,
        rut: parseInt(rut, 10),
        dv,
        correo_usuario: correoUsuario,
        password,
        rol,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuario`, nuevoUsuario);

      if (response.status === 201 && response.data) {
        alert(response.data.message || 'Usuario agregado exitosamente');

        // Redirigir según el rol actual del usuario
        const storedRole = localStorage.getItem('userRole');
        if (storedRole === 'admin') {
          navigate('/admin'); // Redirigir al inicio del admin
        } else {
          navigate('/user'); // Redirigir al inicio del usuario normal
        }
      } else {
        alert('Hubo un problema al agregar el usuario.');
      }

      // Reiniciar los campos del formulario
      setNombreUsuario('');
      setRut('');
      setDv('');
      setCorreoUsuario('');
      setPassword('');
      setRol('normal'); // Reiniciar a valor por defecto
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      alert('Error al agregar usuario');
    }
  };

  // Función para el botón de cancelar
  const handleCancel = () => {
    const storedRole = localStorage.getItem('userRole'); // Obtén el rol desde el almacenamiento local
    if (storedRole === 'admin') {
      navigate('/admin'); // Redirige a la página de admin
    } else {
      navigate('/user'); // Redirige a la página de usuario normal
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Agregar Usuario</h2>
      <h3 className="subtitulo">Ingrese los datos requeridos en el formulario para agregar un nuevo registro</h3>
      <form onSubmit={agregarUsuario}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>RUT:</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value.replace(/[^0-9]/g, ''))}
            required
          />
        </div>
        <div>
          <label>Dígito Verificador:</label>
          <input
            type="text"
            value={dv}
            onChange={(e) => setDv(e.target.value.replace(/[^0-9Kk]/g, ''))}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correoUsuario}
            onChange={(e) => setCorreoUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit">Agregar Usuario</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarUsuario;
