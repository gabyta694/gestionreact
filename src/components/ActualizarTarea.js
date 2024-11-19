import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EstiloFormulario.css'

const ActualizarTarea = () => {
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
  const [usuarios, setUsuarios] = useState([]); // Estado para usuarios
  const [proyectos, setProyectos] = useState([]); // Estado para proyectos
  const [contrapartes, setContrapartes] = useState([]); // Estado para contraparte
  const [error, setError] = useState('');
  const { id } = useParams();  // Extrae el id de la URL 
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/listartareas');  // Redirige a la ruta de Listartareas
  };

  const opcionesEstado = ["pendiente", "en progreso", "terminado"];

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Cargar la tarea específica
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/tarea/${id}`);
          const tarea = response.data;
           // Cargar las listas de usuarios, proyectos, y contrapartes
          const [usuariosRes, proyectosRes, contrapartesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/usuarios`),
          axios.get(`${process.env.REACT_APP_API_URL}/proyectos`),
          axios.get(`${process.env.REACT_APP_API_URL}/contrapartes`)
        ]);
        // Ajustar formato de fecha
        setFormData({
          ...tarea,
          fecha_inicio: tarea.fecha_inicio ? new Date(tarea.fecha_inicio).toISOString().split('T')[0] : '',
          fecha_fin: tarea.fecha_fin ? new Date(tarea.fecha_fin).toISOString().split('T')[0] : '',
          id_usuario_asignado: tarea.id_usuario_asignado || '', // Validar campo existente
          id_contraparte_tarea: tarea.id_contraparte_tarea || '', // Validar campo existente
        });
        setUsuarios(usuariosRes.data);
        setProyectos(proyectosRes.data);
        setContrapartes(contrapartesRes.data);
      } catch (error) {
        setError('Error al cargar los datos');
      }
    };
    obtenerDatos();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tarea/${id}`, formData);
      alert('Tarea actualizada con éxito');
      navigate('/listartareas'); // Redirigir a la lista de tareas después de actualizar
    } catch (error) {
      setError('Error al actualizar la tarea');
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Actualizar Tarea</h2>
      <h3 className="subtitulo">Modifique los atributos necesarios</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nombre de Tarea:</label>
        <input
          type="text"
          value={formData.nombre_tarea}
          onChange={(e) => setFormData({ ...formData, nombre_tarea: e.target.value })}
        />
        <label>Descripción:</label>
        <textarea
          value={formData.descripcion_tarea}
          onChange={(e) => setFormData({ ...formData, descripcion_tarea: e.target.value })}
        />
        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={formData.fecha_inicio}
          onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
        />
        <label>Fecha Fin:</label>
        <input
          type="date"
          value={formData.fecha_fin}
          onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
        />
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

        <label>Proyecto:</label>
        <select
          value={formData.id_proyecto || ''}
          onChange={(e) => setFormData({ ...formData, id_proyecto: e.target.value })}
        >
        <option value="">Seleccione un proyecto</option>
        {proyectos.map((proyecto) => (
          <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>
            {proyecto.nombre_proyecto}
          </option>
        ))}
        </select>
        <label>Usuario Asignado:</label>
        <select
          value={formData.id_usuario_asignado || ''}
          onChange={(e) => setFormData({ ...formData, id_usuario_asignado: e.target.value })}
        >
        <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
        <option key={usuario.id_usuario} value={usuario.id_usuario}>
          {usuario.nombre_usuario}
        </option>
        ))}
        </select>
        <label>Contraparte:</label>
        <select
          value={formData.id_contraparte_tarea || ''}
          onChange={(e) => setFormData({ ...formData, id_contraparte_tarea: e.target.value })}
        >
        <option value="">Seleccione una contraparte</option>
         {contrapartes.map((contraparte) => (
        <option key={contraparte.id_contraparte} value={contraparte.id_contraparte}>
          {contraparte.nombre_contraparte}
        </option>
        ))}
        </select>
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

export default ActualizarTarea;


