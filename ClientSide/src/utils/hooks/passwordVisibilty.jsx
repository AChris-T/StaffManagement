/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const passwordVisibility = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Icon = passwordVisible ? FaEye : FaEyeSlash;

  return [passwordVisible, togglePasswordVisibility, Icon];
};

export default passwordVisibility;
