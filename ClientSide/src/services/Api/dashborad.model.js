import axios from 'axios';
import Cookies from 'js-cookie';
import { CIVIL_DEFENSE_API } from '@/utils/constants/Api';
import { toast } from 'react-toastify';

const getToken = () => {
  const userCookie = Cookies.get('user');

  console.log(userCookie);
  if (!userCookie) {
    throw new Error('User is not logged in.'); // Handle missing user cookie
  }

  try {
    const user = JSON.parse(userCookie);
    return user.data.token || null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    throw new Error('Invalid user data in cookie.');
  }
};
export const AddNewPersonnel = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/profile-info`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    const userId = localStorage.setItem('userid', response.data.data.id);
    console.log(userId);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
export const NextOfKin = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/next-of-kin`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const CoursesInform = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/courses-attended`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const PMInform = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/professional-membership`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
//service Record

export const ServiceRecord = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/next-of-kin`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const AcademicRecord = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/academic-qualifications`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
export const ProgressionRecord = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/progression`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
// deployment
export const DeploymentRecord = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/deployment-record`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

//digital record
export const DigitalRecord = async (formData) => {
  try {
    const token = getToken('token');

    const response = await axios.post(
      `${CIVIL_DEFENSE_API}/user/registry/upload/digital-files`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('creator', response.data.data.id);
    return response.data; // Axios already parses the JSON response
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error(`Error: No response received from server`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const uploadFile = async (file) => {
  const url = `${CIVIL_DEFENSE_API}/user/upload`;

  try {
    const token = getToken('token'); // Replace with your token retrieval logic

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'multipart/form-data', // Form data type
      },
    });

    return response.data.data.urls; // Return uploaded file URL
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with a status outside 2xx
      throw new Error(
        `Error: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      throw new Error('Error: No response received from server');
    } else {
      // Other errors
      throw new Error(`Error: ${error.message}`);
    }
  }
};
export const fetchLocalGovernment = async (state) => {
  const url = `${CIVIL_DEFENSE_API}/user/lga?state=${state}`;
  const token = getToken('token');

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data || [];
  } catch (error) {
    toast.error('Error fetching local governments:', error);
    return [];
  }
};
