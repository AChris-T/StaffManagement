/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const passwordVisibility = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userText, setUserText] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange = (e) => {
    setUserText(e.value);
  };

  const Icon = passwordVisible ? FaEye : FaEyeSlash;

  return [
    passwordVisible,
    togglePasswordVisibility,
    Icon,
    handleChange,
    userText,
  ];
};

export default passwordVisibility;
