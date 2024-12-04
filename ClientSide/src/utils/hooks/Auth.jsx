import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAuth } from '../constants/AuthContext';
import { login } from '@/services/Api/auth.model';

export default function Auth() {
  const [formData, setFromData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFromData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error('Email and password are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    return true;
  };

  const loginMutation = useMutation(
    async () => {
      const response = await login(formData);
      return response.data;
    },
    {
      onSuccess: (user) => {
        toast.success('Login successful!');
        loginUser(user);
        navigate('/');
      },
      onError: (err) => {
        const errorMessage =
          err.response?.data?.message ||
          (err.request
            ? 'Network error. Please try again.'
            : 'An error occurred. Please try again.');
        toast.error(errorMessage);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    loginMutation.mutate();
  };

  return {
    formData,
    loading: loginMutation.isLoading,
    handleLoginChange,
    handleSubmit,
  };
}
