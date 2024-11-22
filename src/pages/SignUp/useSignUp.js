// hooks/useCreateAccount.js
import { useState } from 'react';
import { createAccountApi } from '../services/api';

const useCreateAccount = (user) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createAccount = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createAccountApi(accountData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAccount, loading, error, success };
};

export default useCreateAccount;
