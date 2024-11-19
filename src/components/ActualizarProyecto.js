import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EstiloFormulario.css'


const ActualizarProyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleCancelar = () => {
    navigate('/listarproyectos');  // Redirige a la ruta de ListarUsuarios
  };

  // Estado para los datos del usuario
  const [proyecto, setProyecto] = useState({
    nombre_proyecto: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: '',
    relevancia: ''
  });

  // Estado para manejar errores
  const [error, setError] = useState(null);

  const opcionesEstado = ["pendiente", "en progreso", "terminado"];
  const opcionesRelevancia = ["estrategico", "mantencion", "desarrollo"];

  // Cargar los datos cuando el componente se monta
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/proyecto/${id}`)
      .then(response => {
        const data = response.data;

        // Convertir fechas al formato yyyy-MM-dd
        const fecha_inicio = data.fecha_inicio ? data.fecha_inicio.substring(0, 10) : '';
        const fecha_fin = data.fecha_fin ? data.fecha_fin.substring(0, 10) : '';

        setProyecto({
          ...data,
          fecha_inicio,
          fecha_fin
        });
      })
      .catch(error => {
        setError('Error al cargar los datos del proyecto');
      });
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  // Enviar datos actualizados al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/proyecto/${id}`, proyecto)
      .then(response => {
        alert(response.data.message);
        navigate('/listarproyectos'); // Navegar a la lista de proyectos después de actualizar
      })
      .catch(error => {
        setError('Error al actualizar el proyecto');
      });
  };
  

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Modificar Proyecto</h2>
      <h3 className="subtitulo">Modifique los atributos necesarios</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Proyecto:</label>
          <input
            type="text"
            name="nombre_proyecto"
            value={proyecto.nombre_proyecto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={proyecto.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha Inicio:</label>
          <input
            type="date"
            name="fecha_inicio"
            value={proyecto.fecha_inicio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha Fin:</label>
          <input
            type="date"
            name="fecha_fin"
            value={proyecto.fecha_fin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado:</label>
          <select
            name="estado"
            value={proyecto.estado}
            onChange={handleChange}
          >
            <option value="">Seleccione un estado</option>
            {opcionesEstado.map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Relevancia:</label>
          <select
            name="relevancia"
            value={proyecto.relevancia}
            onChange={handleChange}
          >
            <option value="">Seleccione relevancia</option>
            {opcionesRelevancia.map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button type="submit">Actualizar Proyecto</button>
          <button type="button" onClick={handleCancelar}>
               Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};


export default ActualizarProyecto;