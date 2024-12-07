/* eslint-disable react-hooks/rules-of-hooks */
import {
  AcademicRecord,
  AddNewPersonnel,
  CoursesInform,
  DeploymentRecord,
  DigitalRecord,
  fetchLocalGovernment,
  NextOfKin,
  PMInform,
  ProgressionRecord,
  ServiceRecord,
  uploadFile,
} from '@/services/Api/dashborad.model';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(AddNewPersonnel, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

//next of kin

export const nextofKinMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(NextOfKin, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

//course
export const coursesRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(CoursesInform, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

export const pmRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(PMInform, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

//service record

export const serviceRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(ServiceRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

export const academicRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(AcademicRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};
export const progressionRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(ProgressionRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

export const deploymentRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(DeploymentRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('deploy'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

export const digitalFilesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(DigitalRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('digital'); // Invalidate user list
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      toast.error(error.message);
    },
  });
};

export const useFileUploadMutation = () => {
  return useMutation(uploadFile, {
    onSuccess: (url) => {
      console.log('Uploaded File URL:', url);
    },
    onError: (error) => {
      console.log('Upload failed:', error.message);
      toast.error('fail to upload user info');
    },
  });
};

export const useLocalGovernments = (state) => {
  const trimmedState = state.trim().replace(/\s+/g, '');
  console.log(trimmedState);
  return useQuery(
    ['localGovernments', trimmedState],
    async () => {
      const response = await fetchLocalGovernment(trimmedState);
      console.log('Fetched Local Governments:', response.data); // Log the response
      return response.data; // Return the response data (which should be an array)
    },
    {
      enabled: !!state, // Only run the query if state is selected
    }
  );
};
