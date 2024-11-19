import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EstiloFormulario.css'

const ActualizarDesempeno = () => {
  const [formData, setFormData] = useState({
    id_usuario: '',
    id_proyecto: '',
    id_tarea: '',
    estado: '',
    desempeño: '',
    comentarios: '',
    fecha_evaluacion: ''
  });
  const [usuarios, setUsuarios] = useState([]); // Estado para usuarios
  const [proyectos, setProyectos] = useState([]); // Estado para proyectos
  const [tareas, setTareas] = useState([]); // Estado para tareas
  const [error, setError] = useState('');
  const { id } = useParams();  // Extrae el id de la URL
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/listardesempeno');  // Redirige a la ruta de ListarDesempeño
  };

  const opcionesEstado = ["pendiente", "en progreso", "terminado"];

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Cargar la evaluación específica
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/evaluacion/${id}`);
        const evaluacion = response.data;
  
        // Cargar las listas de usuarios, proyectos, y tareas
        const [usuariosRes, proyectosRes, tareasRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/usuarios`),
          axios.get(`${process.env.REACT_APP_API_URL}/proyectos`),
          axios.get(`${process.env.REACT_APP_API_URL}/tareas`)
        ]);
  
        setFormData({
          ...evaluacion,
          fecha_evaluacion: evaluacion.fecha_evaluacion 
            ? new Date(evaluacion.fecha_evaluacion).toISOString().split('T')[0] 
            : '',
        });
        setUsuarios(usuariosRes.data);
        setProyectos(proyectosRes.data);
        setTareas(tareasRes.data);
      } catch (error) {
        setError('Error al cargar los datos');
      }
    };
  
    obtenerDatos();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/evaluacion/${id}`, formData);
      alert('Evaluación actualizada con éxito');
      navigate('/listardesempeno'); // Redirigir después de actualizar
    } catch (error) {
      setError('Error al actualizar la evaluación');
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Actualizar el Desempeño</h2>
      <h3 className="subtitulo">Modifique los atributos necesarios</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nombre del Usuario:</label>
        <select
          value={formData.id_usuario}
          onChange={(e) => setFormData({ ...formData, id_usuario: e.target.value })}
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre_usuario}
          </option>
        ))}
        </select>
        <label>Nombre del Proyecto:</label>
        <select
          value={formData.id_proyecto}
          onChange={(e) => setFormData({ ...formData, id_proyecto: e.target.value })}
        >
        <option value="">Seleccione un proyecto</option>
        {proyectos.map((proyecto) => (
          <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>
            {proyecto.nombre_proyecto}
          </option>
        ))}
        </select>
        <label>Nombre de la Tarea:</label>
        <select
          value={formData.id_tarea}
          onChange={(e) => setFormData({ ...formData, id_tarea: e.target.value })}
        >
        <option value="">Seleccione una tarea</option>
          {tareas.map((tarea) => (
          <option key={tarea.id_tarea} value={tarea.id_tarea}>
            {tarea.nombre_tarea}
        </option>
        ))}
        </select>
        <label>Estado:</label>
        <select
          value={formData.estado}
          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
        >
          <option value="">Seleccione un estado</option>
          {opcionesEstado.map((estado, index) => (
            <option key={index} value={estado}>
              {estado}
            </option>
          ))}
        </select>
        <label>Desempeño (1-7):</label>
        <input
          type="number"
          min="1"
          max="7"
        value={formData.desempeño}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value >= 1 && value <= 7) {
            setFormData({ ...formData, desempeño: value });
          }
        }}
        />
        <label>Comentarios:</label>
        <textarea
          value={formData.comentarios}
          onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
        />
        <label>Fecha de la Evaluación:</label>
        <input
          type="date"
          value={formData.fecha_evaluacion}
          onChange={(e) => setFormData({ ...formData, fecha_evaluacion: e.target.value })}
        />         
        <div className="button-group">
        <button type="submit">Actualizar Tarea</button>
        <button type="button" onClick={handleCancelar}>
               Cancelar
          </button>
          </div>
      </form>
    </div>
  );
};

export default ActualizarDesempeno;