import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EstiloFormulario.css'


const ActualizarContraparte = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleCancelar = () => {
    navigate('/listarcontrapartes');  // Redirige a la ruta de ListarUsuarios
  };

  // Estado para los datos del usuario
  const [contraparte, setContraparte] = useState({
    nombre_contraparte: '',
    rut_contraparte: '',
    dv_contraparte: '',
    correo_contraparte: '',
    telefono: ''
  });

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Cargar los datos cuando el componente se monta
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/contraparte/${id}`)
      .then(response => {
        setContraparte(response.data);
      })
      .catch(error => {
        setError('Error al cargar los datos de la contraparte');
      });
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContraparte({ ...contraparte, [name]: value });
  };

  // Enviar datos actualizados al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/contraparte/${id}`, contraparte)
      .then(response => {
        alert(response.data.message);
        navigate('/listarcontrapartes'); // Navegar a la lista de contrapartes después de actualizar
      })
      .catch(error => {
        setError('Error al actualizar la contraparte');
      });
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Modificar Contraparte</h2>
      <h3 className="subtitulo">Modifique los atributos necesarios</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la contraparte:</label>
          <input
            type="text"
            name="nombre_contraparte"
            value={contraparte.nombre_contraparte}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rut contraparte:</label>
          <input
            type="text"
            name="rut_contraparte"
            value={contraparte.rut_contraparte}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>dv contraparte:</label>
          <input
            type="text"
            name="dv_contraparte"
            value={contraparte.dv_contraparte}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo_contraparte"
            value={contraparte.correo_contraparte}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={contraparte.telefono}
            onChange={handleChange}
          />
        </div>
        
        <div className="button-group">
          <button type="submit">Actualizar Contraparte</button>
          <button type="button" onClick={handleCancelar}>
               Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};


export default ActualizarContraparte;