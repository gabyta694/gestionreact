import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EstiloFormulario.css'

const AgregarTarea = () => {
  const [proyectos, setProyectos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [contrapartes, setContrapartes] = useState([]);
  const [formData, setFormData] = useState({
    nombre_tarea: '',
    descripcion_tarea: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: '',
    id_proyecto: '',
    id_usuario_asignado: '',
    id_contraparte_tarea: ''
  });
  const navigate = useNavigate();

  // Cargar proyectos, usuarios y contrapartes al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const proyectosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/proyectos`);
        setProyectos(proyectosResponse.data);

        const usuariosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios`);
        setUsuarios(usuariosResponse.data);

        const contrapartesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/contrapartes`);
        setContrapartes(contrapartesResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tarea`, formData);
      if (response.status === 201) {
        alert('Tarea agregado exitosamente');
        // Redirigir según el rol del usuario almacenado
        const storedRole = localStorage.getItem('userRole');
        if (storedRole === 'admin') {
            navigate('/admin'); // Redirige a la página de inicio del admin
        } else {
            navigate('/user'); // Redirige a la página de inicio del usuario normal
        }
    }
    } catch (error) {
      console.error('Error al agregar tarea:', error);
      alert('Hubo un error al agregar la tarea');
    }
  };

  // Función para manejar el botón de cancelar
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
      <h2 className="titulo">Agregar Tarea</h2>
      <h3 className="subtitulo">Ingrese los datos requeridos en el formulario para agregar un nueva nueva tarea</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre de la Tarea:</label>
        <input type="text" name="nombre_tarea" value={formData.nombre_tarea} onChange={handleChange} required />

        <label>Descripción de la Tarea:</label>
        <textarea name="descripcion_tarea" value={formData.descripcion_tarea} onChange={handleChange} required />

        <label>Fecha Inicio:</label>
        <input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />

        <label>Fecha Fin:</label>
        <input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} required />

        <label>Estado:</label>
        <select name="estado" value={formData.estado} onChange={handleChange} required>
          <option value="">Seleccione un estado</option>
          <option value="en progreso">En Progreso</option>
          <option value="terminado">Terminado</option>
          <option value="pendiente">Pendiente</option>
        </select>

        <label>Proyecto:</label>
        <select name="id_proyecto" value={formData.id_proyecto} onChange={handleChange} required>
          <option value="">Seleccione un proyecto</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>
              {proyecto.nombre_proyecto}
            </option>
          ))}
        </select>

        <label>Usuario Asignado:</label>
        <select name="id_usuario_asignado" value={formData.id_usuario_asignado} onChange={handleChange} required>
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre_usuario}
            </option>
          ))}
        </select>

        <label>Contraparte:</label>
        <select name="id_contraparte_tarea" value={formData.id_contraparte_tarea} onChange={handleChange} required>
          <option value="">Seleccione una contraparte</option>
          {contrapartes.map((contraparte) => (
            <option key={contraparte.id_contraparte} value={contraparte.id_contraparte}>
              {contraparte.nombre_contraparte}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button type="submit">Agregar Tarea</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>

      </form>
    </div>
  );
};

export default AgregarTarea;

