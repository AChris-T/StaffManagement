/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  serviceRecordMutation,
  useFileUploadMutation,
  useLocalGovernments,
} from '@/utils/hooks/DashboardMutation';

const stateInNigeria = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
  'FCT',
];
const ranks = [
  'CA III',
  'CA II',
  'CA I',
  'AIC',
  'SCA',
  'CCA',
  'IC',
  'SIC',
  'ASC I',
  'PIC',
  'ASC II',
  'DSC',
  'SC',
  'CSC',
  'AC',
  'DC',
  'CC',
];

const levels = [
  'Level 3',
  'Level 4',
  'Level 5',
  'Level 6',
  'Level 7',
  'Level 8',
  'Level 9',
  'Level 10',
  'Level 11',
  'Level 12',
  'Level 13',
  'Level 14',
  'Level 15',
  'Level 16',
];
export default function index({ onNext }) {
  const uploadFileMutation = useFileUploadMutation();
  const [selectedState, setSelectedState] = useState('');
  const { mutate, isLoading } = serviceRecordMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const {
    data: localGovernments = [],
    isLoading: isLgasLoading,
    error: lgaError,
  } = useLocalGovernments(selectedState);

  const handleStateChange = (e, setFieldValue) => {
    const state = e.target.value;
    setFieldValue('state', state);
    setSelectedState(state); // Updates state, triggering the `useLocalGovernments` hook
  };
  const userId = localStorage.getItem('userid');
  console.log(userId);

  const formik = useFormik({
    initialValues: {
      id: '',
      contactInfo: {
        stateOfOrigin: '',
        lga: '',
        phoneNumber: '',
        alternatePhoneNumber: '',
        email: '',
        residentialAddress: '',
        permanentAddress: '',
      },
    },

    validationSchema: Yup.object({
      /*   stateOfOrigin: Yup.string()
        .oneOf(stateInNigeria, 'Invalid blood group')
        .required('State of Origin is required'),
            lga: Yup.string().required('LGA is required'), */
      phoneNumber: Yup.string()
        .matches(
          /^0(70|80|81|90|91|701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|901|902|903|904|905|906|907|908|915|916|917|918)\d{7}$/,
          'Invalid Nigerian phone number'
        )
        .required('Phone number is required'),
      alternatePhoneNumber: Yup.string()
        .matches(
          /^0(70|80|81|90|91|701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|901|902|903|904|905|906|907|908|915|916|917|918)\d{7}$/,
          'Invalid Nigerian phone number'
        )
        .required('Phone number is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      residentialAddress: Yup.string()
        .required('Residential Address is required')
        .min(5, 'Residential Address must be at least 5 characters')
        .max(100, 'Residential Address cannot exceed 100 characters'),
      permanentAddress: Yup.string()
        .required('Permanent Address is required')
        .min(5, 'Permanent Address must be at least 5 characters')
        .max(100, 'Permanent Address cannot exceed 100 characters'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('hello');
      console.log('image', values.image);

      const payload = {
        id: userId,
        contactInfo: {
          stateOfOrigin: values.state,
          lga: values.lga,
          phoneNumber: values.phoneNumber,
          alternatePhoneNumber: values.alternatePhoneNumber,
          email: values.email,
          residentialAddress: values.resetForm,
          permanentAddress: values.residentialAddress,
        },
      };

      const formData = new FormData();

      formData.append('payload', JSON.stringify(payload));

      // Append the image file (if available)
      if (values.image) {
        formData.append('image', values.image);
      }
      console.log('this is pay', payload);
      mutate(payload, {
        onSuccess: () => {
          toast.success('User created successfully!');
          onNext();
          resetForm();
        },
        onError: (error) => {
          error(error);
          toast.error(error);
        },
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="py-6 mx-auto popins ">
      <h3 className="mb-8 text-2xl font-semibold text-black-700">
        Contact Information{' '}
      </h3>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4 ">
          <label className="block mb-2 text-sm font-normal text-black-700">
            State
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              name="stateOfOrigin"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.stateOfOrigin}
              onChange={(e) => handleStateChange(e, formik.setFieldValue)}
              className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            >
              <option value="">Select a state</option>
              {stateInNigeria.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.stateOfOrigin && formik.errors.stateOfOrigin && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.stateOfOrigin}
            </div>
          )}
        </div>
        <div className="w-full mb-4 ">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Local Government
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              name="lga"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.lga}
              disabled={formik.values.stata || isLgasLoading || lgaError}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            >
              <option value="">
                {isLgasLoading
                  ? 'Loading...'
                  : lgaError
                  ? 'Failed to load LGAs'
                  : 'Select Local Government'}
              </option>{' '}
              {localGovernments.map((lga, index) => (
                <option key={index} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.lga && formik.errors.lga && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.lga}</div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your phone number"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Alternative Phone Number
          </label>
          <input
            id="alternatePhoneNumber"
            name="alternatePhoneNumber"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.alternatePhoneNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your other phone number"
          />
          {formik.touched.alternatePhoneNumber &&
            formik.errors.alternatePhoneNumber && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.alternatePhoneNumber}
              </div>
            )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Email address"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.email}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Residential address
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <input
              id="residentialAddress"
              name="residentialAddress"
              type="text"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.residentialAddress}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your Residential address"
            />
          </div>
          {formik.touched.residentialAddress &&
            formik.errors.residentialAddress && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.residentialAddress}
              </div>
            )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Permanent address
          </label>
          <input
            id="permanentAddress"
            name="permanentAddress"
            type="permanentAddress"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.permanentAddress}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.permanentAddress &&
            formik.errors.permanentAddress && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.permanentAddress}
              </div>
            )}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-3 mt-10">
        <button
          type=""
          disabled
          className={`w-[250px] flex  justify-center text-white-800 items-center py-2 px-4 font-bold border-[2px] border-white-800 text-white rounded-lg 
        }`}
        >
          Previous
        </button>
        <button
          type="submit"
          className={`w-[250px] flex justify-center text-white-200 items-center py-2 px-4 bg-blue-dark text-white rounded-lg 
        }`}
        >
          {isLoading ? 'Submitting' : 'Next'}
        </button>
      </div>
    </form>
  );
}
