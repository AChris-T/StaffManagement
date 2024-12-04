import { CIVIL_DEFENSE_API } from '@/utils/constants/Api';
import axios from 'axios';

export const login = async (formData) => {
  const response = await axios.post(
    `${CIVIL_DEFENSE_API}/auth/login`,
    JSON.stringify(formData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};
