import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EstiloFormulario.css'

const AgregarDesempeno = () => {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    id_evaluacion: '',
    id_usuario: '',
    id_proyecto: '',
    id_tarea: '',
    fecha_fin: '',
    estado: '',
    desempeño: '',
    comentarios: '',
    fecha_evaluacion: ''
  });
  const navigate = useNavigate();

  // Cargar usuarios inicialmente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios`);
        setUsuarios(usuariosResponse.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  // Cargar proyectos y tareas cada vez que cambia el usuario
  useEffect(() => {
    const fetchProyectosYTareas = async () => {
      if (formData.id_usuario) {
        try {
          const proyectosResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/usuarios/${formData.id_usuario}/proyectos`
          );
          const tareasResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/usuarios/${formData.id_usuario}/tareas`
          );
          setProyectos(proyectosResponse.data); 
          setTareas(tareasResponse.data);
        } catch (error) {
          console.error('Error al obtener proyectos y tareas:', error);
        }
      } else {
        // Si no hay usuario seleccionado, vaciar proyectos y tareas
        setProyectos([]);
        setTareas([]);
      }
    };
    fetchProyectosYTareas();
  }, [formData.id_usuario]);

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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/evaluacion`, formData);
      if (response.status === 201) {
        alert('Evaluación agregada exitosamente');
        const storedRole = localStorage.getItem('userRole');
        navigate(storedRole === 'admin' ? '/admin' : '/user');
      }
    } catch (error) {
      console.error('Error al agregar evaluación:', error);
      alert('Hubo un error al agregar la evaluación');
    }
  };

  // Función para manejar el botón de cancelar
  const handleCancel = () => {
    const storedRole = localStorage.getItem('userRole');
    navigate(storedRole === 'admin' ? '/admin' : '/user');
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Agregar Evaluación</h2>
      <h3 className="subtitulo">Ingrese los datos requeridos en el formulario para agregar un nueva nueva evaluación</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Usuario:</label>
        <select name="id_usuario" value={formData.id_usuario} onChange={handleChange} required>
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre_usuario}
            </option>
          ))}
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
        <label>Tarea:</label>
        <select name="id_tarea" value={formData.id_tarea} onChange={handleChange} required>
          <option value="">Seleccione una tarea</option>
          {tareas.map((tarea) => (
            <option key={tarea.id_tarea} value={tarea.id_tarea}>
              {tarea.nombre_tarea}
            </option>
          ))}
        </select>
        <label>Estado:</label>
        <select name="estado" value={formData.estado} onChange={handleChange} required>
          <option value="">Seleccione un estado</option>
          <option value="en progreso">En Progreso</option>
          <option value="terminado">Terminado</option>
          <option value="pendiente">Pendiente</option>
        </select>
        <label>Desempeño:</label>
        <select name="desempeño" value={formData.desempeño} onChange={handleChange} required>
          <option value="">Seleccione el desempeño</option>
          {[1, 2, 3, 4, 5, 6, 7].map((valor) => (
            <option key={valor} value={valor}>
              {valor}
            </option>
          ))}
        </select>
        <label>Descripción de la Evaluación:</label>
        <textarea name="comentarios" value={formData.comentarios} onChange={handleChange} required />
        <label>Fecha de la evaluación:</label>
        <input type="date" name="fecha_evaluacion" value={formData.fecha_evaluacion} onChange={handleChange} required />
        
        <div className="button-group">
          <button type="submit">Agregar Evaluación</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarDesempeno;


