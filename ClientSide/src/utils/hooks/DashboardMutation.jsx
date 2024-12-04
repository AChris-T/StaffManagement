/* eslint-disable react-hooks/rules-of-hooks */
import {
  AddNewPersonnel,
  NextOfKin,
  uploadFile,
} from '@/services/Api/dashborad.model';
import { useMutation, useQueryClient } from 'react-query';
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
