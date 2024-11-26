import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar solicitudes a APIs con estados de carga, éxito y error.
 * @param {Function} apiFunction - Función que realiza la solicitud a la API.
 * @returns {Object} - Estado de la solicitud y función para ejecutarla.
 */
const useApiRequest = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      //console.log("🚀 ~ execute ~ args:", payload)
      const response = await apiFunction(payload);
      (response.status == 200) ? setSuccess(response) : setError('Failed');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }

  }, [apiFunction]);

  return { loading, success, error, execute };
};

export default useApiRequest;
