/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  serviceRecordMutation,
  useFileUploadMutation,
  useUserMutation,
} from '@/utils/hooks/DashboardMutation';

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
  const { mutate, isLoading } = serviceRecordMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const userId = localStorage.getItem('userid');
  console.log(userId);

  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generate preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageLoading(true);

      // Automatically trigger file upload
      uploadFileMutation.mutate(file, {
        onSuccess: (data) => {
          console.log('File uploaded successfully:', data);
          const uploadedUrl = Array.isArray(data) ? data[0] : data;
          formik.setFieldValue('image', uploadedUrl);
          console.log(uploadedUrl);
          setImageLoading(false);
        },
        onError: (error) => {
          console.error('File upload failed:', error.message);
          setImageLoading(false);
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      serviceRecord: {
        serviceNumber: '',
        nhqFileNumber: '',
        ippisNumber: '',
        bvn: '',
        ninNumber: '',
        level: '',
        step: '',
        currentRank: '',
        dateOfFirstAppointment: '',
        dateOfConfirmation: '',
        dateOfPresentAppointment: '',
        salaryBankName: '',
        accountNumber: '',
        pfaName: '',
        pfaAccountNumber: '',
      },
    },

    validationSchema: Yup.object({
      salaryBankName: Yup.string()
        .required('Salary Bank Name is required')
        .min(2, 'Salary Bank Name must be at least 2 characters')
        .max(50, 'Salary Bank Name cannot exceed 50 characters'),
      pfaName: Yup.string()
        .required('PFA Name is required')
        .min(2, 'PFA Name must be at least 2 characters')
        .max(50, 'PFA Name cannot exceed 50 characters'),

      serviceNumber: Yup.string()
        .required('Service Number is required') // Ensure it's not empty
        .matches(
          /^[A-Za-z0-9]+$/,
          'Service Number can only contain letters and numbers'
        ) // Optional: Regex for alphanumeric only
        .min(5, 'Service Number must be at least 5 characters') // Optional: Minimum length
        .max(10, 'Service Number must be at most 10 characters'),


      ippisNumber: Yup.string()
        .required('Service Number is required') // Ensure it's not empty
        .matches(
          /^[A-Za-z0-9]+$/,
          'Service Number can only contain letters and numbers'
        ) // Optional: Regex for alphanumeric only
        .min(2, 'Service Number must be at least 5 characters') // Optional: Minimum length
        .max(10, 'Service Number must be at most 10 characters'),

      bvn: Yup.string()
        .required('BNV is required') // Ensure it's not empty
        .matches(/^\d{11}$/, 'BNV must be exactly 11 digits'),

      ninNumber: Yup.string()
        .required('NIN is required') // Ensure NIN is provided
        .matches(/^\d{11}$/, 'NIN must be exactly 11 digits'), // Must be 11 digits

      currentRank: Yup.string()
        .oneOf(ranks, 'Invalid current rank group')
        .required('current rank is required'),
      level: Yup.string()
        .oneOf(levels, 'Invalid current level group')
        .required('current level is required'),
      step: Yup.string()
        .required('step is required') // Ensure it's not empty
        .matches(/^[A-Za-z0-9]+$/, 'step can only contain letters and numbers') // Optional: Regex for alphanumeric only
        .min(2, 'step must be at least 2 characters') // Optional: Minimum length
        .max(10, 'step must be at most 10 characters'),
      dateOfFirstAppointment: Yup.date()
        .required('Date of First Appointment is required')
        .max(new Date(), 'Date of First Appointment cannot be in the future'),
      dateOfConfirmation: Yup.date()
        .required('Date of Confirmation is required')
        .min(
          Yup.ref('dateOfFirstAppointment'),
          'Date of Confirmation must be after Date of First Appointment'
        )
        .max(new Date(), 'Date of Confirmation cannot be in the future'),
      dateOfPresentAppointment: Yup.date()
        .required('Date of Present Appointment is required')
        .min(
          Yup.ref('dateOfConfirmation'),
          'Date of Present Appointment must be after Date of Confirmation'
        )
        .max(new Date(), 'Date of Present Appointment cannot be in the future'),
      pfaAccountNumber: Yup.string()
        .required('PFA Account Number is required')
        .matches(/^\d+$/, 'PFA Account Number must contain only digits')
        .min(6, 'PFA Account Number must be at least 6 digits')
        .max(12, 'PFA Account Number must not exceed 12 digits'),
      accountNumber: Yup.string()
        .required('Account Number is required')
        .matches(/^\d+$/, 'Account Number must contain only digits')
        .min(10, 'Account Number must be at least 10 digits')
        .max(10, 'Account Number must be exactly 10 digits'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('hello');
      console.log('image', values.image);

      const payload = {
        id: userId,
        serviceRecord: {
          serviceNumber: values.serviceNumber,
          nhqFileNumber: 'A00123',
          ippisNumber: values.ippisNumber,
          bvn: values.bvn,
          ninNumber: values.ninNumber,
          level: values.number,
          step: values.step,
          currentRank: values.currentRank,
          dateOfFirstAppointment: values.dateOfFirstAppointment,
          dateOfConfirmation: values.data,
          dateOfPresentAppointment: values.dateOfPresentAppointment,
          salaryBankName: values.salaryBankName,
          accountNumber: values.accountNumber,
          pfaName: values.pfaAccountNumber,
          pfaAccountNumber: values.pfaAccountNumber,
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
        Service record{' '}
      </h3>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Service Number
          </label>
          <input
            id="serviceNumber"
            name="serviceNumber"
            type="serviceNumber"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.serviceNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.serviceNumber && formik.errors.serviceNumber && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.serviceNumber}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            NHQ file number
          </label>
          <input
            id="nhqFileNumber"
            name=" nhqFileNumber"
            type="nhqFileNumber"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.nhqFileNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.nhqFileNumber && formik.errors.nhqFileNumber && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.nhqFileNumber}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            IPPIS number
          </label>
          <input
            id="ippisNumber"
            name="ippisNumber"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.ippisNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your other names"
          />
          {formik.touched.ippisNumber && formik.errors.ippisNumber && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.ippisNumber}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            BVN
          </label>
          <input
            id="bvn"
            name="bvn"
            type=""
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.bvn}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.bvn && formik.errors.bvn && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.bvn}</div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            NIN
          </label>
          <input
            id="ninNumber"
            name="ninNumber"
            type="ninNumber"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.ninNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.ninNumber && formik.errors.ninNumber && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.ninNumber}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Current rank{' '}
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="currentRank"
              name="currentRank"
              type="text"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.currentRank}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Choose a blood group --</option>
              {ranks.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.currentRank && formik.errors.currentRank && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.currentRank}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Level
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="level"
              name="level"
              type="text"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.level}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Choose a blood group --</option>
              {levels.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.level && formik.errors.level && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.level}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Step
          </label>
          <input
            id="step"
            name="step"
            type="step"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.step}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.step && formik.errors.step && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.step}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Date of first appointment
          </label>
          <input
            id="dateOfFirstAppointment"
            name="dateOfFirstAppointment"
            type="date"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfFirstAppointment}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your Surname"
          />
          {formik.touched.dateOfFirstAppointment &&
            formik.errors.dateOfFirstAppointment && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.dateOfFirstAppointment}
              </div>
            )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Date of confirmation
          </label>
          <input
            id="dateOfConfirmation"
            name="dateOfConfirmation"
            type="date"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfConfirmation}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your Surname"
          />
          {formik.touched.dateOfConfirmation &&
            formik.errors.dateOfConfirmation && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.dateOfConfirmation}
              </div>
            )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Date of present appointment
          </label>
          <input
            id="dateOfPresentAppointment"
            name="dateOfPresentAppointment"
            type="date"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfPresentAppointment}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your Surname"
          />
          {formik.touched.dateOfPresentAppointment &&
            formik.errors.dateOfPresentAppointment && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.dateOfPresentAppointment}
              </div>
            )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Salary bank name{' '}
          </label>
          <input
            id="salaryBankName"
            name="salaryBankName"
            type="salaryBankName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.salaryBankName}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.salaryBankName && formik.errors.salaryBankName && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.salaryBankName}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Account number{' '}
          </label>
          <input
            id="accountNumber"
            name="accountNumber"
            type="accountNumber"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.accountNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.accountNumber}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            PFA name{' '}
          </label>
          <input
            id="pfaName"
            name="pfaName"
            type="pfaName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.pfaName}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.pfaName && formik.errors.pfaName && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.pfaName}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            PFA account number{' '}
          </label>
          <input
            id="pfaAccountNumber"
            name="pfaAccountNumber"
            type="pfaAccountNumber"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.pfaAccountNumber}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.pfaAccountNumber &&
            formik.errors.pfaAccountNumber && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.pfaAccountNumber}
              </div>
            )}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-3 mt-10">
        <button
          type=""
          disabled
          className={`w-[250px] cursor-not-allowed flex justify-center text-white-800 border-[2px] border-white-800 items-center py-2 px-4 bg-transparent text-white rounded-lg 
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
