/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  useFileUploadMutation,
  useUserMutation,
} from '@/utils/hooks/DashboardMutation';

const bloodGroups = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
  'O+',
  'AB',
];
const tribalMarks = ['None', 'Yes', 'No', 'Not Specified'];
const titles = ['Mr.', 'Mrs.', 'Dr.', 'Miss', 'Prof.'];

const disabilityStatuses = [
  'None',
  'Visual Impairment',
  'Hearing Impairment',
  'Mobility Impairment',
  'Other',
];
const genotypes = ['AA', 'AS', 'SS', 'AC', 'SC', 'CC'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Others'];

export default function index({ onNext }) {
  const uploadFileMutation = useFileUploadMutation();
  const { mutate, isLoading } = useUserMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

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
      firstName: '',
      lastName: '',
      otherNames: '',
      dateOfBirth: '',
      bloodGroup: '',
      genotype: '',
      maritalStatus: '',
      weight: '',
      height: '',
      maidenName: '',
      religion: '',
      motherMaidenName: '',
      physicalDisability: '',
      tribalMark: '',
      homeTown: '',
      title: '',
      image: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('Surname is required')
        .min(3, 'Surname must be at least 3 characters'),
      lastName: Yup.string()
        .required('firstName is required')
        .min(3, 'firstName must be at least 3 characters'),
      otherNames: Yup.string()
        .required('lastname is required')
        .min(3, 'lastname must be at least 3 characters'),
      image: Yup.mixed().required('upload your image'),
      dateOfBirth: Yup.date()
        .nullable()
        .required('Date of Birth is required')
        .test('is-18', 'You must be at least 18 years old', (value) => {
          if (!value) return false; // Required check
          const today = new Date();
          const dob = new Date(value);
          const age = today.getFullYear() - dob.getFullYear();
          const hasHadBirthday =
            today.getMonth() > dob.getMonth() ||
            (today.getMonth() === dob.getMonth() &&
              today.getDate() >= dob.getDate());
          return age > 18 || (age === 18 && hasHadBirthday);
        }),
      bloodGroup: Yup.string()
        .oneOf(bloodGroups, 'Invalid blood group')
        .required('Blood group is required'),
      maritalStatus: Yup.string()
        .oneOf(maritalStatuses, 'Invalid marital status')
        .required('marital Status is required'),
      genotype: Yup.string()
        .oneOf(genotypes, 'Invalid genotype')
        .required('genotype is required'),
      weight: Yup.number()
        .typeError('Weight must be a number')
        .required('Weight is required')
        .min(20, 'Weight must be at least 20 kg')
        .max(200, 'Weight cannot be more than 200 kg'),
      height: Yup.number()
        .typeError('Height must be a number')
        .required('Height is required')
        .min(20, 'Height must be at least 50 cm')
        .max(250, 'Height cannot be more than 250 cm'),
      maidenName: Yup.string()
        .required('maidenName is required')
        .min(3, 'maidenName must be at least 3 characters'),
      religion: Yup.string()
        .oneOf(religions, 'Invalid selection ')
        .required('religion is required'),

      motherMaidenName: Yup.string()
        .required(' motherMaidenName is required')
        .min(3, ' motherMaidenName must be at least 3 characters'),

      physicalDisability: Yup.string()
        .oneOf(disabilityStatuses, 'Invalid selection ')
        .required('phyical status is required'),
      tribalMark: Yup.string()
        .oneOf(tribalMarks, 'Invalid selection ')
        .required('this field is required'),
      homeTown: Yup.string()
        .required(' home town is required')
        .min(3, ' home town must be at least 3 characters'),
      title: Yup.string()
        .oneOf(titles, 'Invalid selection ')
        .required('this field is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('hello');
      console.log('image', values.image);

      const payload = {
        personalInformation: {
          firstName: values.firstName,
          lastName: values.lastName,
          otherNames: values.otherNames,
          dateOfBirth: values.dateOfBirth,
          bloodGroup: values.bloodGroup,
          genotype: values.genotype,
          maritalStatus: values.maritalStatus,
          weight: values.weight,
          height: values.height,
          maidenName: values.maidenName,
          religion: values.religion,
          motherMaidenName: values.motherMaidenName,
          physicalDisability: values.physicalDisability,
          tribalMark: values.tribalMark,
          homeTown: values.homeTown,
          title: values.title,
          image: values.image,
        },
      };

      const formData = new FormData();

      formData.append('payload', JSON.stringify(payload));

      // Append the image file (if available)
      if (values.image) {
        formData.append('image', values.image);
      }
      console.log('this is pay', payload);
      // Call the mutation function with the payload
      mutate(payload, {
        onSuccess: () => {
          toast.success('User created successfully!');
          onNext();
          resetForm(); // Reset the form after successful submission
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
        Personal Information
      </h3>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Surname
          </label>
          <input
            id="firstName"
            name="firstName"
            type="firstName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            First name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="lastName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.lastName}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Other names
          </label>
          <input
            id="otherNames"
            name="otherNames"
            type="text"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.otherNames}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your other names"
          />
          {formik.touched.otherNames && formik.errors.otherNames && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.otherNames}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Date of birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your Surname"
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.dateOfBirth}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Blood group
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="bloodGroup"
              name="bloodGroup"
              type="text"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.bloodGroup}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Choose a blood group --</option>
              {bloodGroups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.bloodGroup && formik.errors.bloodGroup && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.bloodGroup}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Genotype
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="genotype"
              name="genotype"
              type="text"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.genotype}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your Genotype"
            >
              <option value="">-- Choose a Genotype --</option>
              {genotypes.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.genotype && formik.errors.genotype && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.genotype}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Marital status
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="maritalStatus"
              name="maritalStatus"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.maritalStatus}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Select your marital status --</option>
              {maritalStatuses.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.maritalStatus && formik.errors.maritalStatus && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.maritalStatus}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Weight
          </label>
          <input
            id="weight"
            name="weight"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            type="number"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.weight && formik.errors.weight && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.weight}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Height
          </label>
          <input
            id="height"
            name="height"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.height}
            type="number"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.height && formik.errors.height && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.height}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Maiden name
          </label>
          <input
            id="maidenName"
            name="maidenName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.maidenName}
            type="text"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your maiden name"
          />
          {formik.touched.maidenName && formik.errors.maidenName && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.maidenName}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Religion
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="religion"
              name="religion"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.religion}
              type="text"
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Select your religion--</option>
              {religions.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.religion && formik.errors.religion && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.religion}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-white-800 text-black-700">
            Mother’s maiden name
          </label>
          <input
            id="motherMaidenName"
            name="motherMaidenName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.motherMaidenName}
            type="text"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.motherMaidenName &&
            formik.errors.motherMaidenName && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.motherMaidenName}
              </div>
            )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            physical disability
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="physicalDisability"
              name="physicalDisability"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.physicalDisability}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Physical disability--</option>
              {disabilityStatuses.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.physicalDisability &&
            formik.errors.physicalDisability && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.physicalDisability}
              </div>
            )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Tribal mark
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="tribalMark"
              name="tribalMark"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.tribalMark}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Any tribal mark?--</option>
              {tribalMarks.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.tribalMark && formik.errors.tribalMark && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.tribalMark}
            </div>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Title{' '}
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <select
              id="title"
              name="title"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="w-full py-3 bg-blue-300 text-white-800 focus:outline-none"
              placeholder="Enter your first name"
            >
              <option value="">-- Select your Title--</option>
              {titles.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.title && formik.errors.title && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.title}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Home town
          </label>
          <input
            id="homeTown"
            name="homeTown"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.homeTown}
            type="text"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            placeholder="Enter your first name"
          />
          {formik.touched.homeTown && formik.errors.homeTown && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.homeTown}
            </div>
          )}
        </div>
        <div className="mb-4 W-full">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Upload Image
          </label>
          <div className="w-full px-4 bg-blue-300 focus:outline-none">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChanges}
              className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
            />
          </div>
          {formik.errors.image && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.image}
            </div>
          )}
        </div>

        {formik.values.image && (
          <a
            href={formik.values.image}
            target="_blank"
            rel="noreferrer"
            className="mt-3"
          >
            <img
              src={formik.values.image}
              alt="Preview"
              className="object-cover w-32 h-32 border rounded"
            />
          </a>
        )}
      </div>
      <div className="flex items-center justify-center w-full gap-3 mt-10">
        <button
          type="submit"
          disabled
          className={`w-[250px] flex  justify-center text-white-800 items-center py-2 px-4 font-bold border-[2px] border-white-800 text-white rounded-lg 
        }`}
        >
          Previous
        </button>
        <button
          type="submit"
          className={`w-[250px] flex justify-center font-bold text-white-200 items-center py-2 px-4 bg-blue-dark text-white rounded-lg 
        }`}
        >
          {isLoading ? 'submiting...' : 'Next'}
        </button>
      </div>
    </form>
  );
}
