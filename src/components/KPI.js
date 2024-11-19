import React, { useState, useEffect } from 'react';

const KPI = ({ usuarioId }) => {
  const [totalTareas, setTotalTareas] = useState(0);
  const [tareasPorUsuario, setTareasPorUsuario] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tareas/usuario/${usuarioId}`);
        
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }

        const data = await response.json();
        
        // Verifica la respuesta del backend
        console.log('Respuesta del backend:', data);

        // Asegúrate de que los datos existen antes de acceder a ellos
        if (data.total_tareas && data.tareas_por_usuario) {
          setTotalTareas(data.total_tareas[0]?.total_tareas || 0);  // Accede al valor total_tareas
          setTareasPorUsuario(data.tareas_por_usuario[0]?.tareas_por_usuario || 0);  // Accede al valor tareas_por_usuario
        } else {
          throw new Error('Datos no disponibles o estructura incorrecta');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    obtenerTareas();
}, [usuarioId]);


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Datos de tareas</h1>
      <p>Total de tareas: {totalTareas}</p>
      <p>Tareas asignadas al usuario {usuarioId}: {tareasPorUsuario}</p>
    </div>
  );
};

export default KPI;
