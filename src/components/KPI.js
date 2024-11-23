import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListarFormulario.css';

const KPI = ({ usuarioId }) => {
  const [totalTareas, setTotalTareas] = useState(0);
  const [tareasPorUsuario, setTareasPorUsuario] = useState(0);
  const [totalContrapartes, setTotalContrapartes] = useState(0);
  const [contrapartesPorUsuario, setContrapartesPorUsuario] = useState([]);
  const [totalProyectos, setTotalProyectos] = useState(0);
  const [proyectosPorUsuario, setProyectosPorUsuario] = useState([]);
  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);
  const [evaluacionesPorUsuario, setEvaluacionesPorUsuario] = useState(0);
  const [promedioDesempenoTotal, setPromedioDesempenoTotal] = useState(null);
  const [promedioDesempenoPorUsuario, setPromedioDesempenoPorUsuario] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(usuarioId); 
  const [usuarios, setUsuarios] = useState([]); 
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('id_usuario');

  const handleVolver = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  useEffect(() => {
    // Configurar el selectedUserId
    if (userRole === 'admin') {
      setSelectedUserId(userId); // Administrador puede cambiar
    } else {
      setSelectedUserId(userId); // Usuario normal siempre ve sus datos
    }
  }, [userRole, userId]);

  useEffect(() => {
    if (userRole === 'admin') {
      const obtenerUsuarios = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`);
          if (!response.ok) {
            throw new Error('No se pudieron obtener los usuarios');
          }
          const data = await response.json();
          setUsuarios(data);
        } catch (err) {
          console.error('Error al obtener usuarios:', err.message);
        }
      };

      obtenerUsuarios();
    }
  }, [userRole]);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tareas/usuario/${selectedUserId}`);
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }

        const data = await response.json();
        if (data.total_tareas && data.tareas_por_usuario) {
          setTotalTareas(data.total_tareas[0]?.total_tareas || 0);
          setTareasPorUsuario(data.tareas_por_usuario[0]?.tareas_por_usuario || 0);
        } else {
          throw new Error('Datos no disponibles o estructura incorrecta');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (selectedUserId) {
      obtenerTareas();
    }
  }, [selectedUserId]);

  useEffect(() => {
    const obtenerContrapartesYProyectos = async () => {
      try {
        const contrapartesResponse = await fetch(`${process.env.REACT_APP_API_URL}/contar-contrapartes/${selectedUserId}`);
        const proyectosResponse = await fetch(`${process.env.REACT_APP_API_URL}/contar-proyectos/${selectedUserId}`);

        if (!contrapartesResponse.ok || !proyectosResponse.ok) {
          throw new Error('No se pudieron obtener los datos de contrapartes o proyectos');
        }

        const contrapartesData = await contrapartesResponse.json();
        const proyectosData = await proyectosResponse.json();

        setTotalContrapartes(contrapartesData.totalContrapartes || 0);
        setContrapartesPorUsuario(contrapartesData.contrapartesPorUsuario || []);
        setTotalProyectos(proyectosData.totalProyectos || 0);
        setProyectosPorUsuario(proyectosData.proyectosPorUsuario || []);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (selectedUserId) {
    obtenerContrapartesYProyectos();
    }
  }, [selectedUserId]);


  useEffect(() => {
    const obtenerEvaluaciones = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/contar-evaluaciones/${selectedUserId}`);
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos de evaluaciones');
        }
        const data = await response.json();
        console.log('Datos de evaluaciones:', data); // Agrega un log para ver la respuesta
        setTotalEvaluaciones(data.totalEvaluaciones || 0);
        setEvaluacionesPorUsuario(data.evaluacionesPorUsuario || []);
      } catch (err) {
        setError(err.message);
      }
    };

    const obtenerPromedioDesempeno = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/promedio-desempeno/${selectedUserId}`);
          if (!response.ok) {
            throw new Error('No se pudieron obtener los datos de desempeño');
          }
          const data = await response.json();
      
          // Verifica si los datos son correctos
          console.log("Datos recibidos de promedio de desempeño:", data);
      
          setPromedioDesempenoTotal(data.promedioDesempenoTotal || 0);
      
          // Encuentra el promedio específico del usuario actual
          const usuarioPromedio = data.promedioDesempenoPorUsuario.find(
          (usuario) => usuario.id_usuario.toString() === selectedUserId
          );

          // Si hay datos para el usuario, establece el promedio; si no, usa 0
          setPromedioDesempenoPorUsuario(usuarioPromedio ? usuarioPromedio.promedio : 0);

        } catch (err) {
        setError(err.message);
        }
      };
  
      if (selectedUserId) {
    obtenerEvaluaciones();
    obtenerPromedioDesempeno();
      }
  }, [selectedUserId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listar-usuarios">
      <button onClick={handleVolver} className="volver-button">
        Volver a la pantalla principal
      </button>

      <h2 className="titulo">Indicadores</h2>
      <h3 className="subtitulo">Seleccione el usuario que desea revisar</h3>

      {userRole === 'admin' && (
        <div className="seleccion-usuario">
          <label htmlFor="usuario-select">Usuario:</label>
          <select
            id="usuario-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nombre_usuario}
              </option>
            ))}
          </select>
        </div>
      )}


<div className="contenedor-indicadores">
  <p>Total de tareas: {totalTareas || 'Sin datos disponibles'}</p>
  <p>Tareas del usuario {selectedUserId}: {tareasPorUsuario || 'Sin datos disponibles'}</p>
  <p>Contrapartes del usuario {selectedUserId}: {contrapartesPorUsuario || 'Sin datos disponibles'}</p>
  <p>Proyectos del usuario {selectedUserId}: {proyectosPorUsuario || 'Sin datos disponibles'}</p>

  <p>Total de evaluaciones: {totalEvaluaciones || 'Sin datos disponibles'}</p>
  <p>Evaluaciones del usuario {selectedUserId}: {
    evaluacionesPorUsuario && evaluacionesPorUsuario.length > 0
      ? evaluacionesPorUsuario[0]?.evaluaciones || '0.00'
      : '0.00'
  }</p>

  <p>Total Promedio de desempeño: {promedioDesempenoTotal ? promedioDesempenoTotal.toFixed(2) : '0.00'}</p>
  <p>Promedio de desempeño del usuario {selectedUserId}: {
    (typeof promedioDesempenoPorUsuario === 'number' && !isNaN(promedioDesempenoPorUsuario))
      ? promedioDesempenoPorUsuario.toFixed(2)
      : '0.00'
  }</p>
</div>
    </div>
  );
};

export default KPI;
